# 2026-05-02 — Performance optimizations

Targeted, measurable wins on top of the SOLID rebuild. No functional changes
to user-visible behaviour.

## Bundle size

- Split `Navbar.tsx` into three files:
  - `Navbar.tsx` — server component shell.
  - `DesktopNav.tsx` — server component. The desktop dropdown panels use
    `group-hover:` CSS, so they ship zero JavaScript.
  - `MobileNav.tsx` — the only `"use client"` file in the navigation.
    Contains just the burger toggle + slide-down panel.
  - `nav-data.ts` — shared link arrays + class strings.

  Net effect: the link arrays, dropdown panel markup, and chevron icon are
  no longer in the client bundle. On routes a visitor never opens the
  mobile menu on (most desktop traffic), the only nav JS shipped is the
  ~1KB `MobileNav` toggle.

- Sentry Replay made opt-in (`NEXT_PUBLIC_SENTRY_REPLAY=1`). Replay adds
  ~70KB gzipped to every initial client load. Off by default.

- `next.config.js` — added `experimental.optimizePackageImports` for
  `@heroicons/react`, `date-fns`, and `classnames`. Each of these has
  barrel-style entry points that historically pull in much more than is
  used; the optimization rewrites named imports into deep imports at
  build time. `date-fns` in particular can drop 50–100KB.

## Image / network

- `CoverImage` now accepts a `sizes` prop and defaults to the actual grid
  layout: `(min-width: 1280px) 416px, (min-width: 768px) 33vw, 100vw`.
  The previous `sizes="100vw"` caused mobile-sized devices to download a
  Full-width image even when each card is only a third of the viewport.

- `next.config.js` images:
  - `minimumCacheTTL` set to 1 year. Sanity image URLs are content-
    addressed (the asset ref is in the path), so cached variants never
    go stale.
  - `deviceSizes` and `imageSizes` trimmed to the set actually exercised
    by the codebase, reducing the number of variants Next.js generates.

- `<link rel="preconnect" href="https://cdn.sanity.io">` added to the
  root layout. Saves ~100–200ms on the first image fetch by warming the
  TLS handshake before the browser parses the `<img>` tags.

## Server-side data fetching

- `lib/sanity/config.ts` — `useCdn` was previously gated on
  `typeof document !== "undefined"`, which is *always* false on the
  server. With App Router, all reads are server-side, so the legacy
  guard meant the CDN was never used. Now `useCdn` is enabled in
  production for both server and client. The preview/draft client in
  `server.ts` keeps `useCdn: false` so editors see fresh drafts.

- `lib/repositories/committees.ts` — removed redundant client-side sort
  in `getOfficers`. The GROQ query already does
  `order(order asc, name asc)`.

## Maintenance

- `.gitignore` cleaned up: removed three duplicate entries for
  `.env.local`, collapsed the per-environment `.env.*` listing into a
  single `.env.*` glob with a `!.env.example` allow rule, and added the
  `.pnpm-store` directory.

- `next.config.js` — set `poweredByHeader: false` to drop the
  `X-Powered-By: Next.js` header.

## Verification

- `pnpm run build` passes cleanly. All seven static App Router pages
  prerender, three SSG post pages prerender from Sanity, three API
  route handlers stay dynamic.
- No new TypeScript or ESLint errors.

## Out of scope (future)

- The `[@portabletext/react] Unknown block type "..."` warnings come
  from Sanity content using custom blocks (`singleImageObject`,
  `videoObject`, `callToActionObject`) that have no corresponding
  renderer. These are content-fidelity concerns, not performance.
- `next-forge`-style edge runtime for read-only routes could shave off
  cold-start latency further but requires migrating away from a few
  Node-only Sentry imports.
- Migrating to Next.js Cache Components (`'use cache'` directive on
  repositories) would let us cache by content tag rather than by route
  TTL. Currently every page uses `revalidate = 30`.
