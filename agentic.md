# Yadesh agentic implementation guidance

This file is the source of truth for any agent or developer working on this codebase. Read it before making changes.

---

## Product identity

Yadesh is a source-aware Christian micro-learning platform for ages 16 to 40. The core promise is: "Five minutes. Something worth knowing."

It is not a Bible app, sermon platform, social network, or quote app.

Content must span traditions: theology, biography, church history, practical faith, and Christian thought. It must not read as a Pentecostal or Word of Faith product exclusively.

---

## Navigation rules

### Public site (`SharedNav`)
- `.app-header` must remain a transparent sticky container. No full-width visible background.
- `.desktop-nav` owns all visible surface: rounded pill, border, shadow.
- The page or hero background must continue behind the nav.
- No horizontal overflow at any breakpoint.
- Preserve `aria-expanded` on the hamburger button and its close behavior.
- Test at `/`, `/login`, `/register`, `/about` after any nav change.

### Authenticated app (`ProductShell`)
- Persistent left sidebar on desktop (240px).
- Fixed bottom nav on mobile.
- Active nav item matched by `title` prop passed to `ProductShell`.
- Community is removed from v1 nav. Do not re-add it without explicit instruction.

---

## Auth rules

- Browser Supabase client lives in `lib/supabase/client.ts`. Always instantiate with `useMemo(() => createClient(), [])` inside components to avoid prerender errors.
- Server Supabase client lives in `lib/supabase/server.ts`. Use `await createClient()` in server components and route handlers.
- Email confirmation is disabled. Users can register and use the app immediately.
- After sign in or register, redirect to `/learn` and call `router.refresh()`.
- Unauthenticated users hitting protected pages (`/you`) are redirected to `/login`.

---

## Database rules

Two active tables: `profiles` and `saved_items`. See `prd.md` for full SQL.

- `profiles.id` references `auth.users.id`. Created automatically via trigger on registration.
- `saved_items.content_key` matches the `id` field in `lib/learning-data.ts`.
- Always check RLS policies before adding new queries. Both tables are locked to the owning user.
- A `content` table schema is designed but not yet populated. Do not query it until content is migrated.

---

## Content rules

- All content lives in `lib/learning-data.ts` for v1.
- Each card requires: `id` (kebab-case, unique), `type`, `title`, `source`, `body`, `time`.
- `id` is the `content_key` used in `saved_items`. Never change an existing `id` or saved items will break.
- Content must be source-aware and editorial. No lorem ipsum. No AI slop.
- Do not make healing and miracles the dominant content category.
- No em dashes anywhere in content, copy, or documentation.

---

## Save feature

- Hook: `hooks/use-save.ts`. Accepts `contentKey` matching a card's `id`.
- Optimistic update on toggle. Rollback on error. Redirect to `/login` if unauthenticated.
- Wire save buttons using `useSave(card.id)`, not local `useState`.
- Duplicate key error (23505) is handled: treat as already saved.

---

## Component ownership

| Component | Responsibility |
|---|---|
| `legacy-feed.tsx` | Public marketing homepage only |
| `product-shell.tsx` | Authenticated app shell, sidebar, bottom nav, LearningCard, TopicChips |
| `shared-nav.tsx` | Public site nav, floating pill |
| `auth-screen.tsx` | Login and register, wired to Supabase |
| `forgot-password-screen.tsx` | Password reset request, wired to Supabase |
| `profile-screen.tsx` | Profile view and inline edit, wired to Supabase |
| `faq-section.tsx` | FAQ accordion, public about page |
| `pwa-updater.tsx` | Service worker update prompt |

---

## Copy rules

- No em dashes. Use commas, periods, or colons.
- Footer line: Read. Keep. Remember.
- Tagline: Five minutes. Something worth knowing.
- Preferred CTAs: Start learning, Read for 2 min, Explore this person, Save, Continue learning.
- Avoid: Save to Altar, Enter the archive, Choose your pressure.
- Write like a person, not a product brief.

---

## What not to change without explicit instruction

- The design system, color tokens, and CSS classes in `globals.css`.
- The floating pill nav pattern on the public site.
- The `id` values in `lib/learning-data.ts` (content keys are foreign-key equivalents).
- RLS policies on `profiles` and `saved_items`.
- The `useMemo` pattern for browser Supabase client instantiation.
