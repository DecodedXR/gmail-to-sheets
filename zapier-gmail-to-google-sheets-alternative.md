---
title: "Gmail to Google Sheets without Zapier: no per-task pricing, no subscription"
description: Copy Gmail emails into Google Sheets automatically, with fields pulled from the body and attachments saved to Drive, without paying Zapier per task. Free and one-time options compared.
image: https://decodedxr.github.io/gmail-to-sheets/assets/cover.png
---
{% raw %}

# Gmail to Google Sheets without Zapier: no per-task pricing, no subscription

"New Gmail email → add a row in Google Sheets" is one of the most common Zapier automations. It works, but Zapier charges per task, and every email copied is a task. From [Zapier's pricing page](https://zapier.com/pricing) (checked October 2026):

- **Free:** 100 tasks a month, two-step Zaps only, checking every 15 minutes.
- **Pro:** from $19.99 a month billed yearly ($29.99 billed monthly) for 750 tasks, checking every 2 minutes.

If the emails are in Gmail and the destination is Google Sheets, both ends are already in your Google account, and Apps Script can do the copy itself.

## Side by side

| | Zapier | Free Gmail to Sheets | Gmail to Sheets Pro |
|---|---|---|---|
| Price | Free up to 100 emails a month, then monthly | Free | $15 once |
| Emails per month | Capped by plan | No monthly cap (100 conversations per hourly run; a backlog catches up) | No monthly cap |
| Pull fields out of the body | A Formatter step (paid multi-step Zap) or forwarding to Email Parser by Zapier | Yes: name a column `Order number` and it finds "Order number: A-1042"; `/regex/` columns for the rest | Same |
| Several kinds of email | One Zap each | One Gmail search | One Gmail search per tab |
| Attachments saved to Drive | A separate Zap, or a three-step Zap (paid) to link the file in the row | No | Yes, with links in the row |
| How often | Every 15 min (free), 2 min (Pro) | Every hour | Every 5 to 60 minutes |
| Mark read or archive after | Extra step | No (adds a Gmail label) | Optional |
| Who runs it | Zapier's service | Your own code, in your own Google account | Your own code, in your own Google account |

## When Zapier is the better buy

- The emails go somewhere other than Google Sheets too, such as a CRM or Slack, in the same flow.
- You want a near-instant trigger (every 1–2 minutes).
- You'd rather click than paste a script.

## The free way: Gmail to Sheets

[Gmail to Sheets](https://github.com/DecodedXR/gmail-to-sheets) is an MIT-licensed script. Type your column names in row 1, paste the script into **Extensions → Apps Script**, choose **📧 Gmail to Sheets → Set Up…**, and enter the Gmail search for the emails you want. Matching emails become rows every hour. The full walkthrough is in the [setup guide](extract-data-from-gmail-to-google-sheets.html).

## The Zapier-replacement way: Gmail to Sheets Pro

[Gmail to Sheets Pro](https://decodedpc.gumroad.com/l/faaflm) ($15 once) covers what usually pushes people onto a paid Zapier plan:

- **One tab per kind of email:** orders into Orders, leads into Leads, receipts into Expenses, each with its own Gmail search.
- **Attachments saved to Drive** with links in the row. See [save Gmail attachments to Drive](save-gmail-attachments-to-google-drive.html).
- **Every 5, 10, 15, 30 or 60 minutes**, each message imported once, including later replies.
- **Optionally mark imported emails read or archive them.**

---

[Gmail to Sheets Pro ($15, one-time)](https://decodedpc.gumroad.com/l/faaflm) · [Free Gmail to Sheets](https://github.com/DecodedXR/gmail-to-sheets) · [Email parser comparison](email-parser-alternative-google-sheets.html)
{% endraw %}
