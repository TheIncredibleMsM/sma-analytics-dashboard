/**
 * SMA Practice Dashboard — served from inside this project
 *
 * The dashboard used to live as a file in Drive and this script fetched it.
 * That went wrong repeatedly: uploads landed on the wrong file, Drive
 * converted HTML into Docs, and nothing ever reported an error.
 *
 * Now the dashboard is a file INSIDE this script project, called Dashboard.
 * Drive is not involved at all.
 *
 * TO PUBLISH A NEW WEEK
 *   1. Open the Dashboard file in the list on the left
 *   2. Select all (Cmd A) and paste the new version over it
 *   3. Save (Cmd S)
 *   4. Deploy -> Manage deployments -> pencil -> Version: New version -> Deploy
 */

var SHEET_ID = '1AxTFDt_hZk-AWj1ZKvmruH-MEdbuuXCOj49GcrVTqfg';   // the log sheet

function doGet(e) {
  if (e && e.parameter && e.parameter.check) return selfCheck();

  var email = '';
  try { email = Session.getActiveUser().getEmail() || ''; } catch (err) { email = ''; }

  logVisit(email);

  var html = HtmlService.createHtmlOutputFromFile('Dashboard').getContent();

  var inject = '<script>window.SMA_VIEWER=' + JSON.stringify(email) + ';</script>';
  html = html.indexOf('<head>') > -1
    ? html.replace('<head>', '<head>' + inject)
    : inject + html;

  return HtmlService.createHtmlOutput(html)
    .setTitle('SMA Practice Dashboard')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/** Add ?check=1 to your link to see what version is actually live. */
function selfCheck() {
  var out = [];
  try {
    var html = HtmlService.createHtmlOutputFromFile('Dashboard').getContent();
    var m = html.match(/"version"\s*:\s*"([^"]+)"/);
    out.push('SERVED FROM INSIDE THIS SCRIPT — Drive is not involved.');
    out.push('  dashboard version : ' + (m ? m[1] : 'not found'));
    out.push('  size              : ' + html.length + ' characters');
    out.push('');
    out.push('If the version is not the one you just pasted, you either did not');
    out.push('save (Cmd S) or did not deploy a NEW VERSION.');
  } catch (err) {
    out.push('COULD NOT READ THE Dashboard FILE.');
    out.push('  error : ' + err);
    out.push('');
    out.push('Make sure this project has an HTML file named exactly: Dashboard');
  }
  return ContentService.createTextOutput(out.join('\n'))
    .setMimeType(ContentService.MimeType.TEXT);
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
