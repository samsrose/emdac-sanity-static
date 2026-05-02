import { NextResponse, type NextRequest } from "next/server";
import { draftMode } from "next/headers";

export async function GET(request: NextRequest) {
  const drafts = await draftMode();
  drafts.disable();
  return NextResponse.redirect(new URL("/", request.url), { status: 307 });
}
