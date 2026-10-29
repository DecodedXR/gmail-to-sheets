---
title: A Save Emails and Attachments alternative without the yearly fee
description: Save Gmail attachments to Google Drive with a log in Google Sheets, for a one-time $15 instead of $79.95 a year. How it compares to the Save Emails and Attachments add-on.
image: https://decodedxr.github.io/gmail-to-sheets/assets/cover.png
---
{% raw %}

# A Save Emails and Attachments alternative without the yearly fee

Digital Inspiration's **Save Emails and Attachments** add-on downloads Gmail attachments to Google Drive and logs them in a Google Sheet. On [its own pricing page](https://digitalinspiration.com/product/save-gmail-to-google-drive) it costs **$79.95 a year** (Standard: up to 5 rules, 500 emails per 24 hours) or **$99.95 a year** (Enterprise: unlimited rules, Shared Drives), and both editions save every hour.

If what you need is "attachments from these emails go to a Drive folder, and each email gets a row in a sheet", [Gmail to Sheets Pro](https://decodedpc.gumroad.com/l/faaflm) does that for **$15 once**.

## Side by side

| | Save Emails and Attachments | Gmail to Sheets Pro |
|---|---|---|
| Price | $79.95/year (Standard), $99.95/year (Enterprise) | $15 one-time |
| Rules (Gmail searches) | 5 on Standard, unlimited on Enterprise | One per tab, as many tabs as you like |
| How often it checks | Every hour | Every 5, 10, 15, 30 or 60 minutes |
| Attachments saved to Drive | Yes | Yes, one folder per tab, linked from the row |
| Log in Google Sheets | Yes | Yes, with your own columns |
| Save the email itself as PDF, HTML or EML | Yes | **No** |
| Shared Drives | Enterprise only | No (My Drive folders) |
| Where it runs | Their add-on | An Apps Script in your own Google account |

**Choose Save Emails and Attachments** if you need the emails themselves archived as PDFs, or Shared Drive folders. **Choose Gmail to Sheets Pro** if you need the attachments and a spreadsheet of the emails, and don't want a yearly bill.

## Setting it up

1. Create a Google Sheet and type column names in row 1, including **Attachments**: for example `Date | From | Subject | Total | Attachments`.
2. **Extensions → Apps Script**, paste in the Pro `Code.gs`, save, and reload the sheet.
3. **📧 Gmail to Sheets Pro → Set Up This Tab…**, and enter the Gmail search, exactly as you'd type it in Gmail: `from:billing@vendor.com has:attachment`.

Every matching email becomes a row. Columns named `Date`, `From`, `Subject` or `Link` fill themselves, and any other column picks up a matching "Label: value" line in the body, so `Total` gets "Total: $420.00". Its files go to the Drive folder **Gmail to Sheets - (tab name)**. Add a tab for each kind of email; each has its own search and folder. The step-by-step guide is [Save Gmail attachments to Google Drive automatically](save-gmail-attachments-to-google-drive.html).

## FAQ

**Does my email go through someone else's server?** No. The script runs in your Google account, and the code is plain text you can read before pasting it.

**Is anything logged twice?** No. Each message gets one row, including replies that arrive later in a conversation.

**Is there a daily cap?** There's no fixed cap like 500 a day; Google's own Apps Script quotas for your account apply. The first import takes the newest 100 conversations, and a search with more than 5,000 conversations waiting asks you to narrow it (add `newer_than:30d`, for example).

**Want it free?** The free [Gmail to Sheets](extract-data-from-gmail-to-google-sheets.html) copies one Gmail search into a sheet every hour, without attachments.

---

[Gmail to Sheets Pro ($15, one-time)](https://decodedpc.gumroad.com/l/faaflm) · [Free Gmail to Sheets](https://github.com/DecodedXR/gmail-to-sheets) · [More free Google Sheets scripts](https://decodedxr.github.io/free-google-sheets-scripts/)
{% endraw %}
