import "server-only";
import { getClient, overlayDrafts } from "../sanity/server";
import { meetingsQuery } from "../sanity/queries";
import type { Meeting } from "../types/sanity";
import type { ReadOptions } from "./types";

export async function getMeetings({ preview = false }: ReadOptions = {}): Promise<Meeting[]> {
  const data = await getClient(preview).fetch<Meeting[]>(meetingsQuery);
  return overlayDrafts(data);
}
