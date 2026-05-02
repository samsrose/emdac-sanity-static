# 2026-05-02 — App Router + TypeScript + SOLID rebuild

A full rewrite of the application code from Pages Router (JS) to App Router
(strict TypeScript), with the architecture re-shaped around SOLID. Sanity
schemas were intentionally left as-is per the user's direction; deduplication
happens at the read/repository layer instead.

## Critical safety fixes

- Resolved unresolved git merge conflict in `studio/sanity.config.js` (kept
  the Stashed side, which uses Vite `import.meta.env` and lists the full
  current schema set).
- Removed the runtime crash in `lib/sentry.js` (the call to
  `myUndefinedFunction()` that triggered an immediate `ReferenceError`).
  The file was also doing a duplicate `Sentry.init()` outside of the
  Next.js Sentry instrumentation lifecycle. Module deleted entirely.
- Renamed `env.local` → `.env.local` so it is matched by `.gitignore`. The
  old `env.local` was being committed and contained live keys; the secrets
  in git history must still be rotated separately. Removed the spurious
  `NODE_ENV=production` line that forced production behaviour locally.
- Added `.env.example` documenting the required variables.
- Deleted `pages/api/response.js`, which was a 700-line dead module
  exporting a hardcoded LEMSA dataset under an API route name.

## Foundation

- Added strict TypeScript: `tsconfig.json` with `strict`,
  `noUncheckedIndexedAccess`, path alias `@/*`. Added dev dependencies for
  `typescript`, `@types/react`, `@types/react-dom`, `@types/node`.
- Introduced typed content models in `lib/types/sanity.ts`: `Post`,
  `PostBundle`, `Author`, `Officer`, `CommitteeMember`, `DirectoryPerson`,
  `Meeting`, `Resource`, plus `ResourceCategory` and `CommitteeCategory`
  string-literal unions.

## Sanity layer (DIP / ISP)

- Split `lib/sanity.js` into `lib/sanity/client.ts` (no token, safe for
  client) and `lib/sanity/server.ts` (token-aware, marked `server-only`).
- Moved GROQ queries to `lib/sanity/queries.ts`. Added two factories
  (`resourceQuery(category)`, `committeeQuery(category)`) that replace the
  six near-identical `*Query`/`*Fields` pairs from the old `lib/queries.js`.
- Added `lib/repositories/*` — a thin abstraction layer that the App Router
  pages depend on instead of calling Sanity directly:
  - `posts.ts` — `getAllPosts`, `getPostBundle`, `getPostSlugs`
  - `directory.ts` — `getMembers`, `getAssociates`
  - `meetings.ts` — `getMeetings`
  - `committees.ts` — `getOfficers`, `getCommittee`
  - `resources.ts` — `getResources` and a single `RESOURCE_SECTIONS`
    config that drives the entire `/documents` page.

## SOLID component dedup

- `components/ui/DataTable.tsx` replaces `MinuteItem`, `DocumentsItem`,
  `EvidenceItem`, `LegislativeItem`, `PositionItem`, and `ProtocolItem` —
  six near-duplicate files differing only in one field name.
- `components/ui/DirectoryCard.tsx` replaces `IsMemberDirectory` and
  `IsAssociateDirectory` (a single `variant` prop encodes the difference).
- `components/ui/CommitteeGrid.tsx` exposes `OfficerGrid` and
  `CommitteeGrid`, replacing the inline Officers/CommitteesItem definitions
  embedded in the old `pages/committees.js`.
- `components/ui/MeetingCard.tsx` replaces `MeetingItem.js`.
- `components/ui/PostCard.tsx` replaces `post-plug.js`.
- `components/ui/PostBody.tsx` replaces `post-body.js` and `blog-sections.js`.
- `components/ui/CoverImage.tsx`, `FormattedDate.tsx` are typed
  replacements for `cover-image.js` and `date.js`.
- `components/sections/HeaderSection.tsx` replaces `HeaderSection.js` /
  `HeroSection.js` / `header.js`.
- `components/sections/LemsaList.tsx` replaces `pages/lemsas.js` rendering.
- `components/layout/{Brand,Navbar,Footer}.tsx` are typed replacements for
  the JS versions.

## App Router migration

All routes now live under `app/*` as React Server Components by default:

- `app/layout.tsx` — replaces `pages/_app.js` + `pages/_document.js`. Uses
  the Next.js Metadata API (replaces `components/Meta.js`).
- `app/page.tsx` — home page (was `pages/index.js`).
- `app/committees/page.tsx`, `app/directory/page.tsx`,
  `app/documents/page.tsx`, `app/lemsas/page.tsx`, `app/meetings/page.tsx`
  — one file per route, each ~30–50 lines.
- `app/posts/[slug]/page.tsx` — uses `generateStaticParams` +
  `generateMetadata`. Returns `notFound()` for missing slugs.
- `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx` — replace
  `pages/_error.jsx`, `pages/404.js`, `pages/500.js`.
- `app/api/preview/route.ts`, `app/api/exit-preview/route.ts`,
  `app/api/revalidate/route.ts` — App Router route handlers replacing the
  legacy `pages/api/*` handlers. The revalidate handler uses
  `revalidatePath` and validates Sanity webhook signatures.

## Tooling

- `instrumentation.js` and `instrumentation-client.js` converted to
  TypeScript and made DSN-driven via `process.env.NEXT_PUBLIC_SENTRY_DSN`
  (no more hard-coded DSN in the repo).
- `sentry.server.config.{ts,edge.ts}` similarly read DSN from env.

## Deleted (legacy)

- All of `pages/` (17 files, including the dead `api/response.js`).
- 30+ component files now superseded by the typed `ui/`, `layout/`, and
  `sections/` directories.
- `hooks/useSentry.js` — over-engineered hook never wired into the active
  app and depended on the now-deleted `lib/sentry.js`.

## Follow-ups (out of scope for this change)

- Rotate the secrets that were committed to git history (`RESEND_API_KEY`,
  `SANITY_API_READ_TOKEN`, the Sentry DSN). The current commit removes
  them from the working tree but they remain in the repo history.
- Consolidate the duplicated Sanity schema types (`documents`, `evidence`,
  `legislative`, `minutes`, `positions`, `protocols` are nearly identical)
  into a single `resource` schema with a `category` discriminator, then
  remove `lib/sanity/queries.ts:resourceQuery`.
- Move the LEMSA dataset (`components/map/response.js` →
  `lib/data/lemsa.ts`) into Sanity as a `lemsaRegion` document type.
