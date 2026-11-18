/**
 * HighLevel (GoHighLevel) sync for Medicare Starter Kit leads.
 *
 * Follows the "Brief for Claude Code — wire the Medicare Starter Kit into HighLevel"
 * (2026-11-16). Live-system rules baked in here:
 *   - YourMedGuy sub-account only (location 1sUU5Trz1pkSpCoWcRwr). Never Medigard / FuelFoods.
 *   - Webhook first, no key: POST the lead JSON to a HighLevel Inbound Webhook workflow.
 *     The workflow upserts the contact, adds the `starter-kit` tag and creates the opportunity.
 *   - API path only if the webhook isn't configured: upsert by email (never blind-create),
 *     then add the tag in a separate call (upsert cannot carry tags), optionally create one
 *     opportunity at "New Lead", then READ BACK and confirm before reporting success.
 *   - Never "SOA Collected". Never fire Meta pixel/CAPI. Never write the ads lead sheet.
 *   - SMS consent is per-contact; the kit form captures email consent only, so the payload
 *     says so and the contact is never enrolled in SMS from here.
 *   - A HighLevel failure must never block the kit email: this module never throws.
 *
 * Vercel environment variables (never commit values):
 *   GHL_STARTER_KIT_WEBHOOK_URL   Preferred. Inbound Webhook URL from the YourMedGuy workflow.
 *   GHL_PRIVATE_TOKEN             Fallback. Private Integration token (contacts.write,
 *                                 contacts.readonly, opportunities.write) for YourMedGuy.
 *   GHL_LOCATION_ID               Optional override; defaults to the YourMedGuy location.
 *   GHL_CREATE_OPPORTUNITY        "true" to create the New Lead opportunity from the API path.
 *                                 Leave unset if the Marketing Lead Workflow already creates it
 *                                 from the tag (one opportunity per lead).
 */

export const YOURMEDGUY_LOCATION_ID = '1sUU5Trz1pkSpCoWcRwr';
export const STARTER_KIT_TAG = 'starter-kit';
export const CONTACT_SOURCE = 'Medicare Starter Kit';
export const SALES_PIPELINE_ID = '1aT4FK5WJCIgG1HCIss5'; // "1. Sales Pipeline"
export const NEW_LEAD_STAGE_ID = '4192639d-5b8e-483f-9aa7-9dba5ebe662f'; // "New Lead" (position 0)

const GHL_API = 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = '2021-07-28';

const splitName = (fullName = '') => {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: '', lastName: '' };
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
};

/** Builds the JSON both paths send, so the webhook workflow and the API see the same fields. */
export const buildStarterKitLead = ({ name, email, phone, pageUrl, source, submittedAt }) => {
  const { firstName, lastName } = splitName(name);
  const origin = source === 'exit-intent' ? 'exit-intent popup' : 'starter kit page';
  // The two paths hand out different assets; the note has to say which one, because it is
  // what Jamal reads before calling the lead.
  const asset =
    source === 'exit-intent'
      ? 'the Stress-Free Medicare Guide 2027 (NY + NJ)'
      : 'the NY Medicare Starter Kit (2027)';
  return {
    first_name: firstName,
    last_name: lastName,
    full_name: String(name || '').trim(),
    email: String(email || '').trim().toLowerCase(),
    phone: phone ? String(phone).trim() : '',
    source: CONTACT_SOURCE,
    src: source, // "exit-intent" | "starter-kit"
    page_url: pageUrl || '',
    submitted_at: submittedAt || new Date().toISOString(),
    tag: STARTER_KIT_TAG,
    email_consent: true, // kit form: "send me the starter kit + helpful Medicare tips"
    sms_consent: false, // the kit form has no SMS consent checkbox: email-only follow-up
    note: `Requested ${asset} via the ${origin}${pageUrl ? ` at ${pageUrl}` : ''}. Email consent: yes. SMS consent: not captured (email-only follow-up).`,
  };
};

const apiHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  Version: GHL_API_VERSION,
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

