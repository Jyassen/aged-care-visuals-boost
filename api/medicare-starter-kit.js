import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, disclaimerAgreed, pageUrl } = req.body || {};
    if (!name || !email || !disclaimerAgreed) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://yourmedguy.com';

    // Send the starter kit to the user with download links
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@yourmedguy.com',
      to: email,
      subject: 'Your NY Medicare Starter Kit from YourMedGuy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #1e40af;">Welcome to Your NY Medicare Journey!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for requesting your NY Medicare Starter Kit. We're excited to help you simplify Medicare.</p>
          <p><strong>Click the links below to download your guides:</strong></p>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;">
              📄 <a href="${baseUrl}/guides/Medicare-10-Questions-OnePager.pdf" style="color: #1e40af; font-weight: bold; text-decoration: none;">Medicare 10 Questions One-Pager</a><br>
              <span style="font-size: 14px; color: #666;">Essential questions to ask before choosing a plan</span>
            </p>
            <p style="margin: 10px 0;">
              📄 <a href="${baseUrl}/guides/Medicare-VIP-ContactsFINAL.pdf" style="color: #1e40af; font-weight: bold; text-decoration: none;">Medicare VIP Contacts</a><br>
              <span style="font-size: 14px; color: #666;">Key contacts for New York Medicare support</span>
            </p>
            <p style="margin: 10px 0;">
              📄 <a href="${baseUrl}/guides/YourMedGuy-Medicare-Myths-vs-Reality.pdf" style="color: #1e40af; font-weight: bold; text-decoration: none;">Medicare Myths vs Reality</a><br>
              <span style="font-size: 14px; color: #666;">Bust common myths with facts</span>
            </p>
          </div>
          <p>If you have questions or need personalized help, <a href="tel:888-355-1085" style="color: #1e40af;">call us at 888-355-1085</a> – our licensed advisors are here to assist.</p>
          <p style="color: #666; font-size: 14px;">Best regards,<br>The YourMedGuy Team</p>
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px; font-size: 12px; color: #999;">
            <p>You received this email because you requested the NY Medicare Starter Kit.</p>
          </div>
        </div>
      `
    });

    // Notify the team
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@yourmedguy.com',
      to: process.env.TO_EMAIL,
      subject: `New Medicare Starter Kit Request - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Medicare Starter Kit Lead
          </h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Lead Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #1e40af;">${email}</a></p>
            ${pageUrl ? `<p><strong>Page URL:</strong> <a href="${pageUrl}" style="color: #1e40af;">${pageUrl}</a></p>` : ''}
            <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })}</p>
          </div>
          <div style="background-color: #1e40af; color: white; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; font-weight: bold;">Follow-up Opportunity</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">This lead requested educational content – great for nurturing. Consider a follow-up call in 3-5 days.</p>
          </div>
        </div>
      `,
    });

    console.log('Starter kit sent successfully');
    res.status(200).json({ message: 'Starter kit sent successfully' });
  } catch (error) {
    console.error('Error sending starter kit:', error);
    res.status(500).json({ message: 'Failed to send starter kit' });
  }
}
