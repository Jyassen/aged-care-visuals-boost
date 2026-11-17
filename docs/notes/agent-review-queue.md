# Review queue — Grokler Prime & Muse

Back-office review items handed off from the 2027 YourMedGuy work (Nov 16–17, 2026).

**Scope rule for both items: review and recommend only.** Do not touch client-facing
systems — no edits to the live site, the funnels, the cost calculator, outgoing email
templates, or any published HighLevel workflow. Produce a recommendation and hand the
decision back to Jamal.

---

## 1. Vercel env var `GHL_STARTER_KIT_WEBHOOK_URL` — not set

Medicare Starter Kit leads (kit page + exit-intent popup) are supposed to reach
HighLevel through an Inbound Webhook workflow in the YourMedGuy location
(`1sUU5Trz1pkSpCoWcRwr`), workflow "1. Marketing | Starter Kit | Inbound Webhook
(yourmedguy.com)", published 2026-11-16. The workflow is built and tested end to end.

The endpoint only posts to it when `GHL_STARTER_KIT_WEBHOOK_URL` is set in Vercel.
It is not set. Until it is, `api/medicare-starter-kit.js` logs "not configured" and
each lead produces only the two Resend emails — nothing durable, no tag, no opportunity.

- Code: `api/_lib/ghl.js`, `api/medicare-starter-kit.js`, `.env.example`
- The webhook URL lives only in Vercel, never in the repo. Setting it is Jamal's step.
- HighLevel bills Inbound Webhook as a premium trigger (per-execution charge) — worth
  sizing against expected kit volume.

**To review:** whether webhook-first is still the right path vs. the API fallback
(`GHL_PRIVATE_TOKEN` + `GHL_CREATE_OPPORTUNITY`), and what the per-execution cost looks
like at realistic volume. Recommendation only — do not add the env var or re-point the
endpoint.

## 2. Should the `starter-kit` tag enter a nurture sequence? — open decision

Kit leads land as a contact with the `starter-kit` tag, contact source "Medicare Starter
Kit", a note with origin + consent, and one opportunity at "1. Sales Pipeline" → "New
Lead" (duplicates disabled). After that, nothing automated happens.

The existing "1. Marketing | Lead Workflow | Tags & Add To Workflows" triggers on
Facebook lead forms and the opt-in form, **not** on tags, so it does not pick these up.

Constraints from Jamal's Nov 16 2026 brief that any proposal must respect:

- YourMedGuy location only.
- Email-only follow-up — the kit form captures no SMS consent (`sms_consent: false`).
- Never fire SOA Collected (it triggers Meta CAPI).
- No Meta pixel/CAPI on the kit path.
- Never write the "2027 AEP Medicare Leads" sheet.

**To review:** whether `starter-kit` should feed an email nurture sequence, and if so
what the sequence looks like under those constraints. Draft it as a proposal — do not
build, publish, or modify any workflow in the live location.
