import "server-only";
import { getClient, overlayDrafts } from "../sanity/server";
import { resourceQuery } from "../sanity/queries";
import type {
  Resource,
  ResourceCategory,
  ResourceCategoryConfig,
} from "../types/sanity";
import type { ReadOptions } from "./types";

export async function getResources(
  category: ResourceCategory,
  { preview = false }: ReadOptions = {},
): Promise<Resource[]> {
  const data = await getClient(preview).fetch<Resource[]>(resourceQuery(category));
  return overlayDrafts(data);
}

/**
 * Display configuration for the documents page. Adding a new section is now
 * a one-line config change rather than a copy-paste of an entire component.
 */
export const RESOURCE_SECTIONS: ResourceCategoryConfig[] = [
  { category: "documents", title: "Documents", subjectLabel: "Topic" },
  { category: "evidence", title: "Evidence Papers", subjectLabel: "Topic" },
  { category: "legislative", title: "Legislative Reviews", subjectLabel: "Topic" },
  { category: "minutes", title: "Meeting Minutes", subjectLabel: "Topic" },
  { category: "positions", title: "Position Papers", subjectLabel: "Position" },
  { category: "protocols", title: "Protocol Templates", subjectLabel: "Protocol" },
];
