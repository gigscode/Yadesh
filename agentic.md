# Agentic implementation guidance

When modifying Yadesh navigation:

1. Treat `components/shared-nav.tsx` as the source of truth for shared route navigation.
2. Keep `.app-header` transparent; it may position or stick the navigation but must not paint a viewport-wide background.
3. Put the visible surface, radius, border, and shadow on `.desktop-nav` only.
4. Preserve the existing landing hero or route background behind the nav.
5. Test both desktop and mobile. Check `/`, `/login`, `/register`, `/about`, and `/archive`.
6. Verify the hamburger button with keyboard and pointer interaction; preserve `aria-expanded` and close behavior.
7. Check for horizontal overflow after every hero or responsive navigation change.
8. Do not introduce Supabase or mock authentication while fixing visual navigation issues.

Expected result: one floating navigation pill, no second full-width header strip, continuous page background, and an accessible working menu.
