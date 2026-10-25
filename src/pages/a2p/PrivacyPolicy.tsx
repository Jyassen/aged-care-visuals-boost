import LaunchLayout from "./LaunchLayout";

/**
 * A2P Privacy Policy for YourMedGuy.
 * Replicates the Yassco Consulting Group LLC Nebula Privacy Policy verbatim,
 * except the display name is changed to YourMedGuy. Yassco Consulting Group
 * LLC is retained as the legal business name: YourMedGuy is a subsidiary
 * of Yassco Consulting Group LLC. Contact details and the effective date
 * are kept exactly as on the source site.
 */
const PrivacyPolicy = () => (
  <LaunchLayout
    title="Privacy Policy"
    description="Privacy Policy for YourMedGuy, a subsidiary of Yassco Consulting Group LLC, including SMS messaging and opt-in data protection."
    canonicalPath="/launch/privacy"
  >
    <header className="space-y-2 border-b pb-8">
      <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy — YourMedGuy</h1>
      <p className="text-muted-foreground">Effective Date: 10/12/2025</p>
      <p className="text-muted-foreground">
        YourMedGuy is a subsidiary of Yassco Consulting Group LLC, the legal business name.
      </p>
      <p className="text-lg leading-relaxed">
        <strong>IMPORTANT NOTICE REGARDING TEXT MESSAGING DATA</strong>
      </p>
      <p className="text-lg leading-relaxed">
        YourMedGuy, a subsidiary of Yassco Consulting Group LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
        DOES NOT share customer opt-in information, including phone numbers and consent records, with any affiliates or
        third parties for marketing, promotional, or any other purposes unrelated to providing our direct services. All
        text messaging originator opt-in data is kept strictly confidential.
      </p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
      <p>We collect the following types of information:</p>
      <h3 className="text-xl font-semibold">Personal Information:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Name, email address, phone number, physical address</li>
        <li>Payment information when you make a purchase or request a quote</li>
        <li>Opt-in records and timestamps for all communication channels (SMS, email, etc.)</li>
      </ul>
      <h3 className="text-xl font-semibold">Non-Personal Information:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>IP address, browser type, device information</li>
        <li>Website usage patterns and analytics</li>
        <li>Cookies and similar technologies</li>
      </ul>
      <h3 className="text-xl font-semibold">Customer Communication:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Records of inquiries and service requests</li>
        <li>Appointment details and preferences</li>
        <li>Service history and feedback</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
      <p>We use collected data for:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Providing and improving our services</li>
        <li>Processing transactions and payments</li>
        <li>Communicating with you about your inquiries, appointments, and promotions</li>
        <li>Enhancing website functionality and user experience</li>
        <li>Ensuring security and fraud prevention</li>
        <li>Maintaining records of your communication preferences and consent</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">3. SMS Messaging &amp; Compliance</h2>
      <p>
        <strong>Text Message Program Terms &amp; Conditions</strong>
      </p>
      <p>
        By opting into our SMS messaging services, you agree to receive text messages related to our services, including
        appointment reminders, customer support, and important updates.
      </p>
      <h3 className="text-xl font-semibold">Opt-In &amp; Consent:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>You will only receive messages if you have explicitly opted in</li>
        <li>We maintain timestamped records of all opt-in actions</li>
        <li>We comply with the Telephone Consumer Protection Act (TCPA) and all applicable laws</li>
      </ul>
      <h3 className="text-xl font-semibold">Opt-Out Instructions:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>You can cancel SMS notifications at any time by replying &quot;STOP&quot;</li>
        <li>You will receive a final confirmation message, and no further messages will be sent unless you re-opt in</li>
        <li>All opt-out requests are processed immediately</li>
      </ul>
      <h3 className="text-xl font-semibold">Message Frequency &amp; Content:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Message frequency varies based on your interactions with our business</li>
        <li>Messages will be directly related to the services you have requested</li>
        <li>We do not send promotional content without specific consent</li>
      </ul>
      <h3 className="text-xl font-semibold">Help &amp; Support:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Reply &quot;HELP&quot; for assistance or contact us at{" "}
          <a href="mailto:team@yasscoconsultinggroupllc.nebulabrandgroup.com" className="text-primary hover:underline">
            team@yasscoconsultinggroupllc.nebulabrandgroup.com
          </a>
        </li>
        <li>Customer support is available during regular business hours</li>
      </ul>
      <h3 className="text-xl font-semibold">Carrier Information:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Standard message and data rates may apply</li>
        <li>Carriers are not liable for delayed or undelivered messages</li>
        <li>Supported carriers include AT&amp;T, Verizon, T-Mobile, Sprint, and most regional carriers</li>
      </ul>
      <p>
        <strong>SMS Data Protection Statement</strong>
      </p>
      <p>
        No mobile information will be shared with third parties/affiliates for marketing/promotional purposes.
        Information sharing to subcontractors in support services, such as customer service is permitted. All other use
        case categories exclude text messaging originator opt-in data and consent; this information will not be shared
        with any third parties.
      </p>
      <p>We implement strict data protection measures to safeguard your SMS opt-in information and consent records.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">4. Information Sharing &amp; Disclosure</h2>
      <p>We do not sell, rent, or trade personal information. We may share information with:</p>
      <h3 className="text-xl font-semibold">Service Providers:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Third-party vendors who assist in our operations (e.g., payment processing, appointment scheduling)</li>
        <li>SMS aggregators and providers solely for the purpose of delivering messages you&apos;ve consented to receive</li>
        <li>All service providers are contractually obligated to maintain confidentiality and security</li>
      </ul>
      <h3 className="text-xl font-semibold">Legal Compliance:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>If required by law, legal process, or to protect our rights</li>
        <li>In response to valid law enforcement requests or court orders</li>
      </ul>
      <h3 className="text-xl font-semibold">Business Transfers:</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>In case of mergers, acquisitions, or sale of assets</li>
        <li>In such cases, your data remains protected under the terms of this policy</li>
      </ul>
      <p>
        All the above categories exclude text messaging originator opt-in data and consent; this information will not
        be shared with any third parties, excluding aggregators and providers of the Text Message services.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">5. Data Security</h2>
      <p>We implement and maintain reasonable security measures to protect your personal information:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Encryption of sensitive data in transit and at rest</li>
        <li>Secure access controls and authentication mechanisms</li>
        <li>Regular security assessments and updates</li>
        <li>Employee training on data protection</li>
        <li>Breach notification protocols in accordance with applicable laws</li>
        <li>Secure backup systems and disaster recovery procedures</li>
      </ul>
      <p>
        Despite these measures, no method of transmission over the Internet or electronic storage is 100% secure. We
        strive to use commercially acceptable means to protect your personal information but cannot guarantee absolute
        security.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">6. Cookies &amp; Tracking Technologies</h2>
      <p>We use cookies and similar technologies to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Analyze site traffic and user behavior</li>
        <li>Remember your preferences</li>
        <li>Improve website functionality and user experience</li>
        <li>Measure the effectiveness of our services</li>
      </ul>
      <p>
        You may control cookies through your browser settings. Disabling cookies may limit your ability to use certain
        features of our website.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">7. Your Rights &amp; Choices</h2>
      <p>You have the right to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Access, update, or delete your personal information</li>
        <li>Opt-out of marketing emails by clicking &quot;unsubscribe&quot; in our emails</li>
        <li>Opt-out of SMS messages by replying &quot;STOP&quot;</li>
        <li>Request information on how we process your data</li>
        <li>Withdraw consent at any time for future communications</li>
        <li>Lodge a complaint with a supervisory authority if you believe your rights have been violated</li>
      </ul>
      <p>To exercise these rights, please contact us using the information in Section 10.</p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">8. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. We are not responsible for their privacy practices and
        encourage you to review their policies. This privacy policy applies only to information collected by YourMedGuy.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">9. Changes to This Privacy Policy</h2>
      <p>
        We may update this policy periodically. The latest version will always be available on our website with the
        effective date. For significant changes, we will notify you by email or through a notice on our website.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">10. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or how your information is handled, contact us at:{" "}
        <strong>YourMedGuy, a subsidiary of Yassco Consulting Group LLC</strong>
      </p>
      <p>Phone: (917) 703-8352</p>
      <p>
        Email:{" "}
        <a href="mailto:team@yasscoconsultinggroupllc.nebulabrandgroup.com" className="text-primary hover:underline">
          team@yasscoconsultinggroupllc.nebulabrandgroup.com
        </a>
      </p>
      <p>By using our website and services, you consent to this Privacy Policy.</p>
      <p>© YourMedGuy, a subsidiary of Yassco Consulting Group LLC</p>
    </section>
  </LaunchLayout>
);

export default PrivacyPolicy;
