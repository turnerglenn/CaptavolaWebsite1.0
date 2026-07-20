# Demo Scheduling Agent — Design

**Status:** Draft — pending Microsoft 365 / Twilio setup items (see [Open Items](#open-items--prerequisites))
**Date:** 2026-07-19
**Owner:** Glenn (glenn@rbsgo.com)

## Overview

Replace the current demo-request form (which 405s on develop.captavola.com because the site is deployed as static assets with no backend) with an automated demo-scheduling agent that:

1. Collects requester details (first/last name, company, entity type, number of equity holders, email, phone).
2. Verifies **both** email address and phone number via OTP before any booking is allowed.
3. Reads glenn@rbsgo.com's calendar and offers available **20-minute slots between 7:00–11:00 AM Eastern, Monday–Friday**.
4. Books the slot on the calendar with a **Teams meeting link**, and emails a confirmation from **admin@captavola.com** containing a URL to reschedule or cancel.
5. Sends a reminder email **18 hours before the appointment** (or immediately if booked less than 18 hours out), **BCC'ing glenn@rbsgo.com and admin@captavola.com**.

Both rbsgo.com and captavola.com are hosted on **Microsoft 365** (confirmed via MX records), so calendar and mail integration use the **Microsoft Graph API**.

## Decisions

| Decision | Answer |
|---|---|
| Meeting type | **Teams meeting link** included in the calendar event and confirmation email |
| Minimum booking lead time | **1 business day** — earliest offered slot is the next business day |
| Booking UI | Structured step-by-step wizard (deterministic flow; more reliable than free-text chat, same backend either way) |
| Sender address | admin@captavola.com |

## Architecture

Everything runs on Cloudflare, extending the existing site deployment:

- **Cloudflare Worker** — added as `main` in `wrangler.jsonc`. The same deployment that serves the static site handles `/api/schedule/*`. This also gives the site a real backend (fixing the current 405 on form POSTs).
- **Durable Object per booking session** — a state machine (collect info → verify email → verify phone → pick slot → book) with strong consistency so two requesters cannot book the same slot. **DO alarms** fire the reminder email at exactly T-minus-18-hours.
- **D1 database** — bookings, OTP codes/attempts, audit trail.
- **Microsoft Graph API** — free/busy reads on glenn@rbsgo.com, event create/update/delete with `isOnlineMeeting: true` (Teams link), and `sendMail` as admin@captavola.com.
- **Twilio Verify** — SMS OTP (Cloudflare has no SMS capability; this is the one external service).
- **Cloudflare Turnstile** on the wizard's first step for bot/abuse protection.

## Booking flow

1. **Collect** — First name, last name, company name, entity type (dropdown: LLC, C-Corp, S-Corp, LP, etc.), number of equity holders, email, phone.
2. **Verify email** — 6-digit OTP sent from admin@captavola.com; 10-minute expiry; max 5 attempts; resend throttled.
3. **Verify phone** — SMS OTP via Twilio Verify; same limits. Booking is impossible until **both** are verified.
4. **Show slots** — query Graph free/busy for glenn@rbsgo.com; generate 20-minute slots **7:00–11:00 AM Eastern, Mon–Fri** (DST-safe, time-zone-aware generation); drop conflicts; enforce the **1-business-day minimum lead time** (earliest slot is the next business day); show the next ~10 business days.
5. **Book atomically** — the Durable Object re-checks free/busy at confirm time, creates the calendar event on Glenn's calendar with the requester as attendee and a **Teams meeting link**, and stores the booking with a signed management token.
6. **Confirmation email** — from admin@captavola.com: date/time shown in Eastern and the requester's local time, the Teams link, what to expect, and a **manage URL** (`/booking/<signed-token>`) to reschedule (re-runs the slot picker and moves the calendar event) or cancel (frees the slot). The signed link is the credential — no re-verification needed.
7. **Reminder email** — DO alarm at T-18h; if the appointment is less than 18 hours away at booking time, it sends immediately. To: the requester; **BCC: glenn@rbsgo.com and admin@captavola.com**. The reminder reschedules automatically if the appointment is moved, and is cancelled if the appointment is cancelled.

## Build phases

| Phase | Scope |
|---|---|
| 1 | Worker + D1 + Durable Object scaffolding; migrate the existing waitlist endpoint into it (fixes the 405) |
| 2 | Microsoft Graph integration: app registration, free/busy read, event create/update/delete with Teams link, sendMail |
| 3 | OTP flows (email + Twilio SMS), rate limiting, Turnstile abuse protection |
| 4 | Booking engine + confirmation email + manage/reschedule/cancel page |
| 5 | Reminder alarms with the 18-hour / immediate rule and BCC list |
| 6 | Frontend wizard, wire the "Schedule Demo" buttons to it, deploy to develop.captavola.com, end-to-end test with a real booking |

## Open items / prerequisites

1. **Microsoft 365 app registration** (needs M365 admin): `Calendars.ReadWrite` scoped to glenn@rbsgo.com and `Mail.Send` scoped to admin@captavola.com (use application-access policies to restrict to just these mailboxes).
   - Are rbsgo.com and captavola.com the **same M365 tenant**? Same tenant → one app registration; separate tenants → one each.
   - Does **admin@captavola.com exist** as a mailbox (or shared mailbox)? It must, to send mail via Graph.
2. **Twilio account** — Verify service SID + auth token (~$0.05 per verification).
3. **SPF fix (required for deliverability):** captavola.com's SPF record is currently `v=spf1 include:secureserver.net -all` (GoDaddy) but its mail is hosted on Microsoft. Mail sent from admin@captavola.com via Graph will likely **fail SPF and land in spam** until the record is changed to `v=spf1 include:spf.protection.outlook.com -all`. One-line DNS change; also verify DKIM is enabled for the domain in the M365 admin center.

## Notes

- The 1-business-day lead time still leaves the "immediate reminder" rule reachable: e.g., a booking made Monday 5 PM for Tuesday 7 AM is under 18 hours away, so its reminder sends immediately.
- Slot generation must be done in `America/New_York` time (not a fixed UTC offset) so the 7–11 AM window stays correct across DST transitions.
