# Yadesh Navbar and Menu PRD

## Goal
Keep the Yadesh navigation as one floating pill without a second viewport-wide background strip.

## Requirements
- The page or hero background must continue behind the navigation area.
- Only `.desktop-nav` owns the navbar surface, rounded corners, border, and shadow.
- `.app-header` remains a transparent layout/sticky container with no visible full-width surface.
- Desktop and mobile use the same visual contract and shared navigation component.
- The hamburger button remains keyboard accessible and opens/closes the existing menu panel.
- No horizontal overflow is allowed at desktop or mobile widths.

## Acceptance criteria
- At 1177x648, the nav is a centered floating pill and no full-width strip is visible.
- At mobile width, the hero/background reaches behind the nav without a dark or white header band.
- `/`, `/login`, `/register`, `/about`, and `/archive` keep the pill nav and working menu.
- The pill shadow remains visible without creating a second background layer.
- Unrelated page backgrounds and content are unchanged.

## Constraints
Do not add Supabase or change authentication. Do not add viewport-wide pseudo-elements or wrapper backgrounds for the navbar.
