# SMA Football Analytics — continuation brief

**For:** whoever picks this up next (Claude, new session)
**From:** the session ending 12 Aug 2026
**User:** Maddie Merrill, Head of Analytics, San Marcos Academy six-man football.
She is a student with homework. Respect her time — that is a real constraint, not a courtesy.

---

## 1. STOP HERE — the exact next step

Maddie is mid-way through putting the dashboard online so the coaches can see it.

**Just done:** `SMA Dashboard.html` and `Code.gs` copied to her **Desktop**
(they live in the Cowork outputs folder, which is buried in `~/Library` — that's
why she couldn't find them. Always copy to Desktop.)

**Next, in order:**
1. Upload `SMA Dashboard.html` to her **school** Google Drive (drive.google.com → + New → File upload → Desktop)
2. Right-click it → Share → Copy link → the chunk between `/d/` and `/view` is the **FILE ID**
3. New Google Sheet called `Dashboard access log` → its **SHEET ID** is between `/d/` and `/edit`
4. script.google.com → New project → paste `Code.gs` → fill in both IDs → Save
5. Deploy → New deployment → Web app → Execute as **Me** → Access **Anyone in [school]** → Deploy
6. Send Coach Tinker the web-app URL

`SETUP.md` in the same folder has this written out longer.

**Already confirmed:** script.google.com opens on her school account, so Apps Script
is not blocked for students. Google Classroom = Google Workspace, so the accounts exist.

**Do NOT share the Drive file itself with anyone.** The script runs as her and reads
her private file. Access control happens at the deployment step.

**Fallback if Apps Script deployment fails:** Cloudflare Pages + Cloudflare Access
(free, 50 users, one-time PIN by email) — but its free plan keeps login logs only
24 hours, which defeats her main reason for wanting this.

---

## 2. What this project is now

**One self-contained HTML file.** The practice data is written into the file itself
as a `BASELINE` object. It is never saved to browser storage, so it cannot go missing.

**The loop:** Maddie sends raw notes/transcripts → Claude parses them → Claude
regenerates the dashboard → she replaces the file.

**Corrections** she makes in the dashboard are stored in localStorage as an overlay
on top of BASELINE. If storage is wiped she loses recent corrections, never practices.
"Send my corrections" gives her plain English to paste back into chat.

**Three tabs:** For coaches · Every play · (gear) settings. She has said the layout
is **perfect** — do not restructure it without being asked.

---

## 3. History you must not repeat

Weeks were lost building the wrong thing. In order:

1. A tap-to-record app (v1/v2) — she couldn't look down at a screen without missing plays
2. A typed-shorthand app (v3) — right idea, wrong input device
3. A voice-recording app (v4) — **failed hard**: browser storage for a downloaded
   file silently dropped writes, transcription is blocked on `file://` pages, and
   every version she downloaded became a separate copy with separate storage.
   She nearly quit over this. It was my architecture, not her.

**The lesson:** she does not need software to maintain. She records however is easiest
(voice memo, Notes, spreadsheet), sends it, and gets a document back. Do not rebuild
a live-entry app.

---

## 4. Working practices — tell her these again if she forgets

**She must not edit transcripts.** She was spending an hour per transcript; three of
her four editing tasks are pure waste. Claude splits walls of text, ignores filler,
handles any phrasing. Proven: 21/21 reps and 7/10 plays parsed clean from her raw,
unedited Friday text.

The only thing Claude cannot catch is a **wrong jersey number**, and she spots those
faster in the readback than in a transcript.

**The film backlog is deliberately abandoned.** Recovering ~10% more plays moves
percentages a point or two inside a five-point margin of error. Do not encourage
her to catch up.

**"Off the record"** before an aside keeps it out of the coach-facing page.

---

## 5. Conventions established

**Drills** — each has `kind`: `"rep"` (catch/drop tallies) or `"play"` (chains).
`drillStarts` maps drill name → yard line the ball is spotted on. 4by4 = own 10.

**Yard lines** are absolute: 0 = own goal, `fieldLen` (80) = opponent goal.
A bare number resolves to the line **nearest the ball**, ties going downfield.

**Pass styles** — a line saying "switching to super long" sets the style for every
line after it. Catching is broken out by style because a drop on a long ball is not
the same event as a drop on a short one.

**Snap grading** — "bad snap from 66", "good snap from 66", "pretty good from Mickey".
First names resolve to numbers. This is the only thing that separates snappers,
because the QBs catch nearly everything.

**One-on-one drills** — `"13 past 12, through, donut"` / `"33 stopped by 12, no donut"`.
Recorded but **deliberately not scored** — see §7.

**Coach notes** — tones are `praise` / `coaching` / `neutral`. There is no "critique";
a coach adjusting someone is not a black mark. Praise gets ★. All notes live in ONE
card, never beside player names. Coach feedback outranks computed stats and is shown first.

**Never record a player's opinion of a teammate.** This was tried and removed at her
request. A quote was also fabricated by rendering her paraphrase as his direct words —
do not attribute anything to a named person without her confirming the wording.

---

## 6. Statistical principles — these were hard won

- **Everything is derived at read time.** Nothing computed is ever stored, so improving
  a parse rule fixes the whole season retroactively.
- **Gates:** a rate needs 3 reps to appear, 6 in both weeks before a change is called real.
  At ~15 reps a drill, smaller swings are chance.
- **Counts are not rates.** Ball security was a count and looked like improvement when
  she simply recorded less. It is now drops per 10 touches. Defence is still a count and
  is flagged `volumeOnly` so it is never described as a trend.
- **Selection bias:** if every graded snap came out bad, she was remarking on problems,
  not grading. Only report an accuracy rate if at least one snap that week was called good.
- **Saturation:** #5 and #40 are QBs who catch nearly anything, so "did he catch the snap"
  sits near 100% for every snapper and separates nobody.
- **Confounds must be visible:** the snapping table shows who each snapper was snapping to;
  the one-on-one table shows who each player faced.

---

## 7. Open questions — get answers, don't guess

1. **Field length.** She said "the 45 yard mark" — there is no 45 on an 80-yard field.
   If they practise on a 100-yard field, every yard number so far is wrong. UNRESOLVED.
2. **4by4 start line.** She said the 10, but later said "if I don't record a location it's
   most likely starting at the five yard mark." Currently set to 10.
3. **Aug 5 4by4, plays 9–12** — she wrote "13 snapped" four times; Becker doesn't snap.
   Marked `uncertain: "snapper"`, credited to nobody. She's checking film.
4. **#9** appears once in Monday's pat-and-go. Not on the roster.
5. **#19 Mehrens snapping** — five graded snaps, all bad. Her intro said 75/66 alternating.
   Real or misheard?
6. **Shock-and-lock criterion.** The dashboard asks Coach directly: does he want the lock
   holding, or the ball carrier reaching the pad fast? They point opposite ways. Until he
   answers, that drill is recorded but unscored. Watching who he praises would also answer it.
7. **Ash Vrielimk** — on the roster, no jersey number yet.
8. **Coach shorthand.** She's adding Coach Tinker's film notes, in football shorthand
   neither party can read. Stored verbatim, never guessed at. A glossary grows as terms
   are decoded. **Best move: ask Tinker for his key — five minutes, a season of legibility.**
9. She asked, and it was never resolved: should the dashboard flag when a coach's note
   disagrees with the numbers, or just show both?

---

## 8. Data in the file as of this brief

5 practices (Aug 4, 5, 6, 7, 10) · 16 drills · ~475 entries · 19 players (17 numbered).

**Roster:** 4 Cason Nash(Fr) · 5 Major Howard(Jr, QB) · 6 Raine Marsh(So) · 8 Alex Houston(Jr) ·
10 Cooper Clark(Fr) · 12 Cooper Dailey(Sr) · 13 Jacob Becker(Sr) · 19 Marshall Mehrens(Jr) ·
31 David Followell(Sr, **injured**) · 33 James Southword(Fr) · 34 Landon Douglas(Jr) ·
40 Valor Menn(Jr, QB) · 50 Caleb Arrington(So) · 66 Mickey McGuinness(Sr) ·
75 Dominic Knight(Jr) · 80 Jackson Bishop(So) · 81 Mason Litt(Jr).
No number yet: Ash Vrielimk(Jr), Cash Gilliad(Sr).

**Findings so far:** catching falls off sharply on long balls (86% short → 56% longest,
week of Aug 3). Snapping — Litt 30 snaps 0 problems, Clark 48/3, Knight 45/3. Monday's
graded snaps: McGuinness 2 of 4 on target, Mehrens 0 of 5.

---

## 9. The weekly note to Coach

There is a **✉ Write the note for Coach** button on the coaches tab (visible only to her).
It generates ~15 lines of plain text: what's worth knowing, who moved, whom he commended,
and **a question for him**. The question is deliberate — she said her stats weren't being
used, and a report is easy to ignore while a question is harder.

She has not yet sent one. **Ask whether she did, and whether he replied.** That answer
matters more than any feature.

---

## 10. How to work with her

- She catches real errors. Several of the best fixes in this project came from her
  noticing something was off. Take her corrections seriously and check them against data
  before agreeing or disagreeing.
- Verify claims against the actual data rather than asserting. She has been burned by
  confident wrongness.
- When something can't be done, say so plainly and give the honest alternative.
- She is doing this on top of school. If a request would cost her hours, say so and
  offer the cheaper version.

## Files in the outputs folder

- `SMA Dashboard.html` — the live artifact. This is the project.
- `Code.gs` + `SETUP.md` — Apps Script hosting, mid-setup
- `Practice Voice.html`, `RESCUE MY DATA.html` — dead ends from the failed v4. Safe to delete.
