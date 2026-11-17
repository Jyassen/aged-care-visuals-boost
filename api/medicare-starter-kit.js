import { Resend } from 'resend';
import { syncStarterKitLead } from './_lib/ghl.js';

const resend = new Resend(process.env.RESEND_API_KEY);

/** "exit-intent" when the popup sent the lead, otherwise "starter-kit" (the kit page). */
const leadSourceFromUrl = (pageUrl = '') => (/[?&]src=exit-intent\b/.test(pageUrl) ? 'exit-intent' : 'starter-kit');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, disclaimerAgreed, pageUrl, phone } = req.body || {};
    if (!name || !email || !disclaimerAgreed) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Always use production URL for PDF links to avoid Vercel auth issues
    const baseUrl = 'https://yourmedguy.com';

    // The exit-intent popup offers one guide (the NY + NJ Stress-Free Medicare Guide 2027);
    // the kit page offers the three-guide starter kit. Same endpoint, different deliverable.
    const source = leadSourceFromUrl(pageUrl);
    const isGuideOnly = source === 'exit-intent';

    const guideBlock = isGuideOnly
      ? `
            <p style="margin: 10px 0;">
              📄 <a href="${baseUrl}/guides/YourMedGuy-Stress-Free-Medicare-Guide-2027.pdf" style="color: #1e40af; font-weight: bold; text-decoration: none;">The Stress-Free Medicare Guide (2027)</a><br>
              <span style="font-size: 14px; color: #666;">Medicare in New York and New Jersey in plain English: 2027 costs, supplement versus Medicare Advantage, the enrollment deadlines, and the programs that help pay for it</span>
            </p>`
      : `
            <p style="margin: 10px 0;">
              📄 <a href="${baseUrl}/guides/YourMedGuy-10-Questions-2027.pdf" style="color: #1e40af; font-weight: bold; text-decoration: none;">10 Questions to Ask Before You Choose a Plan (2027)</a><br>
              <span style="font-size: 14px; color: #666;">The questions that reveal what a plan really costs</span>
            </p>
            <p style="margin: 10px 0;">
              📄 <a href="${baseUrl}/guides/YourMedGuy-Medicare-VIP-Contacts-NY-2027.pdf" style="color: #1e40af; font-weight: bold; text-decoration: none;">Medicare VIP Contacts, New York (2027)</a><br>
              <span style="font-size: 14px; color: #666;">Free help lines and money-help programs, with 2027 limits</span>
            </p>
            <p style="margin: 10px 0;">
              📄 <a href="${baseUrl}/guides/YourMedGuy-Medicare-Myths-vs-Reality-2027.pdf" style="color: #1e40af; font-weight: bold; text-decoration: none;">Medicare Myths vs Reality (2027)</a><br>
              <span style="font-size: 14px; color: #666;">Six costly myths, with the 2027 numbers</span>
            </p>`;

    // Send the requested guide(s) to the visitor with download links
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@yourmedguy.com',
      to: email,
      subject: isGuideOnly
        ? 'Your Stress-Free Medicare Guide 2027 from YourMedGuy'
        : 'Your NY Medicare Starter Kit from YourMedGuy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #1e40af;">${isGuideOnly ? 'Your Stress-Free Medicare Guide is here' : 'Welcome to Your NY Medicare Journey!'}</h2>
          <p>Hi ${name},</p>
          <p>${isGuideOnly
            ? "Thank you for requesting the Stress-Free Medicare Guide, written for New York and New Jersey. It's the plain-English version of what I explain at kitchen tables every week."
            : "Thank you for requesting your NY Medicare Starter Kit. We're excited to help you simplify Medicare."}</p>
          <p><strong>${isGuideOnly ? 'Click the link below to download your guide:' : 'Click the links below to download your guides:'}</strong></p>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">${guideBlock}
          </div>
          <p>If you have questions or need personalized help, <a href="mailto:support@yourmedguy.com" style="color: #1e40af;">email us at support@yourmedguy.com</a> – our licensed advisors are here to assist.</p>
          <p style="text-align: center; margin: 30px 0;">
            Or visit our site to get more information:<br><br>
            <a href="https://yourmedguy.com" style="display: inline-block; background: linear-gradient(to right, #2563eb, #1e40af); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Visit YourMedGuy.com</a>
          </p>
          <p style="color: #666; font-size: 14px;">Best regards,<br>The YourMedGuy Team</p>
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px; font-size: 12px; color: #999;">
            <p>You received this email because you requested ${isGuideOnly ? 'the Stress-Free Medicare Guide' : 'the NY Medicare Starter Kit'} from YourMedGuy.</p>
          </div>
        </div>
      `
    });

    // Push the lead into HighLevel (YourMedGuy location) as an additional destination.
    // Email-only follow-up: the kit form captures no SMS consent. No pixel/CAPI from here.
    const ghl = await syncStarterKitLead({ name, email, phone, pageUrl, source });

    // Notify the team
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@yourmedguy.com',
      to: process.env.TO_EMAIL,
      subject: `New ${isGuideOnly ? 'Stress-Free Guide' : 'Medicare Starter Kit'} Request - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New ${isGuideOnly ? 'Stress-Free Guide' : 'Medicare Starter Kit'} Lead
          </h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Lead Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #1e40af;">${email}</a></p>
            ${pageUrl ? `<p><strong>Page URL:</strong> <a href="${pageUrl}" style="color: #1e40af;">${pageUrl}</a></p>` : ''}
            <p><strong>Source:</strong> ${source === 'exit-intent' ? 'Exit-intent popup' : 'Starter kit page'}</p>
            <p><strong>Sent:</strong> ${isGuideOnly ? 'Stress-Free Medicare Guide 2027 (NY + NJ)' : 'Three-guide starter kit'}</p>
            <p><strong>HighLevel:</strong> ${ghl.ok ? `Synced via ${ghl.via}${ghl.verified ? ', read-back verified' : ''}` : `Not synced (${ghl.reason || 'see logs'})`}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })}</p>
          </div>
          <div style="background-color: #1e40af; color: white; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; font-weight: bold;">Follow-up Opportunity</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">This lead requested educational content – great for nurturing. Consider a follow-up email in 3-5 days.</p>
          </div>
        </div>
      `,
    });

    console.log(`Sent ${isGuideOnly ? 'Stress-Free Medicare Guide' : 'starter kit'} to lead (${source})`);
    res.status(200).json({ message: 'Starter kit sent successfully' });
  } catch (error) {
    console.error('Error sending starter kit:', error);
    res.status(500).json({ message: 'Failed to send starter kit' });
  }
}
