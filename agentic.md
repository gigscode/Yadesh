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

Product pages live at: `app/(product)/learn/`, `app/(product)/explore/`, `app/(product)/saved/`, `app/(product)/search/`, `app/(product)/people/`, `app/(product)/books/`, `app/(product)/you/`, `app/(product)/learn/[id]/`

Route groups do not affect URLs. `/learn`, `/explore`, etc. are unchanged.

### Key files

| File | Responsibility |
|---|---|
| `app/(product)/layout.tsx` | Persistent product shell layout, mounts ProductChrome |
| `components/product-chrome.tsx` | Client component: sidebar, mobile header, mobile menu, bottom nav. Uses usePathname for active state. Never instantiate directly in pages. |
| `components/page-header.tsx` | Per-page topline header with title and search trigger. Import and render at the top of each product page. |
| `components/product-shell.tsx` | Legacy file. Only exports LearningCard (re-export) and TopicChips. ProductShell export is a passthrough shim kept to avoid import errors. Do not use ProductShell as a layout wrapper. |
| `components/learning-card.tsx` | Card component for the learning grid. Uses useSave hook. |
| `components/reading-detail-actions.tsx` | Client component for save and mark-as-read on the detail page. |
| `components/profile-screen.tsx` | Profile view, inline edit form, sign out. Wired to Supabase. |
| `components/page-header.tsx` | Page title + search trigger rendered at the top of each product page. |
| `components/auth-screen.tsx` | Login and register, wired to Supabase. |
| `components/forgot-password-screen.tsx` | Password reset request, wired to Supabase. |
| `components/shared-nav.tsx` | Public site nav, floating pill. |
| `components/legacy-feed.tsx` | Public marketing homepage only. |
| `components/faq-section.tsx` | FAQ accordion, public about page. |
| `components/pwa-updater.tsx` | Service worker update prompt. |
| `lib/learning-data.ts` | All v1 content. Each card has: id, type, title, source, body, fullBody, pullQuote, takeaway, time. |
| `hooks/use-save.ts` | Save/unsave toggle with optimistic update and Supabase sync. |
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
- Active nav item determined by `usePathname()` in `ProductChrome`. The `/learn` route uses a prefix match so `/learn/[id]` also highlights Home.
- Clicking outside the mobile top nav menu closes it automatically.
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

## Database rules

Two active tables: `profiles` and `saved_items`. See `prd.md` for full SQL.

- `profiles.id` references `auth.users.id`. Created automatically via trigger on registration.
- `saved_items.content_key` matches the `id` field in `lib/learning-data.ts`.
- Always check RLS policies before adding new queries. Both tables are locked to the owning user.
- A `content` table schema is designed but not yet populated. Do not query it until content is migrated.
- `saved_items` uses `upsert` with `onConflict: 'user_id,content_key'` and `ignoreDuplicates: true` to prevent 409 errors on duplicate saves.

---

## Content rules

- All content lives in `lib/learning-data.ts` for v1.
- Each card requires: `id` (kebab-case, unique), `type`, `title`, `source`, `body`, `fullBody` (array of paragraphs), `pullQuote`, `takeaway`, `time`.
- `id` is the `content_key` used in `saved_items`. Never change an existing `id` or saved items will break.
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

The detail page renders: back link, type badge, coloured hero header (colour matches card type), pull quote, full body paragraphs (`card.fullBody`), key takeaway block, save + mark-as-read actions (`ReadingDetailActions`), prev/next adjacent card navigation.

`generateStaticParams` pre-renders all detail pages at build time.

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
- Preferred CTAs: Start reading for free, Read for 2 min, Explore this person, Save, Continue learning.
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
