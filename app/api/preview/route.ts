import { NextResponse, type NextRequest } from "next/server";
import { draftMode } from "next/headers";
import { previewClient } from "@/lib/sanity/server";
import { postBySlugQuery } from "@/lib/sanity/queries";
import type { Post } from "@/lib/types/sanity";

export async function GET(request: NextRequest) {
  const secret = process.env.SANITY_STUDIO_PREVIEW_SECRET;
  const { searchParams } = request.nextUrl;
  const providedSecret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (!secret && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { message: "Missing SANITY_STUDIO_PREVIEW_SECRET" },
      { status: 500 },
    );
  }
  if (secret && providedSecret !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const drafts = await draftMode();

  if (!slug) {
    drafts.enable();
    return NextResponse.redirect(new URL("/", request.url), { status: 307 });
  }

  const post = await previewClient.fetch<Post | null>(postBySlugQuery, { slug });
  if (!post) {
    return NextResponse.json({ message: "Invalid slug" }, { status: 401 });
  }

  drafts.enable();
  return NextResponse.redirect(new URL("/", request.url), { status: 307 });
}
