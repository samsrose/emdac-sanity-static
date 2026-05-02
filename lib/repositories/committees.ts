import "server-only";
import { getClient, overlayDrafts } from "../sanity/server";
import {
  committeeQuery,
  committeesPageQuery,
  officersQuery,
} from "../sanity/queries";
import type {
  CommitteeCategory,
  CommitteeMember,
  CommitteesPageData,
  Officer,
} from "../types/sanity";
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

/**
 * Single round trip for the entire /committees route — returns officers
 * plus the roster of each committee category in one fetch.
 */
export async function getCommitteesPageData({
  preview = false,
}: ReadOptions = {}): Promise<CommitteesPageData> {
  const data = await getClient(preview).fetch<CommitteesPageData>(committeesPageQuery);
  return {
    officers: overlayDrafts(data.officers),
    scopeofpractice: overlayDrafts(data.scopeofpractice),
    legislativec: overlayDrafts(data.legislativec),
    medicaladvisory: overlayDrafts(data.medicaladvisory),
    nominating: overlayDrafts(data.nominating),
  };
}
