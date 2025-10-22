import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, pageUrl } = req.body || {};
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const emailResponse = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
      to: process.env.TO_EMAIL,
      subject: `New Newsletter Subscriber - ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Newsletter Subscription
          </h2>
          <p><strong>Name:</strong> ${firstName || ''} ${lastName || ''}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #1e40af;">${email}</a></p>
          ${pageUrl ? `<p><strong>Page URL:</strong> <a href="${pageUrl}" style="color: #1e40af;">${pageUrl}</a></p>` : ''}
          <p style="color:#6b7280; font-size: 14px;">
            <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', {
              timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short'
            })}
          </p>
        </div>
      `,
    });

    console.log('Subscriber email sent:', emailResponse);
    return res.status(200).json({ message: 'Subscribed' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ message: 'Failed to subscribe' });
  }
}


