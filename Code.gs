/**
 * SMA Analytics Dashboard - web app entry point
 *
 * The dashboard is split across several HTML files because Apps Script
 * will not save one very large file. Dashboard holds the page and all
 * the code; the Data files hold the season's charted data. Code.gs
 * glues them back together on every request.
 *
 * Paste order in the editor:
 *   Dashboard  <- PASTE-1-Dashboard.txt
 *   Data 1     <- PASTE-2-Data1.txt     (roster, drills, practices, notes)
 *   Data 2     <- PASTE-3-Data2.txt     (games)
 *   Data 3     <- PASTE-4-Data3.txt     (plays 1 of 4)
 *   Data 4     <- PASTE-5-Data4.txt     (plays 2 of 4)
 *   Data 5     <- PASTE-6-Data5.txt     (plays 3 of 4)
 *   Data 6     <- PASTE-7-Data6.txt     (plays 4 of 4)
 *   Code.gs    <- PASTE-8-Code-gs.txt   (this file)
 *
 * NOTE: Apps Script strips HTML comments out of HTML files, so the data
 * cannot be anchored to a <!--DATA--> comment - it disappears. The data
 * goes in immediately after the <head> tag instead.
 *
 * Add ?diag=1 to the URL for a plain-text report of what this file can
 * actually see. Use it before blaming the dashboard.
 */

var DATA_COUNT = 6;

