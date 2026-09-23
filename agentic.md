# Yadesh agentic implementation guidance

This file is the source of truth for any agent or developer working on this codebase. Read it before making changes.

---

## Product identity

Yadesh is a source-aware Christian micro-learning platform for ages 16 to 40. The core promise is: "Trade scrolling. Feed your faith. Five minutes of something worth knowing."

It is a quiet daily antidote to doomscrolling. It is not a Bible app, sermon platform, social network, or quote app.

Content must span traditions: theology, biography, church history, practical faith, and Christian thought. It must not read as a Pentecostal or Word of Faith product exclusively.

---

## Architecture overview

### Layout architecture

The authenticated app uses a **persistent route group layout** at `app/(product)/layout.tsx`. This layout wraps all product pages and mounts `ProductChrome`, a client component that renders the sidebar, mobile header, and bottom nav.

Because Next.js keeps route group layouts mounted across navigations within the group, the shell never unmounts. Only the page content slot (`<main>`) swaps on navigation. This eliminates the white flash that occurred when `ProductShell` was instantiated per-page.

**Do not revert to the old pattern of wrapping each page in `<ProductShell>`.**

Product pages live at: `app/(product)/learn/`, `app/(product)/explore/`, `app/(product)/saved/`, `app/(product)/search/`, `app/(product)/people/`, `app/(product)/books/`, `app/(product)/you/`, `app/(product)/learn/[id]/`, `app/(product)/series/[slug]/`, `app/(product)/series/[slug]/day/[day]/`

Route groups do not affect URLs. `/learn`, `/explore`, `/series`, etc. are unchanged.

### Key files

| File | Responsibility |
|---|---|
| `app/(product)/layout.tsx` | Persistent product shell layout, mounts ProductChrome |
| `components/product-chrome.tsx` | Client component: sidebar, mobile header, mobile menu, bottom nav. Uses usePathname for active state. Never instantiate directly in pages. |
| `components/page-header.tsx` | Per-page topline header with title and search trigger. Import and render at the top of each product page. |
| `components/product-shell.tsx` | Legacy file. ProductShell export is a passthrough shim kept to avoid import errors. Do not use ProductShell as a layout wrapper. |
| `components/learning-card.tsx` | Card component for the learning grid. Uses useSave hook. |
| `components/reading-detail-actions.tsx` | Client component: save, mark-as-read, and share quote (opens ShareQuoteModal) on the reading detail page. |
| `components/series-day-actions.tsx` | Client component: mark-day-complete, share quote, next day link, and back to series on series day pages. |
| `components/series-progress.tsx` | Client component: progress bar and day completion status for the series detail page. |
| `components/share-quote-modal.tsx` | Client modal: live-preview HTML5 Canvas quote card builder. Square (1:1) and Story (9:16) formats. Three themes (Periwinkle, Lime Dark, Warm Cream). Uses navigator.share or PNG download fallback. Zero Supabase egress. |
| `components/mobile-pwa-prompt.tsx` | Client component: PWA install drawer for mobile and tablet only. Uses pointer: coarse + UA detection + standalone check. 7-day dismiss cooldown. Mounted globally in app/layout.tsx. |
| `components/profile-screen.tsx` | Profile view, inline edit form, sign out. Wired to Supabase. |
| `components/auth-screen.tsx` | Login and register, wired to Supabase. |
| `components/forgot-password-screen.tsx` | Password reset request, wired to Supabase. |
| `components/shared-nav.tsx` | Public site nav, floating pill. |
| `components/legacy-feed.tsx` | Public marketing homepage only. |
| `components/faq-section.tsx` | FAQ accordion, public about page. Covers free tier, premium, series, share cards, and PWA. |
| `components/upgrade-modal.tsx` | Inline upgrade prompt shown when unauthenticated or free-tier users try to access premium features. |
| `components/pwa-updater.tsx` | Service worker update prompt. |
| `components/upgrade-pricing-section.tsx` | Full upgrade/pricing page content with Pebble payment integration. |
| `lib/learning-data.ts` | All v1 reading content. Each card has: id, type, title, source, body, fullBody, pullQuote, takeaway, time. |
| `lib/series-data.ts` | Series index. Exports allSeries, getSeriesBySlug, getSeriesDay. |
| `lib/series-data-breakthrough.ts` | 21 Days of Breakthrough series content. |
| `lib/series-data-prayer.ts` | 21 Days of Prayer series content. |
| `lib/series-data-kingdom.ts` | 21 Days of the Kingdom of God series content. |
| `hooks/use-save.ts` | Save/unsave toggle with optimistic update and Supabase sync. |
| `hooks/use-series-progress.ts` | Local-storage-backed series day completion tracker. |
| `hooks/use-habit-tracker.ts` | Reading streak and daily habit completion tracker. |
| `app/api/cron/keepalive/route.ts` | GET/POST endpoint that runs a minimal Supabase query to prevent free-tier project pausing. Register with a daily cron service (cron-job.org or Vercel Cron). |
| `proxy.ts` | Next.js 16 middleware (proxy.ts, not middleware.ts). Refreshes Supabase session cookies on every request. Required for auth to work. |