/**
 * @returns {Promise<{ok: boolean, via?: 'webhook'|'api', contactId?: string, verified?: boolean, reason?: string}>}
 */
export async function syncStarterKitLead(input) {
  const lead = buildStarterKitLead(input);
  const webhookUrl = process.env.GHL_STARTER_KIT_WEBHOOK_URL;
  const token = process.env.GHL_PRIVATE_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID || YOURMEDGUY_LOCATION_ID;

  try {
    // Preferred path: inbound webhook workflow in the YourMedGuy location.
    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        console.error('GHL webhook failed', res.status);
        return { ok: false, via: 'webhook', reason: `HTTP ${res.status}` };
      }
      // Read-back verification needs an API token; without one the workflow owns the write.
      return { ok: true, via: 'webhook', verified: false };
    }

    // Fallback path: direct API with a Private Integration token.
    if (token) {
      const upsert = await fetch(`${GHL_API}/contacts/upsert`, {
        method: 'POST',
        headers: apiHeaders(token),
        body: JSON.stringify({
          locationId,
          firstName: lead.first_name,
          lastName: lead.last_name,
          name: lead.full_name,
          email: lead.email,
          ...(lead.phone ? { phone: lead.phone } : {}),
          source: CONTACT_SOURCE,
        }),
      });
      const upsertBody = await upsert.json().catch(() => ({}));
      const contactId = upsertBody?.contact?.id;
      if (!upsert.ok || !contactId) {
        console.error('GHL upsert failed', upsert.status, upsertBody);
        return { ok: false, via: 'api', reason: `upsert HTTP ${upsert.status}` };
      }

      // Tags cannot ride on upsert: add in a separate call.
      const tagRes = await fetch(`${GHL_API}/contacts/${contactId}/tags`, {
        method: 'POST',
        headers: apiHeaders(token),
        body: JSON.stringify({ tags: [STARTER_KIT_TAG] }),
      });
      if (!tagRes.ok) console.error('GHL tag add failed', tagRes.status);

      await fetch(`${GHL_API}/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: apiHeaders(token),
        body: JSON.stringify({ body: lead.note }),
      }).catch((err) => console.error('GHL note failed', err));

      if (process.env.GHL_CREATE_OPPORTUNITY === 'true') {
        const oppRes = await fetch(`${GHL_API}/opportunities/`, {
          method: 'POST',
          headers: apiHeaders(token),
          body: JSON.stringify({
            locationId,
            pipelineId: SALES_PIPELINE_ID,
            pipelineStageId: NEW_LEAD_STAGE_ID,
            contactId,
            name: `${lead.full_name || lead.email} — Medicare Starter Kit`,
            status: 'open',
            source: CONTACT_SOURCE,
          }),
        });
        if (!oppRes.ok) console.error('GHL opportunity failed', oppRes.status);
      }

      // Fresh read: HighLevel has returned success while silently dropping fields before.
      const readBack = await fetch(`${GHL_API}/contacts/${contactId}`, { headers: apiHeaders(token) });
      const readBody = await readBack.json().catch(() => ({}));
      const contact = readBody?.contact || {};
      const verified =
        readBack.ok &&
        String(contact.email || '').toLowerCase() === lead.email &&
        Array.isArray(contact.tags) &&
        contact.tags.map((t) => String(t).toLowerCase()).includes(STARTER_KIT_TAG);
      if (!verified) console.error('GHL read-back mismatch', { contactId, email: contact.email, tags: contact.tags });
      return { ok: verified, via: 'api', contactId, verified, ...(verified ? {} : { reason: 'read-back mismatch' }) };
    }

    console.warn('GHL sync skipped: set GHL_STARTER_KIT_WEBHOOK_URL (preferred) or GHL_PRIVATE_TOKEN');
    return { ok: false, reason: 'not configured' };
  } catch (err) {
    console.error('GHL sync error', err);
    return { ok: false, reason: err?.message || 'error' };
  }
}