function doGet(e) {
  if (e && e.parameter && e.parameter.diag) {
    return ContentService.createTextOutput(diagReport_())
             .setMimeType(ContentService.MimeType.TEXT);
  }

  logVisit_();

  var page = HtmlService.createHtmlOutputFromFile('Dashboard').getContent();
  var data = viewerScript_() + loadData_();
  var html = insertData_(page, data);

  return HtmlService.createHtmlOutput(html)
           .setTitle('SMA Practice Dashboard')
           .addMetaTag('viewport', 'width=device-width, initial-scale=1')
           .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Puts the data into the page. The data must land before the dashboard's
 * own code block, which is at the bottom of the page.
 *
 * Anchors are tried in order. The first is kept only in case a future
 * version of Apps Script stops eating comments; <head> is the one that
 * actually does the work.
 */
function insertData_(page, data) {
  var anchors = ['<!--DATA-->', '<head>', '<HEAD>'];

  for (var i = 0; i < anchors.length; i++) {
    var at = page.indexOf(anchors[i]);
    if (at === -1) continue;

    var cut = (anchors[i].charAt(1) === '!') ? at : at + anchors[i].length;
    var tail = (anchors[i].charAt(1) === '!') ? at + anchors[i].length : at + anchors[i].length;

    // split/join rather than replace: replace() treats $ in the replacement
    // as a special pattern, and the data must go in untouched.
    return page.slice(0, tail) + '\n' + data + page.slice(tail);
  }

  throw new Error('The Dashboard file has no <head> tag, so there is nowhere ' +
                  'to put the data. Re-paste Dashboard from PASTE-1.');
}

/**
 * Tells the page who is looking at it.
 *
 * Without this the dashboard has no way to know, assumes it is Maddie, and
 * shows everyone the editing controls, the "add a play I missed" buttons and
 * the corrections banner. The owner test is done here, on the server, so it
 * cannot be faked by putting ?as=maddie in the URL.
 *
 * Owner is decided by comparing the signed-in viewer to the OWNER_EMAIL script
 * property if one is set, and otherwise to the account the script runs as.
 */
function viewerScript_() {
  var viewer = '', owner = false;

  try {
    viewer = Session.getActiveUser().getEmail() || '';
  } catch (err) {
    viewer = '';
  }

  try {
    var want = PropertiesService.getScriptProperties()
                 .getProperty('OWNER_EMAIL');
    if (!want) {
      want = Session.getEffectiveUser().getEmail() || '';
    }
    owner = !!viewer && !!want &&
            viewer.toLowerCase() === want.toLowerCase();
  } catch (err) {
    owner = false;
  }

  return '<script>\n' +
         'window.SMA_VIEWER = ' + JSON.stringify(viewer) + ';\n' +
         'window.SMA_IS_OWNER = ' + (owner ? 'true' : 'false') + ';\n' +
         '</script>\n';
}

/** Candidate spellings for data file i, most likely first. */
function namesFor_(i) {
  return ['Data ' + i, 'Data' + i, 'data ' + i, 'data' + i,
          'Data_' + i, 'Data-' + i];
}

/** Reads every data file and returns them joined together. */
function loadData_() {
  var out = '';

  for (var i = 1; i <= DATA_COUNT; i++) {
    var names = namesFor_(i);
    var part = null;

    for (var j = 0; j < names.length && !part; j++) {
      try {
        part = HtmlService.createHtmlOutputFromFile(names[j]).getContent();
      } catch (err) {
        part = null;
      }
    }

    if (!part) {
      throw new Error('Data file ' + i + ' is missing or empty. Looked for: ' +
                      names.join(', ') + '. Open the URL with ?diag=1 for detail.');
    }

    out += part;
  }

  return out;
}

/** Plain-text account of what the server can see. Nothing is cached here. */
function diagReport_() {
  var out = ['SMA dashboard - server diagnostic', new Date().toString(), ''];

  var page = '';
  try {
    page = HtmlService.createHtmlOutputFromFile('Dashboard').getContent();
    out.push('Dashboard        ' + page.length + ' chars');
    out.push('  <!--DATA-->    ' +
             (page.indexOf('<!--DATA-->') === -1 ?
              'absent (expected - Apps Script eats comments)' : 'present'));
    out.push('  <head>         ' +
             (page.indexOf('<head>') === -1 ? 'MISSING' :
              'at ' + page.indexOf('<head>')));
  } catch (err) {
    out.push('Dashboard        COULD NOT READ: ' + err.message);
  }
  out.push('');

  var total = 0;
  for (var i = 1; i <= DATA_COUNT; i++) {
    var names = namesFor_(i), done = false;

    for (var j = 0; j < names.length && !done; j++) {
      try {
        var c = HtmlService.createHtmlOutputFromFile(names[j]).getContent();
        out.push('part ' + i + '  "' + names[j] + '"  ' + c.length +
                 ' chars  | ' + c.replace(/\s+/g, ' ').slice(0, 50));
        total += c.length;
        done = true;
      } catch (err) {
        // that spelling does not exist; try the next
      }
    }

    if (!done) {
      out.push('part ' + i + '  NOT FOUND under any of: ' + names.join(', '));
    }
  }

  out.push('');
  try {
    var who = Session.getActiveUser().getEmail() || '(not visible)';
    var runAs = Session.getEffectiveUser().getEmail() || '(unknown)';
    var prop = PropertiesService.getScriptProperties()
                 .getProperty('OWNER_EMAIL') || '(not set)';
    out.push('signed in as     ' + who);
    out.push('script runs as   ' + runAs);
    out.push('OWNER_EMAIL      ' + prop);
    out.push('treated as owner ' +
             (viewerScript_().indexOf('SMA_IS_OWNER = true') > -1 ?
              'YES - you see the editing tools' :
              'no - you see what the coaches see'));
  } catch (err) {
    out.push('identity         COULD NOT READ: ' + err.message);
  }

  out.push('');
  out.push('data total       ' + total + ' chars');
  out.push('assembled page   ' + (page.length + total) + ' chars');
  out.push('expected         about 773000 chars');
  return out.join('\n');
}

/**
 * Records one row per page view so we can see who is actually using the
 * dashboard. Failures here must never stop the page from loading.
 */
function logVisit_() {
  try {
    var id = PropertiesService.getScriptProperties().getProperty('LOG_SHEET_ID');
    if (!id) return;

    var sheet = SpreadsheetApp.openById(id).getSheets()[0];
    var email = '';
    try {
      email = Session.getActiveUser().getEmail() || '';
    } catch (err) {
      email = '';
    }

    sheet.appendRow([new Date(), email]);
  } catch (err) {
    // logging is best effort
  }
}
