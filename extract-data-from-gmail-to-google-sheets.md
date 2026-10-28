---
title: How to extract data from Gmail into Google Sheets automatically (free)
description: Copy order notifications, leads and receipts from Gmail into Google Sheets, one row per email, and pull out fields like order number and total. Free Apps Script, no parser subscription.
image: https://decodedxr.github.io/gmail-to-sheets/assets/cover.png
---
{% raw %}

# How to extract data from Gmail into Google Sheets automatically (free)

Every new order, lead or receipt arrives as an email that looks the same as the last one:

```
New order received

Order number: A-1042
Customer name: Ana López
Email: ana@example.com
Total: $1,249.50
```

Copying those fields into a spreadsheet by hand gets old fast. Email-parser services do it for a monthly fee. This guide does it for free with [Gmail to Sheets](https://github.com/DecodedXR/gmail-to-sheets), an MIT-licensed Apps Script that runs in your own Google account.

## Step 1: Name your columns

Create a Google Sheet and type the column names in row 1. **The names are the setup.** For the email above, the sheet ends up like this:

| Date | Subject | Order number | Customer name | Email | Total |
|---|---|---|---|---|---|
| *(filled in)* 10/19/2026 9:14 | New order | A-1042 | Ana López | ana@example.com | $1,249.50 |

- `Date`, `From`, `To`, `Subject`, `Body` and `Link` are filled from the email itself.
- Every other name is looked up in the email's text: for `Order number`, the script finds the line starting "Order number:" and takes what follows. It also handles "Order number - A-1042", and emails laid out as tables where the value is on the next line.

## Step 2: Add the script

1. **Extensions → Apps Script**. Replace the contents of `Code.gs` with [this `Code.gs`](https://github.com/DecodedXR/gmail-to-sheets/blob/main/Code.gs) and click **Save**.
2. Reload the sheet. A **📧 Gmail to Sheets** menu appears.

## Step 3: Choose the emails

1. In Gmail, find a search that shows exactly the emails you want, for example `from:orders@shop.com subject:"New order"`. Add `newer_than:30d` if you don't want old ones.
2. In the sheet: **📧 Gmail to Sheets → Set Up…**, and paste that search.
3. Approve Google's permission prompt ("Google hasn't verified this app" → **Advanced → Go to (your project name) → Allow**). It's your own script; your emails aren't sent anywhere.

Matching emails are imported right away, one row each, and the script checks for new ones every hour. Each imported email gets the Gmail label **sheets-imported**, so it's never imported twice.

## Trickier fields: patterns

When a value isn't on a "Label: value" line, write a regular expression between slashes as the column name. The part in parentheses is kept:

| Column name | Pulls out |
|---|---|
| `/Total: \$([\d.,]+)/` | `1,249.50` from "Total: $1,249.50" |
| `/Tracking: (\w+)/` | the tracking code |
| `/#(\d{4,})/` | the first number of 4+ digits after a `#` |

## Ideas

- **Shop orders** into a sales log, then a pivot table by day.
- **Contact-form leads** (from Webflow, Squarespace, WordPress) into a lead list.
- **Receipts and invoices** into an expenses sheet: `From`, `Date`, `/Total:? \$?([\d.,]+)/`.
- **Monitoring alerts** into an incident log with `Date`, `Subject`, `Link`.

## FAQ

**Does my computer need to be on?** No. It runs on Google's servers every hour. Use **Import Now** for an immediate run.

**Can I re-import an email?** Remove the `sheets-imported` label from it in Gmail, then run **Import Now**.

**How do I stop it?** **📧 Gmail to Sheets → Turn Off**.

**Can it save attachments, or watch several searches?** Not the free script. [Gmail to Sheets Pro](https://decodedpc.gumroad.com/l/faaflm) ($15 one-time) gives each tab its own search, [saves attachments to Drive](save-gmail-attachments-to-google-drive.html), imports later replies, and runs every 5 to 60 minutes.

**What about CSV attachments?** Use [Gmail CSV to Sheets](https://github.com/DecodedXR/gmail-csv-to-sheets), which imports the attachment's rows.

---

[Get the script on GitHub](https://github.com/DecodedXR/gmail-to-sheets) · [More free Google Sheets scripts](https://decodedxr.github.io/free-google-sheets-scripts/)
{% endraw %}
