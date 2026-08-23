/**
 * SMA Practice Dashboard — access + login log
 *
 * What this does:
 *   1. Coach opens the link. Google already knows who he is (school account).
 *   2. This writes the date, time and his email into a Google Sheet you own.
 *   3. It serves the dashboard, telling the page who is looking at it, so
 *      your own controls stay yours.
 *
 * The dashboard itself stays a file in your Drive. To publish a new week you
 * replace that one file — you never touch this script again.
 */

// ---- the two things you fill in -------------------------------------------
var FILE_ID  = 'PASTE_THE_DRIVE_FILE_ID_HERE';   // the dashboard .html in your Drive
var SHEET_ID = 'PASTE_THE_LOG_SHEET_ID_HERE';    // an empty Google Sheet you make
// ---------------------------------------------------------------------------

function doGet() {
  var email = '';
  try { email = Session.getActiveUser().getEmail() || ''; } catch (err) { email = ''; }

  logVisit(email);

  var html = DriveApp.getFileById(FILE_ID).getBlob().getDataAsString();

  // Tell the page who is viewing, before any of its own scripts run.
  var inject = '<script>window.SMA_VIEWER=' + JSON.stringify(email) + ';</script>';
  html = html.indexOf('<head>') > -1
    ? html.replace('<head>', '<head>' + inject)
    : inject + html;

  return HtmlService.createHtmlOutput(html)
    .setTitle('SMA Practice Dashboard')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function logVisit(email) {
  try {
    var sh = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    if (sh.getLastRow() === 0) sh.appendRow(['When', 'Who', 'Day']);
    var now = new Date();
    sh.appendRow([
      Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm'),
      email || '(not signed in)',
      Utilities.formatDate(now, Session.getScriptTimeZone(), 'EEEE')
    ]);
  } catch (err) {
    // Never let a logging problem stop the dashboard from opening.
  }
}