---

## Navigation rules

### Public site (SharedNav)
- `.app-header` must remain a transparent sticky container. No full-width visible background.
- `.desktop-nav` owns all visible surface: rounded pill, border, shadow.
- The page or hero background must continue behind the nav.
- Clicking outside any open menu panel closes it automatically.
- No horizontal overflow at any breakpoint.
- Preserve `aria-expanded` on the hamburger button and its close behavior.
- Test at `/`, `/login`, `/register`, `/about` after any nav change.

### Authenticated app (ProductChrome via route group layout)
- Persistent left sidebar on desktop (15.5rem).
- Fixed bottom nav on mobile.
- Active nav item determined by `usePathname()` in `ProductChrome`.
- `/learn` uses a prefix match so `/learn/[id]` also highlights Home.
- `/series` uses a prefix match so `/series/[slug]/day/[day]` also highlights Series.
- Community is removed from v1 nav. Do not re-add it without explicit instruction.

---

## Auth rules

- Browser Supabase client lives in `lib/supabase/client.ts`. Always instantiate with `useMemo(() => createClient(), [])` inside components to avoid prerender errors.
- Server Supabase client lives in `lib/supabase/server.ts`. Use `await createClient()` in server components and route handlers.
- Email confirmation is disabled. Users can register and use the app immediately.
- After sign in or register, redirect to `/learn` and call `router.refresh()`.
- Unauthenticated users hitting protected pages (`/you`) are redirected to `/login`.
- `proxy.ts` must remain in place and must export `proxy` as the function name. It refreshes the session token on every request. Without it, the Supabase JWT goes stale and all authenticated requests return 403.

---

## Premium / tier rules

- `profiles.is_premium` (boolean) determines premium access. Check this server-side before rendering series pages.
- Non-premium users hitting `/series/[slug]` or `/series/[slug]/day/[day]` are redirected to `/upgrade`.
- The upgrade page (`/upgrade`) renders `UpgradePricingSection` and uses Pebble as the payment gateway.
- `UpgradeModal` is an inline modal triggered when free-tier users try to save content (can be extended for other gated actions).
- Do not hardcode premium logic in client components. Always fetch `is_premium` from `profiles` server-side.

---

## Database rules

Two active tables: `profiles` and `saved_items`. See `prd.md` for full SQL.

- `profiles.id` references `auth.users.id`. Created automatically via trigger on registration.
- `profiles.is_premium` boolean column. Required for series access gating. Add with `ALTER TABLE public.profiles ADD COLUMN is_premium boolean NOT NULL DEFAULT false;` if missing.
- `saved_items.content_key` matches the `id` field in `lib/learning-data.ts`.
- Always check RLS policies before adding new queries. Both tables are locked to the owning user.
- A `content` table schema is designed but not yet populated. Do not query it until content is migrated.
- `saved_items` uses `upsert` with `onConflict: 'user_id,content_key'` and `ignoreDuplicates: true` to prevent 409 errors on duplicate saves.
- Series progress is stored in `localStorage` via `hooks/use-series-progress.ts` (no DB egress, free-tier safe).
- Daily reading streak is stored in `localStorage` via `hooks/use-habit-tracker.ts` (no DB egress, free-tier safe).
- Keep-alive: ping `/api/cron/keepalive` daily with any external cron service to prevent Supabase free-tier project pausing after 7 days of inactivity.

---

## Content rules

- All reading content lives in `lib/learning-data.ts` for v1.
- Each card requires: `id` (kebab-case, unique), `type`, `title`, `source`, `body`, `fullBody` (array of paragraphs), `pullQuote`, `takeaway`, `time`.
- `id` is the `content_key` used in `saved_items`. Never change an existing `id` or saved items will break.
- Series content lives in `lib/series-data-*.ts`. Each day has: `day`, `title`, `source`, `body`, `pullQuote`, `fullBody` (array), `takeaway`, and optionally `cardId` (link to a reading detail page).
- Content must be source-aware and editorial. No lorem ipsum. No AI slop.
- Do not make healing and miracles the dominant content category.
- No em dashes anywhere in content, copy, code comments, or documentation. Use commas, periods, or colons instead.

---

## Card colour by type

