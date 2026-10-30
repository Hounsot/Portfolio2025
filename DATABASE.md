# Case views and likes

The website remains a static GitHub Pages site. Supabase stores real counters; all cases start at zero. The dedicated Portfolio2025 project (`cyejpqkcqbwxbenxcyua`) is configured in `src/lib/supabase.ts` using its public project URL and publishable key. These are intentionally browser-visible; no database password or administrative key is included. Unavailable counters display an em dash. No decorative counts or old local-only likes are imported.

## Connect a different Supabase project

1. Create a Supabase project and run `supabase/migrations/202610300001_case_engagement.sql` in its SQL editor (once).
2. In Authentication → Sign In / Providers, enable anonymous sign-ins. Visitors do not see a sign-in screen. The browser keeps an anonymous session.
3. Copy `.env.example` to `.env.local`. Set the project's URL and **publishable key** from its Connect / API Keys settings. Never use a secret or service-role key in a `VITE_` variable.
4. Restart the development server.
5. To override the default project during publication, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in GitHub → repository Settings → Secrets and variables → Actions → Variables. The deployment workflow reads them when building the website. Deploy again after changing them. With no overrides, the existing Portfolio2025 project is used.

## Counting rules

- A view is recorded after the actual case has been visible for 1.5 seconds. Card hovers, wall image previews, incoming animation layers, background tabs and adjacent mobile reels do not count.
- At most one view per anonymous visitor, case and UTC day. Reloads and repeated visits on the same day are idempotent at the database level.
- At most one like per anonymous visitor and case. Repeating a request cannot inflate the count; removing a like cannot make the total negative.
- Totals are public. Individual views are private; each visitor can read only their own likes. Clients cannot directly edit totals or event tables. Database functions derive identity from the verified session and serialize writes per case.
- Cards and open cases share one in-memory state. Successful mutations update it immediately. Public totals refresh every 30 seconds while the site is visible and when the window regains focus. Failed likes revert with a retry message.

This counts browser identities, not verified people: another device or clearing browser storage creates a new identity. Supabase anonymous-auth rate limits apply; deliberate bot resistance would require an additional challenge/rate-limited endpoint. Do not automatically delete anonymous users while their activity records must be retained.

## Validation

`pnpm test` runs the SQL migration in an isolated PostgreSQL engine. Tests cover view deduplication, distinct visitors, dates, duplicate likes, removing likes, private activity, unknown cases and attempts to edit totals directly. `pnpm build` and `pnpm exec tsc --noEmit` check the frontend.

After connecting the live project, check two separate browser sessions: open a case, wait 1.5 seconds, like it, refresh, then remove the like. A reload should preserve the like and should not add another view that day. Refresh the other session to verify shared totals.
