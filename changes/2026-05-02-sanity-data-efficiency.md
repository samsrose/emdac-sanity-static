# 2026-05-02 — Sanity data fetching efficiency

Replaces per-category `Promise.all` fan-outs with single composite GROQ
queries, adds a lean projection for post metadata, and configures the
public Sanity client to filter drafts server-side.

## Round-trip budget

| Route             | Before                                           | After             |
| ----------------- | ------------------------------------------------ | ----------------- |
| `/`               | 1 fetch (`getAllPosts`)                          | 1 fetch (no change) |
| `/committees`     | 5 fetches (officers + 4 × committee)             | 1 fetch           |
| `/directory`      | 2 fetches (members + associates)                 | 1 fetch           |
| `/documents`      | 6 fetches (one per resource category)            | 1 fetch           |
| `/meetings`       | 1 fetch (`getMeetings`)                          | 1 fetch (no change) |
| `/posts/[slug]`   | 1 fetch (full bundle, used by both meta + page)  | 2 fetches (lean meta + full bundle) |

Net for a fully cold prerender of all routes: 16 → 7 round trips.

The `/posts/[slug]` count goes up by one because `generateMetadata` now
calls a slim `postMetaQuery` that drops the portable-text body and the
morePosts list. The metadata fetch is small and cacheable; we trade a
round trip for a much smaller payload, which is the right side of the
tradeoff once individual posts grow beyond a few KB of body content.

## Why composite queries help

Each Sanity HTTP fetch pays its own TLS handshake, queue time, and JSON
parse. Five small fetches in `Promise.all` still run sequentially through
those per-call costs in aggregate, even when fired in parallel. A single
composite GROQ query runs the same selectors server-side and returns the
combined result in one response.

GROQ's object projection makes this natural:

```groq
{
  "officers":      *[_type == "officers"]      | order(...) { ... },
  "scopeofpractice": *[_type == "scopeofpractice"] | order(...) { ... },
  ...
}
```

The shape returned matches the page's data needs exactly — no client-side
assembly required.

## perspective: "published"

`lib/sanity/client.ts` now passes `perspective: "published"` to the
public client. Sanity filters drafts server-side, so the public path
never sees `drafts.*` IDs. The preview client in `lib/sanity/server.ts`
keeps `perspective: "previewDrafts"` so editors see live drafts.

`overlayDrafts` is left in place as a defensive no-op for the published
perspective and a real helper for the preview perspective. Removing it
everywhere would be mechanical churn for no runtime gain now.

## Files changed

- [lib/sanity/queries.ts](lib/sanity/queries.ts) — added
  `committeesPageQuery`, `directoryPageQuery`, `documentsPageQuery`,
  `postMetaQuery`. Existing single-category queries kept.
- [lib/sanity/client.ts](lib/sanity/client.ts) — added
  `perspective: "published"`.
- [lib/types/sanity.ts](lib/types/sanity.ts) — added
  `CommitteesPageData`, `DirectoryPageData`, `DocumentsPageData`,
  `PostMeta`.
- [lib/repositories/committees.ts](lib/repositories/committees.ts) —
  added `getCommitteesPageData`. `getOfficers` and `getCommittee` kept.
- [lib/repositories/directory.ts](lib/repositories/directory.ts) —
  added `getDirectoryPageData`. `getMembers` and `getAssociates` kept.
- [lib/repositories/resources.ts](lib/repositories/resources.ts) —
  added `getDocumentsPageData`. `getResources(category)` kept.
- [lib/repositories/posts.ts](lib/repositories/posts.ts) — added
  `getPostMeta`.
- [app/committees/page.tsx](app/committees/page.tsx) — uses
  `getCommitteesPageData`.
- [app/directory/page.tsx](app/directory/page.tsx) — uses
  `getDirectoryPageData`.
- [app/documents/page.tsx](app/documents/page.tsx) — uses
  `getDocumentsPageData`.
- [app/posts/[slug]/page.tsx](app/posts/[slug]/page.tsx) —
  `generateMetadata` uses `getPostMeta`.

## Verification

`pnpm run build` passes. All seven static pages still prerender, three
SSG post pages prerender from Sanity, three API route handlers stay
dynamic. No new TypeScript or ESLint errors.

## Out of scope (per the user's choice)

- Tag-based revalidation in `/api/revalidate`. Pages stay on
  `revalidate = 30`.
- React `cache()` wrappers around repos for per-request dedup.
- Removing `overlayDrafts` everywhere.
