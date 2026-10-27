import SEO from "@/components/SEO";
import { LegalFrame, LaunchMail, LaunchPhone } from "@/components/launch/LaunchLayout";
import { ADDRESS, BRAND_LEGAL, LAUNCH_PAGES, LEGAL_EFFECTIVE } from "@/launch/brand";

const page = LAUNCH_PAGES[4];

export default function LaunchPrivacy() {
  return (
    <LegalFrame title="YourMedGuy Privacy Policy">
      <SEO title={page.title} description={page.description} canonical={`https://yourmedguy.com${page.path}`} />
      <div className="sub">Effective Date: {LEGAL_EFFECTIVE}</div>
      <div className="notice">
        <p><strong>IMPORTANT NOTICE REGARDING TEXT MESSAGING DATA</strong></p>
        <p>
          {BRAND_LEGAL} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) DOES NOT share customer opt-in information, including phone numbers and consent records, with any affiliates or third parties for marketing, promotional, or any other purposes unrelated to providing our direct services. All text messaging originator opt-in data is kept strictly confidential.
        </p>
      </div>

      <h2>1. Information We Collect</h2>
      <p>We collect the following types of information:</p>
      <h3>Personal Information:</h3>
      <ul>
        <li>Name, email address, phone number, physical address</li>
        <li>Payment information when you make a purchase or request a quote</li>
        <li>Opt-in records and timestamps for all communication channels (SMS, email, etc.)</li>
      </ul>
      <h3>Non-Personal Information:</h3>
      <ul>
        <li>IP address, browser type, device information</li>
        <li>Website usage patterns and analytics</li>
        <li>Cookies and similar technologies</li>
      </ul>
      <h3>Customer Communication:</h3>
      <ul>
        <li>Records of inquiries and service requests</li>
        <li>Appointment details and preferences</li>
        <li>Service history and feedback</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use collected data for:</p>
      <ul>
        <li>Providing and improving our services</li>
        <li>Processing transactions and payments</li>
        <li>Communicating with you about your inquiries, appointments, and promotions</li>
        <li>Enhancing website functionality and user experience</li>
        <li>Ensuring security and fraud prevention</li>
        <li>Maintaining records of your communication preferences and consent</li>
      </ul>

      <h2>3. SMS Messaging & Compliance</h2>
      <p><strong>Text Message Program Terms & Conditions</strong></p>
      <p>
        By opting into our SMS messaging services, you agree to receive text messages related to our services, including appointment reminders, customer support, and important updates.
      </p>
      <h3>Opt-In & Consent:</h3>
      <ul>
        <li>You will only receive messages if you have explicitly opted in</li>
        <li>We maintain timestamped records of all opt-in actions</li>
        <li>We comply with the Telephone Consumer Protection Act (TCPA) and all applicable laws</li>
      </ul>
      <h3>Opt-Out Instructions:</h3>
      <ul>
        <li>You can cancel SMS notifications at any time by replying &quot;STOP&quot;</li>
        <li>You will receive a final confirmation message, and no further messages will be sent unless you re-opt in</li>
        <li>All opt-out requests are processed immediately</li>
      </ul>
      <h3>Message Frequency & Content:</h3>
      <ul>
        <li>Message frequency varies based on your interactions with our business</li>
        <li>Messages will be directly related to the services you have requested</li>
        <li>We do not send promotional content without specific consent</li>
      </ul>
      <h3>Help & Support:</h3>
      <ul>
        <li>Reply &quot;HELP&quot; for assistance or contact us at <LaunchMail /></li>
        <li>Customer support is available during regular business hours</li>
      </ul>
      <h3>Carrier Information:</h3>
      <ul>
        <li>Standard message and data rates may apply</li>
        <li>Carriers are not liable for delayed or undelivered messages</li>
        <li>Supported carriers include AT&T, Verizon, T-Mobile, Sprint, and most regional carriers</li>
      </ul>
      <h3>SMS Data Protection Statement</h3>
      <p>
        No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing to subcontractors in support services, such as customer service is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
      </p>
      <p>We implement strict data protection measures to safeguard your SMS opt-in information and consent records.</p>

      <h2>4. Information Sharing & Disclosure</h2>
      <p>We do not sell, rent, or trade personal information. We may share information with:</p>
      <h3>Service Providers:</h3>
      <ul>
        <li>Third-party vendors who assist in our operations (e.g., payment processing, appointment scheduling)</li>
        <li>SMS aggregators and providers solely for the purpose of delivering messages you&apos;ve consented to receive</li>
        <li>All service providers are contractually obligated to maintain confidentiality and security</li>
      </ul>
      <h3>Legal Compliance:</h3>
      <ul>
        <li>If required by law, legal process, or to protect our rights</li>
        <li>In response to valid law enforcement requests or court orders</li>
      </ul>
      <h3>Business Transfers:</h3>
      <ul>
        <li>In case of mergers, acquisitions, or sale of assets</li>
        <li>In such cases, your data remains protected under the terms of this policy</li>
      </ul>
      <p>
        All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties, excluding aggregators and providers of the Text Message services.
      </p>

      <h2>5. Data Security</h2>
      <p>We implement and maintain reasonable security measures to protect your personal information:</p>
      <ul>
        <li>Encryption of sensitive data in transit and at rest</li>
        <li>Secure access controls and authentication mechanisms</li>
        <li>Regular security assessments and updates</li>
        <li>Employee training on data protection</li>
        <li>Breach notification protocols in accordance with applicable laws</li>
        <li>Secure backup systems and disaster recovery procedures</li>
      </ul>
      <p>
        Despite these measures, no method of transmission over the Internet or electronic storage is 100% secure. We strive to use commercially acceptable means to protect your personal information but cannot guarantee absolute security.
      </p>

      <h2>6. Cookies & Tracking Technologies</h2>
      <p>We use cookies and similar technologies to:</p>
      <ul>
        <li>Analyze site traffic and user behavior</li>
        <li>Remember your preferences</li>
        <li>Improve website functionality and user experience</li>
        <li>Measure the effectiveness of our services</li>
      </ul>
      <p>You may control cookies through your browser settings. Disabling cookies may limit your ability to use certain features of our website.</p>

      <h2>7. Your Rights & Choices</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access, update, or delete your personal information</li>
        <li>Opt-out of marketing emails by clicking &quot;unsubscribe&quot; in our emails</li>
        <li>Opt-out of SMS messages by replying &quot;STOP&quot;</li>
        <li>Request information on how we process your data</li>
        <li>Withdraw consent at any time for future communications</li>
        <li>Lodge a complaint with a supervisory authority if you believe your rights have been violated</li>
      </ul>
      <p>To exercise these rights, please contact us using the information in Section 10.</p>

      <h2>8. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their policies. This privacy policy applies only to information collected by {BRAND_LEGAL}.
      </p>

      <h2>9. Changes to This Privacy Policy</h2>
      <p>
        We may update this policy periodically. The latest version will always be available on our website with the effective date. For significant changes, we will notify you by email or through a notice on our website.
      </p>

      <h2>10. Contact Us</h2>
      <p>If you have questions about this Privacy Policy or how your information is handled, contact us at:</p>
      <p>
        {BRAND_LEGAL}
        <br />
        {ADDRESS}
        <br />
        Phone: <LaunchPhone />
        <br />
        Email: <LaunchMail />
      </p>
      <p>By using our website and services, you consent to this Privacy Policy.</p>
    </LegalFrame>
  );
}
