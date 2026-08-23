# Putting the dashboard online for the coaches

Roughly 20 minutes, all free, no new passwords for anyone.

## First: can you even do this? (2 minutes)

Sign in to your **school** Google account and open **script.google.com**.

- It opens → you're fine, carry on.
- You get an admin block message → student accounts are restricted here.
  Stop and read "If Apps Script is blocked" at the bottom.

## 1. Put the dashboard in Drive

1. Upload `SMA Dashboard.html` to your school Google Drive.
2. Open it once so it appears in Recents.
3. Right-click → **Share** → **Copy link**. The long code between `/d/` and `/view`
   is the **FILE ID**. Keep it.

## 2. Make the log sheet

1. New Google Sheet, call it `Dashboard access log`.
2. The long code between `/d/` and `/edit` in its URL is the **SHEET ID**.

## 3. Make the script

1. script.google.com → **New project**, name it `SMA Dashboard`.
2. Delete what's there, paste in `Code.gs`.
3. Replace the two IDs at the top.
4. Save.

## 4. Publish it

1. **Deploy → New deployment** → gear icon → **Web app**.
2. Execute as: **Me**
3. Who has access: **Anyone in [your school]**  ← this is the access control
4. **Deploy**, allow the permissions it asks for.
5. Copy the web app URL. That's the link you send Coach Tinker.

## 5. Check it

- Open the link yourself. You should see the dashboard with your own controls.
- Ask someone else at school to open it. They should see the coach view,
  and a row should appear in your log sheet.

## Publishing a new week

Replace the file in Drive — right-click the old one → **Manage versions** →
**Upload new version**. Same link, new numbers. Never touch the script again.

## If Apps Script is blocked

Use Cloudflare Pages + Cloudflare Access instead: free for 50 users, coach gets
a one-time code emailed to him. The catch is that login logs are only kept for
24 hours on the free plan, so you'd have to check the same day.
