import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, phone, email, bestTime, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !phone || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@yourdomain.com',
      to: process.env.TO_EMAIL,
      subject: `New Medicare Lead - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Lead from YourMedGuy.com
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Phone:</strong> <a href="tel:${phone}" style="color: #1e40af;">${phone}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #1e40af;">${email}</a></p>
            <p><strong>Best Time to Call:</strong> ${bestTime || 'Not specified'}</p>
          </div>

          ${message ? `
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">Message</h3>
              <p style="color: #92400e;">${message}</p>
            </div>
          ` : ''}

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
            <p style="color: #6b7280; font-size: 14px;">
              <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { 
                timeZone: 'America/New_York',
                dateStyle: 'full',
                timeStyle: 'short'
              })}
            </p>
            <p style="color: #6b7280; font-size: 14px;">
              <strong>Source:</strong> YourMedGuy.com Contact Form
            </p>
          </div>

          <div style="background-color: #1e40af; color: white; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; font-weight: bold;">⚡ Follow-up Action Required</p>
            <p style="margin: 5px 0 0 0; font-size: 14px;">
              Call within 24 hours for best conversion rates
            </p>
          </div>
        </div>
      `,
    });

    console.log('Email sent successfully:', emailResponse);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}