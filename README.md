# Pulse Analytics — Monthly Delivery Board

A single-file, zero-dependency static web app for tracking the Pulse product team's
monthly delivery across **Web** and **App** platforms.

## What it does
- **Months**: switch between months (June, July, …); add new months from the UI. Add future months and they flow through all logic automatically.
- **Platforms**: Web and App, each holding workstreams → tasks.
- **Status tags**: Done, In progress, Spilled, Roadmap, Adhoc, Parked (+ derived Carryforward).
- **Spilled → Carryforward**: a task tagged *Spilled* in a month auto-appears in the next month
  under the same workstream, tagged "spilled from <prev month>". Un-spill it and it disappears.
  Carried items are visual-only — they don't count in the next month's KPIs/money.
- **Money**: per-task OTS (one-time) and MRR, plus Users count, Per-user cost, and Miscellaneous notes.
  Top summary shows **cumulative** OTS/MRR (this month + all prior, straight sum) with a
  carried-forward / this-month breakdown.
- **KPIs**: per-month task counts and completion %.
- **Edit mode**: toggle "Edit data" to add/edit/remove months, workstreams, and tasks inline.
  Changes auto-save to the browser (localStorage). Export/Import JSON to back up or share a snapshot.

## Run locally
No build step. Any static server works:

```bash
npm run dev      # uses npx serve
# or
python3 -m http.server 8000
```

Then open the printed URL. Or just open `index.html` directly in a browser.

## Deploy (Vercel)
It's a static site — no framework, no build.

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Or drag the folder onto https://vercel.com/new. `vercel.json` is already included
(clean URLs + no-cache so updates show immediately).

## Files
- `index.html` — the entire app (HTML + CSS + JS, self-contained).
- `vercel.json` — deploy config.
- `package.json` — convenience `dev`/`start` scripts.

## Notes
- Data lives inside `index.html` (the seed) and in each viewer's browser (their edits).
  Editing is per-browser; use **Export JSON → share → Import JSON** to move a snapshot between people.
- For a shared single-source-of-truth editable by the whole team, a small backend/store
  would be needed — the current setup is ideal for "you edit, team views".
