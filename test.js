// Self-check for field extraction: node test.js
const vm = require('vm'), fs = require('fs'), assert = require('assert');
const ctx = {}; vm.runInNewContext(fs.readFileSync(__dirname + '/Code.gs', 'utf8'), ctx);
const body = [
  'Hi team,', 'Order numbers are listed below.', '',
  'Order number: A-1042', 'Customer name - Ana López', 'Email:', '', '  ana@example.com',
  'Total: $1,249.50', 'Notes: =HYPERLINK("x")',
].join('\r\n');
const mail = { date: new Date(0), from: 'Shop <orders@shop.com>', to: 'me@x.com', subject: 'New order', body, link: 'L' };
const f = h => ctx.field_(h, mail);
assert.equal(f('Subject'), 'New order');
assert.equal(f(' from '), 'Shop <orders@shop.com>');
assert.equal(f('Link'), 'L');
assert.equal(f('Order number'), 'A-1042');                       // skips "Order numbers are…"
assert.equal(f('customer name'), 'Ana López');                    // case-insensitive, dash separator
assert.equal(f('Email'), 'ana@example.com');                      // value on the next line
assert.equal(f('Phone'), '');                                     // missing field
assert.equal(f('/Total: \\$([\\d.,]+)/'), '1,249.50');            // regex column, group 1
assert.equal(f('/A-\\d+/'), 'A-1042');                            // regex column, no group
assert.equal(f('/nothing here/i'), '');
assert.equal(f(''), '');
assert.equal(ctx.asText_(f('Notes')), "'=HYPERLINK(\"x\")");     // formula text escaped
assert.equal(f('Body').length, body.length);
console.log('ok');
// import_ smoke run with fakes: two emails → two rows, thread labeled after writing.
let written, labeled = 0;
const msg = (s, b) => ({ getDate: () => new Date(0), getFrom: () => 'a', getTo: () => 'b', getSubject: () => s, getPlainBody: () => b });
ctx.PropertiesService = { getDocumentProperties: () => ({ getProperty: k => ({ query: 'from:x', sheetName: 'S' })[k] }) };
ctx.SpreadsheetApp = { getActiveSpreadsheet: () => ({ getSheetByName: () => ({
  getLastColumn: () => 2, getLastRow: () => 1,
  getRange: (r, c, h, w) => ({ getDisplayValues: () => [['Subject', 'Order number']], setValues: v => { written = { r, v }; } }),
}) }) };
ctx.GmailApp = { getUserLabelByName: () => 'L', search: q => { assert.equal(q, 'from:x -label:sheets-imported'); return [
  { getMessages: () => [msg('One', 'Order number: 1'), msg('Two', 'Order number: 2')], getPermalink: () => 'p', addLabel: () => labeled++ }]; } };
assert.equal(ctx.import_().rows, 2);
assert.deepEqual(JSON.parse(JSON.stringify(written)), { r: 2, v: [['One', '1'], ['Two', '2']] });
assert.equal(labeled, 1);
console.log('ok import');
