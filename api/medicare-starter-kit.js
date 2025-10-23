import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

const PDF_PATHS = {
  onePager: path.join(process.cwd(), 'docs', 'Medicare-10-Questions-OnePager.pdf'),
  vipContacts: path.join(process.cwd(), 'docs', 'Medicare-VIP-ContactsFINAL.pdf'),
  mythsReality: path.join(process.cwd(), 'docs', 'YourMedGuy-Medicare-Myths-vs-Reality.pdf')
};

function getAttachments() {
  const attachments = [];
  for (const [key, filePath] of Object.entries(PDF_PATHS)) {
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      attachments.push({
        filename: `YourMedGuy-NY-Medicare-${key.replace(/([A-Z])/g, ' $1').trim()}.pdf`,
        content: fileBuffer.toString('base64'),
        contentType: 'application/pdf'
      });
    }
  }
  return attachments;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, disclaimerAgreed, pageUrl } = req.body || {};
    if (!name || !email || !disclaimerAgreed) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const attachments = getAttachments();
    if (attachments.length === 0) {
      return res.status(500).json({ message: 'Failed to load attachments' });
    }

    // Send the starter kit to the user
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@yourmedguy.com',
      to: email,
      subject: 'Your Free NY Medicare Starter Kit from YourMedGuy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #1e40af;">Welcome to Your NY Medicare Journey!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for requesting your free NY Medicare Starter Kit. We're excited to help you simplify Medicare.</p>
          <p>Inside this kit, you'll find:</p>
          <ul>
            <li><strong>Medicare 10 Questions One-Pager:</strong> Essential questions to ask before choosing a plan.</li>
            <li><strong>Medicare VIP Contacts FINAL:</strong> Key contacts for New York Medicare support.</li>
            <li><strong>YourMedGuy Medicare Myths vs Reality:</strong> Bust common myths with facts.</li>
          </ul>
          <p>These guides are attached below. Download and review them at your convenience.</p>
          <p>If you have questions or need personalized help, <a href="tel:888-355-1085" style="color: #1e40af;">call us at 888-355-1085</a> – our licensed advisors are here to assist.</p>
          <p style="color: #666; font-size: 14px;">Best regards,<br>The YourMedGuy Team</p>
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px; font-size: 12px; color: #999;">
            <p>You received this email because you requested the NY Medicare Starter Kit. To unsubscribe, <a href="#" style="color: #1e40af;">click here</a>.</p>
          </div>
        </div>
      `,
      attachments
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
