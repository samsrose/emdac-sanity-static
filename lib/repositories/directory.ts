import "server-only";
import { getClient, overlayDrafts } from "../sanity/server";
import { associatesQuery, membersQuery } from "../sanity/queries";
import type { DirectoryPerson } from "../types/sanity";
import type { ReadOptions } from "./types";

export async function getMembers({ preview = false }: ReadOptions = {}): Promise<DirectoryPerson[]> {
  const data = await getClient(preview).fetch<DirectoryPerson[]>(membersQuery);
  return overlayDrafts(data);
}

export async function getAssociates({ preview = false }: ReadOptions = {}): Promise<DirectoryPerson[]> {
  const data = await getClient(preview).fetch<DirectoryPerson[]>(associatesQuery);
  return overlayDrafts(data);
}
