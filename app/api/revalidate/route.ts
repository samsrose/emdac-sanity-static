import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { sanityClient } from "@/lib/sanity/client";

const AUTHOR_UPDATED_QUERY = /* groq */ `
  *[_type == "author" && _id == $id] {
    "slug": *[_type == "post" && references(^._id)].slug.current
  }["slug"][]`;
const POST_UPDATED_QUERY = /* groq */ `*[_type == "post" && _id == $id].slug.current`;

const TYPE_QUERIES: Record<string, string> = {
  author: AUTHOR_UPDATED_QUERY,
  post: POST_UPDATED_QUERY,
};

interface SanityWebhookPayload {
  _id?: string;
  _type?: string;
}

function log(message: string, isError = false) {
  const fn = isError ? console.error : console.log;
  fn(`[revalidate] ${message}`);
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? "";
  const body = await request.text();
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();

  if (!secret) {
    log("Missing SANITY_REVALIDATE_SECRET", true);
    return NextResponse.json(
      { success: false, message: "Server misconfigured" },
      { status: 500 },
    );
  }

  if (!(await isValidSignature(body, signature, secret))) {
    log("Invalid signature", true);
    return NextResponse.json(
      { success: false, message: "Invalid signature" },
      { status: 401 },
    );
  }

  const payload = JSON.parse(body) as SanityWebhookPayload;
  const { _id: id, _type: type } = payload;

  if (typeof id !== "string" || !id || !type) {
    log("Missing _id or _type", true);
    return NextResponse.json({ message: "Missing _id or _type" }, { status: 400 });
  }

  const query = TYPE_QUERIES[type];
  if (!query) {
    log(`Unknown type: ${type}`, true);
    return NextResponse.json({ message: `Unknown type: ${type}` }, { status: 400 });
  }

  log(`Querying post slug for _id '${id}', type '${type}'`);
  const slugResult = await sanityClient.fetch<string[] | string | null>(query, { id });
  const slugs = (Array.isArray(slugResult) ? slugResult : [slugResult]).filter(
    (slug): slug is string => typeof slug === "string" && slug.length > 0,
  );
  const staleRoutes = ["/", ...slugs.map((slug) => `/posts/${slug}`)];

  try {
    for (const route of staleRoutes) {
      revalidatePath(route);
    }
    const updatedRoutes = `Updated routes: ${staleRoutes.join(", ")}`;
    log(updatedRoutes);
    return NextResponse.json({ message: updatedRoutes });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    log(message, true);
    return NextResponse.json({ message }, { status: 500 });
  }
}
