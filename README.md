# Yadesh

Short readings for the minutes you already have. Trade scrolling. Feed your faith.

Yadesh is a source-aware micro-learning platform for Christians who want to engage seriously with the ideas, people, books, testimonies, and history of the faith. Every piece of content is curated, sourced, and built for short, focused sessions.

## What it is

- A modern Christian learning platform for ages 16 to 40
- A quiet alternative to social feeds and doomscrolling
- A discovery engine for Christian knowledge across history, theology, biography, and teaching
- A personal library where users save and return to ideas worth keeping
- A structured series platform: 21 readings on one theme for Premium members
- A social sharing tool: generate high-resolution quote graphics (Square 1:1, Story 9:16) for Instagram, WhatsApp, and X, 100% client-side
- A Progressive Web App installable to the home screen with offline support
- A source-aware editorial experience built around: Read. Keep. Remember.

## What it is not

- A generic Bible app
- A sermon streaming platform
- A Christian social network
- A motivational quote app
- A miracle-only website

## Core product loop

DISCOVER -> LEARN -> SAVE -> GO DEEPER -> RETURN

## Feature tiers

| Feature | Free | Premium |
|---|---|---|
| Full reading library | Yes | Yes |
| Save to personal library | Up to 5 readings | Unlimited |
| Reading streak tracking | Yes | Yes |
| Share quote graphics | Yes | Yes |
| PWA (home screen install) | Yes | Yes |
| 21-day guided series | No | Yes |

## Content principles

- Each reading identifies its books, people, and historical sources where source information is available.
- Range across traditions: theology, biography, church history, practical faith, and Christian thought.
- Focused 3 to 5 minute readings designed to be completed and remembered.
- No ads, no algorithmic feeds, no endless distraction.
- Copy speaks to a person in a real situation. It avoids generic marketing language and unsupported promises about transformation, breakthrough, healing, or emotional results.
- Testimonies and miracle accounts are attributed and qualified as reported when independent verification is not established.
- Premium copy names the actual benefit: guided 21-day series and unlimited bookmarks.
- No em dashes in any copy, code, comments, or documentation.

## Design language

- Background: warm off-white (#fbfbf8)
- Text: near-black (#17181d)
- Primary accent: periwinkle / violet (#7168ed)
- Secondary accent: electric lime (#e4fb4f)
- Contextual: soft lilac (#e9c7f5)
- Font family: system stack (Helvetica, Arial, sans-serif)
- Calm, intentional, and readable across all devices.

## Tech stack

- Next.js 16 (App Router, Turbopack)
- Supabase (auth, profiles, saved_items)
- Pebble (payment gateway for premium upgrades)
- Vanilla CSS (no Tailwind)
- PWA: web app manifest + service worker (stale-while-revalidate)
- Share cards: HTML5 Canvas, 100% client-side (no storage, no egress)

## Key routes

- `/` - Public marketing homepage
- `/learn` - Authenticated daily feed
- `/learn/[id]` - Reading detail page
- `/series/[slug]` - 21-day series overview (premium)
- `/series/[slug]/day/[day]` - Series day reading (premium)
- `/upgrade` - Premium upgrade page
- `/saved` - Personal library
- `/you` - Profile and settings
- `/about` - About page with FAQ
- `/api/cron/keepalive` - Supabase keep-alive ping (daily cron)
