# Yadesh

A five minute habit for the Christian mind. Trade scrolling. Feed your faith.

Yadesh is a source-aware learning platform for Christians who want to engage seriously with the ideas, people, books, testimonies, and history of the faith. Every piece of content is curated, sourced, and built for short, focused sessions.

## What it is

- A modern Christian learning platform for ages 16 to 40
- A quiet alternative to mindless social feeds and doomscrolling
- A discovery engine for Christian knowledge across history, theology, biography, and teaching
- A personal library where users save and return to ideas worth keeping
- A source-honest editorial experience built around the principle: Read. Keep. Remember.

## What it is not

- A generic Bible app
- A sermon streaming platform
- A Christian social network
- A motivational quote app
- A miracle-only website

## Core product loop

DISCOVER → LEARN → SAVE → GO DEEPER → RETURN

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Supabase](https://supabase.com) (auth, database, RLS)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn base-nova](https://ui.shadcn.com) (design system foundation)
- [Lucide React](https://lucide.dev) (icons)
- [Vercel Analytics](https://vercel.com/analytics)
- PWA with service worker (Stale-While-Revalidate caching)

## Database

Two tables in Supabase:

**profiles** created automatically via trigger on every registration. Stores `full_name`, `email`, `bio`, `avatar_url`. RLS locked to the owning user.

**saved_items** one row per user per content item, referenced by `content_key`. RLS locked to the owning user.

A `content` table schema exists for future migration of learning cards out of static files.

## Project structure

```
app/                          Pages (Next.js App Router)
  (marketing)/                Public marketing and auth route group
    page.tsx                  Landing page (LegacyFeed)
    layout.tsx                Persistent marketing shell
    login/                    Sign in
    register/                 Create account
    forgot-password/          Password reset request
    reset-password/           Password reset form
  (product)/                  Authenticated app route group
    layout.tsx                Persistent shell with ProductChrome
    loading.tsx               Route group transition loading skeleton
    learn/                    Authenticated home feed with daily card
    learn/[id]/               Reading detail view
    explore/                  Topic and theme discovery
    saved/                    Personal library
    you/                      Profile, edit, sign out
    people/                   Christian figures
    books/                    Book library
    search/                   Global search
  about/                      About Yadesh
  community/                  Archived (not in nav, planned for v2)

components/
  legacy-feed.tsx             Public marketing homepage with live preview
  product-chrome.tsx          Persistent product shell (sidebar, mobile header, bottom nav)
  shared-nav.tsx              Public site floating pill nav
  learning-card.tsx           Card component for learning grid
  auth-screen.tsx             Login and register forms
  forgot-password-screen.tsx  Password reset form
  profile-screen.tsx          Profile view and inline edit
  faq-section.tsx             FAQ accordion
  pwa-updater.tsx             PWA service worker updater and splash handover

lib/
  learning-data.ts            Curated content pieces (static, v1)
  supabase/
    client.ts                 Browser Supabase client
    server.ts                 Server Supabase client (cookie-based)
  utils.ts                    cn() utility

hooks/
  use-save.ts                 Save and unsave hook with optimistic updates
```

## Getting started

Install dependencies:

```bash
pnpm install
```

Copy the environment file and fill in your Supabase project values:

```bash
cp .env.local .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase setup

Run the following in your Supabase SQL Editor before using auth or saves:

1. Profiles table with auto-creation trigger (see `prd.md` for full SQL)
2. Saved items table with RLS policies (see `prd.md` for full SQL)

In your Supabase dashboard under Authentication, disable email confirmation so users can register and start immediately.

## Design language

- Background: warm off-white
- Text: near-black
- Primary accent: electric lime
- Secondary accent: periwinkle / violet
- Contextual: soft lilac
- Interface stays mostly off-white and black. Lime and violet are intentional accents, not defaults.
