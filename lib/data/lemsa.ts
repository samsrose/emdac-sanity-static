// The legacy LEMSA dataset is a 700-line static JSON-shaped JS module living
// at components/map/response.js. We reuse the same data but expose it through
// a typed surface so consumers don't depend on the legacy file directly.
//
// In a future iteration this can move to Sanity as a `lemsaRegion` document
// type; until then this module is the single source of truth for the typed
// view of the data.

import legacyResponse from "@/components/map/response";

export interface LemsaCounty {
  id: string;
  countyName: string;
  name?: string;
  position?: string;
  locale?: string;
  uri?: string;
  fill: string;
  transform?: string;
  d?: string;
}

export interface LemsaRegion {
  name: string;
  data: LemsaCounty[];
}

export const lemsaRegions: LemsaRegion[] = legacyResponse as LemsaRegion[];
