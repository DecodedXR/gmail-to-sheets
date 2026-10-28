# Free Gmail to Sheets: extract data from emails into Google Sheets

![Gmail to Sheets](assets/cover.png)

Order notifications, leads from a contact form, receipts, alerts: if the same kind of email keeps arriving, this copies each one into a Google Sheet row automatically, and pulls fields like **Order number** or **Total** out of the email body. Free, one file, no email-parser subscription.

**Your column names are the setup.** Put them in row 1:

| Date | From | Subject | Order number | Customer name | `/Total: \$([\d.,]+)/` |
|---|---|---|---|---|---|

- `Date`, `From`, `To`, `Subject`, `Body`, `Link` are the email's own details (`Link` opens the email in Gmail)
- **Any other name** is looked up in the email: `Order number` takes the text after "Order number:" (or "Order number -", or the next line, for table-style emails)
- **A pattern in slashes** is a regular expression for anything trickier; the first `( )` group is kept
- Checks every hour; imported emails get the label `sheets-imported` and are never imported twice

New to this? Read the [step-by-step guide](https://decodedxr.github.io/gmail-to-sheets/extract-data-from-gmail-to-google-sheets.html). Emails carry CSV attachments instead? Use [Gmail CSV to Sheets](https://github.com/DecodedXR/gmail-csv-to-sheets).

## Setup (3 minutes)

1. Create a Google Sheet and type your column names in row 1.
2. **Extensions → Apps Script**. Replace `Code.gs` with this repo's `Code.gs` and click **Save**. Reload the sheet.
3. **📧 Gmail to Sheets → Set Up…** and enter a Gmail search for the emails, exactly as you'd type it in Gmail's search box, e.g. `from:orders@shop.com subject:"New order"`.
4. Approve the permission prompt ("Google hasn't verified this app" → **Advanced → Go to (your project name) → Allow**; it's your own script, and your emails stay in your account).

Matching emails already in your inbox are imported right away (up to 100 conversations per run), then new ones every hour.

## Things to know

- Test your search in Gmail first: whatever Gmail shows is what gets imported. Add `newer_than:30d` to skip old mail.
- Each conversation is imported once. Replies added to an already-imported conversation later aren't picked up, which is fine for notification emails (each is usually its own conversation).
- `Body` keeps the first 5,000 characters of the plain-text email.
- Text that looks like a formula (starting with `=`, `+`, `-` or `@`) is stored as plain text.
- To re-import an email, remove the `sheets-imported` label from it in Gmail.

## Need more?

[Gmail to Sheets Pro](https://decodedpc.gumroad.com/l/faaflm) ($15, one-time) adds a different Gmail search per tab, attachments saved to Drive with links in the row, replies imported too (each message exactly once), imports every 5 to 60 minutes, and optional mark-as-read or archive.

## More free Google tools

- [All free Google Sheets scripts](https://github.com/DecodedXR/free-google-sheets-scripts): mail merge, PDF merge, reminders, Sheets to Calendar, CSV import, timestamps, row cleanup, time zones.

## License

MIT. See `LICENSE`.