Learning cards receive a CSS class based on their `type` field:

| Type | CSS class | Background |
|---|---|---|
| LIFE | `.card-type-life` | `#ede5f8` (soft purple) |
| IDEA | `.card-type-idea` | `#edfba0` (lime tint) |
| HISTORY | `.card-type-history` | `#e4e2ff` (periwinkle tint) |
| BOOK | `.card-type-book` | `#fdf0d8` (warm amber) |
| TEACHING | `.card-type-teaching` | `#d8f5e4` (green tint) |
| STORY | `.card-type-story` | `#fff` (white) |

The type badge label and CTA button on each card are also tinted to match. Do not use `nth-child` positional overrides for card colours.

---

## Reading detail page

Each card links to `/learn/[id]`, a server-rendered detail page at `app/(product)/learn/[id]/page.tsx`.

The detail page renders: back link, type badge, coloured hero header (colour matches card type), pull quote, full body paragraphs (`card.fullBody`), key takeaway block, save + mark-as-read + share quote actions (`ReadingDetailActions`), prev/next adjacent card navigation.

`generateStaticParams` pre-renders all detail pages at build time.

---

## Series pages

Two premium-gated routes:

- `app/(product)/series/[slug]/page.tsx`: series overview with title, theme header, `SeriesProgress` component, and 21-day list. Locks unlock sequentially (each day links only if the previous is complete).
- `app/(product)/series/[slug]/day/[day]/page.tsx`: day reading with hero, pull quote, full body, takeaway, and `SeriesDayActions`. Passes title, quote, and source to `SeriesDayActions` for the share modal.

Both redirect to `/upgrade` if `profiles.is_premium` is false.

`generateStaticParams` pre-renders all series and day pages at build time.

---

## Share quote feature

`components/share-quote-modal.tsx` is a fully client-side HTML5 Canvas graphic builder.

- Props: `title`, `quote`, `source`, `category`, `onClose`
- Formats: Square (1080x1080) and Story (1080x1920)
- Themes: Periwinkle (dark), Lime Dark (dark), Warm Cream (light)
- Share: uses `navigator.share` with file blob on mobile. Falls back to PNG download on desktop.
- Zero backend: no Supabase storage, no server calls, no egress cost.
- Mounted via `ReadingDetailActions` (reading detail page) and `SeriesDayActions` (series day page).

---

## PWA

Installable PWA with web app manifest at `public/manifest.json` and service worker at `public/sw.js`.
- Caching strategy: Stale-While-Revalidate with `yadesh-pages-v3`.
- Instant route transitions from cache, background updates without blocking.
- Pre-hydration branded splash screen in `app/layout.tsx` for immediate native launch feel.
- Install prompt: `components/mobile-pwa-prompt.tsx` is mounted globally in `app/layout.tsx`.
  - Only shows on mobile and tablet (pointer: coarse + UA detection).
  - Android: intercepts `beforeinstallprompt` event for one-tap install.
  - iOS: shows manual instructions (Share > Add to Home Screen).
  - Cooldown: 7 days after dismissal before re-prompting.

---

## Save feature

- Hook: `hooks/use-save.ts`. Accepts `contentKey` matching a card's `id`.
- Uses `upsert` with `ignoreDuplicates: true` to prevent 409 conflict errors.
- Optimistic update on toggle. Rollback on error. Redirect to `/login` if unauthenticated.
- Wire save buttons using `useSave(card.id)`, not local `useState`.

---

## Copy rules

- No em dashes anywhere: not in UI text, metadata titles, code comments, or documentation.
- Use `|` as the separator in page `<title>` metadata (e.g. `Card Title | Yadesh`), not em dashes.
- Footer line: Read. Keep. Remember.
- Tagline: Trade scrolling. Feed your faith. Five minutes of something worth knowing.
- Preferred CTAs: Start reading for free, Read for 2 min, Explore this person, Save, Continue learning, Upgrade to Premium.
- Avoid: Save to Altar, Enter the archive, Choose your pressure.
- Write like a person, not a product brief.

---

## What not to change without explicit instruction

- The design system, color tokens, and CSS classes in `globals.css`.
- The floating pill nav pattern on the public site.
- The `id` values in `lib/learning-data.ts` (content keys are foreign-key equivalents).
- RLS policies on `profiles` and `saved_items`.
- The `useMemo` pattern for browser Supabase client instantiation.
- The route group structure at `app/(product)/`. Moving pages out of this group will cause the white flash to return.
- The `proxy.ts` file name and `proxy` function export. This is required by Next.js 16.
- The `mobile-pwa-prompt.tsx` mobile-only detection logic. Do not show the prompt on desktops.
