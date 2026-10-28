# SMA Football Analytics Dashboard

Season-long analytics for San Marcos Academy six-man football, built and maintained
by the team's student analyst. Practices and games are recorded by voice from the
sideline; the transcripts are charted into a single self-contained HTML page that
the coaching staff opens behind a school Google sign-in.

**4,448 charted entries — 4,225 plays — across 27 practices recorded and 8 games.**
One HTML file, 810 KB, no external dependencies: data, parser and every view are
inlined so the page works anywhere it is served from. For hosting on Google Apps
Script, which will not save a file that large, `Code.gs` reassembles the page from
a handful of smaller ones at request time.

## How it works

The hard part is not the charts. It is that the input is a person talking quickly on
a windy sideline while twenty kids in numbered pennies run around, transcribed by a
phone that mishears nearly every proper noun.

**Natural-language play parsing.** A line like `25A snaps to 5, who passes to 6, who
is tackled at the 24 yard hash` is read into a structured play: snapper, chain of
possession, outcome, tacklers, field position. The parser handles phrase folding,
spoken-number normalisation, gang tackles across commas, fake handoffs, and the
difference between a number that is a jersey and a number that is a yard line.

**Everything is derived at read time.** No statistic is stored. Fixing a parse rule
retroactively corrects the entire season, which is what makes the corrections below
worth making.

**Corrections never destroy the record.** The charted lines are the original
observation. Corrections live as an overlay, so the raw call is always recoverable.

## Methodology, and what it cost

The project's recurring problem has been resisting the temptation to publish numbers
that look complete rather than numbers that are true.

- **Yardage was removed from the site entirely.** Gains had been computed from a
  starting spot that was fixed per drill rather than carried forward, which inflated
  totals roughly tenfold in places. Chaining each play from the previous one's end
  fixed the model, but the remaining error rate was still too high — the estimate
  produced a *backwards* result on 26% of plays where the ball moved, against about
  10% in real football. A number a coach can disprove from memory costs more than an
  absent one, so the section was cut rather than caveated.

- **Down and distance replaced field position.** Two consecutive calls difference
  into an exact gain with no field position involved, which sidesteps the fact that
  "left side of midfield" means opposite ends of the field before and after half-time.
  Six-man needs 15 yards for a first down, not 10.

- **Blocks, interceptions and fumble recoveries are not tackles.** 18 of 126 tackle
  credits across the season turned out not to be tackles.

- **Observations are labelled as observations.** Tackles recorded are the ones the
  analyst happened to see, not a count. Snap-quality judgements were removed on the
  analyst's own insistence that she does not reliably catch bad snaps, because the
  coaches ask her to follow tackles instead.

- **A player disputed his own number, and he was right.** The resulting audit found a
  drive charted twice, and 205 line IDs shared between different rows — corrections
  are keyed by ID, so a correction on one play would silently have rewritten another.
  Three games were then re-read from the original recordings: 28 plays became 111,
  15 became 117, 29 became 148.

## Files

- `SMA Dashboard.html` — the dashboard: data, parser and views in one file
- `Code.gs` — Apps Script web app that authenticates the viewer, logs the visit to a
  Sheet, and serves the page from inside the script project
- `transcripts/` — the raw sideline transcripts the data is built from. These are the
  original record; if a number looks wrong, check it here first
- `SETUP.md` — deployment walkthrough

## History

The two commits from August are contemporaneous. Everything from 1 September onward
was reconstructed on 1 October from the build snapshots saved at each publish, and is
dated to when each build was actually made.
