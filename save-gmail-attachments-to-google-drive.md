---
title: How to save Gmail attachments to Google Drive automatically (with a log in Google Sheets)
description: Automatically save invoices, receipts and other Gmail attachments to a Google Drive folder, with one row per email in Google Sheets linking to each file. No Zapier, no subscription.
image: https://decodedxr.github.io/gmail-to-sheets/assets/cover.png
---
{% raw %}

# How to save Gmail attachments to Google Drive automatically (with a log in Google Sheets)

Invoices, receipts, purchase orders and reports keep arriving as Gmail attachments, and they all need to end up in the same Drive folder. Gmail has a **Save to Drive** button on each attachment, but nothing that does it automatically. The usual answer is a Zapier or Make automation, which is a monthly bill for something your Google account can do on its own.

## One-off: Gmail's Save to Drive button

For a handful of files, hover over an attachment in Gmail and click the **Add to Drive** icon. Choose **Organize** to pick the folder. Free and built in, but manual for every file.

## Automatic: Gmail to Sheets Pro

[Gmail to Sheets Pro](https://decodedpc.gumroad.com/l/faaflm) ($15 one-time) is an Apps Script that runs in your own Google account. Your email never goes to a third-party server. It saves matching emails' attachments to Drive and logs each email in a sheet:

| Date | From | Subject | Total | Attachments |
|---|---|---|---|---|
| 10/27/2026 9:14 | billing@vendor.com | Invoice 2077 | $420.00 | *(link to invoice-2077.pdf in Drive)* |

1. Create a Google Sheet and type column names in row 1, including one named **Attachments**: for example `Date | From | Subject | Total | Attachments`.
2. **Extensions → Apps Script**, paste in the Pro `Code.gs`, save, and reload the sheet.
3. **📧 Gmail to Sheets Pro → Set Up This Tab…**, and enter the Gmail search that finds these emails, exactly as you'd type it in Gmail, for example `from:billing@vendor.com has:attachment`.

Every matching email becomes a row. Its files are saved to the Drive folder **Gmail to Sheets - (tab name)**, with links in the Attachments cell. After that it checks every 15 minutes (or every 5, 10, 30 or 60).

Other columns are filled from the email: `Date`, `From`, `Subject`, `Link`, and any "Label: value" line in the body, so `Total` picks up "Total: $420.00".

## Useful searches

| What | Gmail search |
|---|---|
| Invoices from one vendor | `from:billing@vendor.com has:attachment` |
| All PDF receipts | `subject:receipt filename:pdf` |
| Scanner or copier output | `from:scanner@office.example has:attachment` |
| Anything with a spreadsheet | `has:attachment (filename:xlsx OR filename:csv)` |

Use a separate tab for each kind of email. Each tab has its own search and Drive folder.

## FAQ

**Is anything imported twice?** No. Each message is imported once, including replies that arrive later in a conversation.

**Can it clear them out of my inbox?** Yes. Choose `read` or `archive` during setup and imported emails are marked read or archived.

**Do the files count against my storage?** Yes, saved attachments use your Google Drive storage.

**Only CSV attachments?** The free [Gmail CSV to Sheets](https://github.com/DecodedXR/gmail-csv-to-sheets) imports the CSV's rows straight into your sheet.

**Don't need attachments?** The free [Gmail to Sheets](extract-data-from-gmail-to-google-sheets.html) copies one Gmail search into a sheet every hour.

---

[Gmail to Sheets Pro ($15, one-time)](https://decodedpc.gumroad.com/l/faaflm) · [Free Gmail to Sheets](https://github.com/DecodedXR/gmail-to-sheets) · [More free Google Sheets scripts](https://decodedxr.github.io/free-google-sheets-scripts/)
{% endraw %}
