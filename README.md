# SMA Football Analytics Dashboard

Practice analytics for San Marcos Academy six-man football, plus the Google Apps
Script that puts the dashboard in front of the coaching staff behind a school
Google sign-in and logs who opened it.

**Status: work in progress.**

## Files

- `SMA Dashboard.html` — the dashboard itself, a single self-contained page
- `Code.gs` — Apps Script web app: authenticates the viewer, writes an access log
  row to a Google Sheet, then serves the dashboard from Drive
- `SETUP.md` — step-by-step deployment walkthrough
- `CONTINUE HERE.md` — where the project stands and what comes next

## Deploying

See `SETUP.md`. In short: upload the dashboard HTML to Drive, create the access-log
Sheet, paste `Code.gs` into a new Apps Script project, fill in the two IDs at the
top, and deploy as a web app executing as you with access limited to the school.

Publishing a new week means replacing the one file in Drive — the script does not
change.

## Note

Do not share the Drive file directly. Access control happens at the Apps Script
deployment step; the script runs as the owner and reads the private file.
