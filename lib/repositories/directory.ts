import "server-only";
import { getClient, overlayDrafts } from "../sanity/server";
import {
  associatesQuery,
  directoryPageQuery,
  membersQuery,
} from "../sanity/queries";
import type { DirectoryPageData, DirectoryPerson } from "../types/sanity";
import type { ReadOptions } from "./types";

export async function getMembers({ preview = false }: ReadOptions = {}): Promise<DirectoryPerson[]> {
  const data = await getClient(preview).fetch<DirectoryPerson[]>(membersQuery);
  return overlayDrafts(data);
}

export async function getAssociates({ preview = false }: ReadOptions = {}): Promise<DirectoryPerson[]> {
  const data = await getClient(preview).fetch<DirectoryPerson[]>(associatesQuery);
  return overlayDrafts(data);
}

/**
 * Single round trip for the entire /directory route.
 */
export async function getDirectoryPageData({
  preview = false,
}: ReadOptions = {}): Promise<DirectoryPageData> {
  const data = await getClient(preview).fetch<DirectoryPageData>(directoryPageQuery);
  return {
    members: overlayDrafts(data.members),
    associates: overlayDrafts(data.associates),
  };
}
