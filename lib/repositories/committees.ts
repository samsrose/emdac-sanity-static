import "server-only";
import { getClient, overlayDrafts } from "../sanity/server";
import { committeeQuery, officersQuery } from "../sanity/queries";
import type { CommitteeCategory, CommitteeMember, Officer } from "../types/sanity";
import type { ReadOptions } from "./types";

export async function getOfficers({ preview = false }: ReadOptions = {}): Promise<Officer[]> {
  // Ordering is done in GROQ (`order(order asc, name asc)`); no client-side sort needed.
  const data = await getClient(preview).fetch<Officer[]>(officersQuery);
  return overlayDrafts(data);
}

export async function getCommittee(
  category: CommitteeCategory,
  { preview = false }: ReadOptions = {},
): Promise<CommitteeMember[]> {
  const data = await getClient(preview).fetch<CommitteeMember[]>(committeeQuery(category));
  return overlayDrafts(data);
}
