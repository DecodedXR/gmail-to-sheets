/** @OnlyCurrentDoc */ // limits spreadsheet access to this file; Gmail access is still needed to read emails

/**
 * Gmail to Sheets: copy matching emails into this sheet, one row per email, and pull fields out
 * of the email body. Good for order notifications, form emails, leads, receipts and alerts.
 *
 * Setup: put column names in row 1, then 📧 Gmail to Sheets → Set Up, and enter a Gmail search
 * such as  from:orders@shop.com subject:"New order". It checks every hour.
 *
 * Column names:
 *   Date, From, To, Subject, Body, Link       the email's own details
 *   Any other name, e.g. Order number         the text after "Order number:" in the email
 *   A pattern in slashes, e.g. /Total: \$([\d.,]+)/   the first ( ) group of that regular expression
 * Imported emails get the Gmail label "sheets-imported" and are never imported twice.
 */

const DONE_LABEL = 'sheets-imported';

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📧 Gmail to Sheets')
    .addItem('Set Up…', 'setUp')
    .addItem('Import Now', 'importMenu')
    .addItem('Turn Off', 'turnOff')
    .addToUi();
}

function setUp() {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSheet();
  if (!sheet.getLastColumn()) { ui.alert('Put column names in row 1 first, e.g. Date, From, Subject, Order number.'); return; }
  const q = ui.prompt('Gmail to Sheets', 'Gmail search for the emails to import (same as Gmail\'s search box), e.g.\n' +
    'from:orders@shop.com subject:"New order"', ui.ButtonSet.OK_CANCEL);
  if (q.getSelectedButton() !== ui.Button.OK || !q.getResponseText().trim()) return;
  PropertiesService.getDocumentProperties().setProperties({ query: q.getResponseText().trim(), sheetName: sheet.getName() });
  stopTriggers_();
  ScriptApp.newTrigger('importScheduled').timeBased().everyHours(1).create();
  importMenu();
}

function importMenu() {
  const r = import_();
  SpreadsheetApp.getUi().alert(r.error || ('Imported ' + r.rows + ' email(s). It checks again every hour.'));
}

function turnOff() {
  stopTriggers_();
  SpreadsheetApp.getUi().alert('Hourly import is off.');
}

function importScheduled() { import_(); }

function import_() {
  const props = PropertiesService.getDocumentProperties();
  const query = props.getProperty('query');
  const sheet = query && SpreadsheetApp.getActiveSpreadsheet().getSheetByName(props.getProperty('sheetName'));
  if (!sheet) return { error: 'Use "Set Up" first.' };
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  const label = GmailApp.getUserLabelByName(DONE_LABEL) || GmailApp.createLabel(DONE_LABEL);

  // Oldest first, so rows stay in date order. ponytail: 100 threads per run; the hourly run catches up on backlogs.
  const threads = GmailApp.search(query + ' -label:' + DONE_LABEL, 0, 100).reverse();
  const rows = [];
  threads.forEach(thread => {
    thread.getMessages().forEach(m => rows.push(headers.map(h => asText_(field_(h, {
      date: m.getDate(), from: m.getFrom(), to: m.getTo(), subject: m.getSubject(),
      body: m.getPlainBody(), link: thread.getPermalink(),
    })))));
  });
  if (rows.length) sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, headers.length).setValues(rows);
  threads.forEach(t => t.addLabel(label)); // after writing, so a failed write retries next hour
  return { rows: rows.length };
}

/** The value for one column, from the column's name and the email's details. */
function field_(header, mail) {
  const h = String(header).trim();
  const own = { date: mail.date, from: mail.from, to: mail.to, subject: mail.subject, body: mail.body.slice(0, 5000), link: mail.link };
  if (own.hasOwnProperty(h.toLowerCase())) return own[h.toLowerCase()];
  if (!h) return '';
  const rx = h.match(/^\/(.+)\/([a-z]*)$/);
  if (rx) {
    const m = mail.body.match(new RegExp(rx[1], rx[2]));
    return m ? (m[1] !== undefined ? m[1] : m[0]).trim() : '';
  }
  return afterLabel_(mail.body, h);
}

/** "Order number: 1234" → "1234". If the label is alone on its line (HTML tables), use the next non-empty line. */
function afterLabel_(body, label) {
  const lines = String(body).split(/\r?\n/);
  const want = label.toLowerCase();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.toLowerCase().startsWith(want)) continue;
    const rest = line.slice(want.length).trim();
    if (rest && !/^[:\-–=]/.test(rest)) continue; // "Order numbers are…" isn't the label
    const value = rest.replace(/^[:\-–=]\s*/, '').trim();
    if (value) return value;
    const next = lines.slice(i + 1).find(l => l.trim());
    return next ? next.trim() : '';
  }
  return '';
}

/** Email text must never become a formula in the sheet. */
function asText_(v) {
  return typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v;
}

function stopTriggers_() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'importScheduled')
    .forEach(t => ScriptApp.deleteTrigger(t));
}
