# Publishing version 2026-10-26h to Apps Script

Everything is now **indented and formatted**, and nothing is over 132,000 characters
or 1,100 characters on a single line. That was almost certainly the problem: the last
attempt had one line 479,000 characters long, and editors give up on that long before
they care about the total.

Eight files. Paste them **in this order** — the numbers are the order.

| Paste this file | Into an Apps Script file named | What's in it |
|---|---|---|
| `PASTE-1-Dashboard.txt` | `Dashboard` (HTML) | the page and all the code |
| `PASTE-2-Data1.txt` | `Data1` (HTML) | roster, drills, practices, coach notes |
| `PASTE-3-Data2.txt` | `Data2` (HTML) | the 8 games |
| `PASTE-4-Data3.txt` | `Data3` (HTML) | plays, part 1 of 4 |
| `PASTE-5-Data4.txt` | `Data4` (HTML) | plays, part 2 of 4 |
| `PASTE-6-Data5.txt` | `Data5` (HTML) | plays, part 3 of 4 |
| `PASTE-7-Data6.txt` | `Data6` (HTML) | plays, part 4 of 4 |
| `PASTE-8-Code-gs.txt` | `Code.gs` (already exists) | glues the seven together |

**Ignore `PASTE-5-Code-gs.txt`** — that's the old numbering. Code.gs is now PASTE-8.

## Opening the paste files

They're `.txt`, so double-clicking opens TextEdit, not a browser. In TextEdit:
Cmd+A, then Cmd+C.

## In the Apps Script editor

1. Open your project → the **Editor** tab (the `< >` icon on the left).
2. For each new file: **+** next to "Files" → **HTML** → type the name
   (`Data1`, `Data2`, … — no extension, Apps Script adds `.html` itself).
3. Click into the file, Cmd+A to select whatever's there, then Cmd+V to paste.
4. **Save after every single file** (Cmd+S). Don't paste all eight and then save —
   if one fails you want to know which.
5. `Dashboard` already exists if you made it last time; just select-all and paste over it.
6. `Code.gs` already exists; select-all and paste `PASTE-8-Code-gs.txt` over it.

## Then deploy

**Deploy** → **Manage deployments** → pencil icon on the existing deployment →
Version: **New version** → **Deploy**.

Do *not* make a new deployment — that changes the URL, and the coaches have the old one.

## When it's live

Open the URL and check the green banner at the top reads:

> 4,448 charted entries across 27 practices recorded and 8 games

If the page is blank, one of the Data files didn't save. Open the URL with
`?` removed, then check each Data file in the editor still has content in it.

## Order of blame if it still won't save

1. **Which file failed?** Saving one at a time tells you. If it's always the same
   one, that file is the problem, not the size.
2. **Is it `Data5`?** That's the biggest at 124,000 characters. Tell me and I'll
   split the plays five ways instead of four.
3. **Is it every file, even a tiny one?** Then it's not the code — it's the project,
   the network, or your Google session. Sign out and back in.
