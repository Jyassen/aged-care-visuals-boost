import LegalPageLayout from "@/components/legal/LegalPageLayout";
import LegalContact from "@/components/legal/LegalContact";

const PrivacyPolicy = () => (
  <LegalPageLayout
    title="Privacy Policy"
    description="Learn how YourMedGuy collects, uses, and protects your personal information."
    canonicalPath="/privacy-policy"
  >
    <header className="space-y-2 border-b pb-8">
      <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
      <p className="text-muted-foreground">Effective Date: September 14, 2024</p>
      <p className="text-lg leading-relaxed">
        YourMedGuy.com, a subsidiary of Yassco Consulting Group LLC, is committed to protecting your
        privacy. This Privacy Policy outlines how we collect, use, and protect your personal information
        when you use our website and services. By accessing or using YourMedGuy.com, you agree to the
        terms of this Privacy Policy.
      </p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Personal Information:</strong> When you fill out forms on our website or contact us,
          we may collect personal information such as your name, email address, phone number, mailing
          address, and any other information you provide to us.
        </li>
        <li>
          <strong>Health Information:</strong> As part of our Medicare-related services, we may collect
          information about your health plan, Medicare eligibility, prescription medications, and
          healthcare providers.
        </li>
        <li>
          <strong>Usage Data:</strong> We collect information about how you use our website, including
          your IP address, browser type, operating system, pages viewed, and the date and time of your
          visit.
        </li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
      <p>YourMedGuy.com uses your personal information for the following purposes:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>To provide personalized Medicare insurance services and recommendations.</li>
        <li>To communicate with you about your Medicare options, including follow-up calls or emails.</li>
        <li>To process your requests and inquiries.</li>
        <li>To improve our website and services.</li>
        <li>To comply with legal and regulatory requirements, including those set forth by CMS.</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">3. Sharing Your Information</h2>
      <p>We may share your information in the following circumstances:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>With Insurance Firms:</strong> We may share your information with licensed insurance
          agents and insurance firms to provide you with Medicare plan options.
        </li>
        <li>
          <strong>With Service Providers:</strong> We may share your information with trusted third-party
          service providers who assist us in operating our website and services.
        </li>
        <li>
          <strong>As Required by Law:</strong> We may disclose your information when required by law,
          including to comply with CMS regulations and other governmental requests.
        </li>
        <li>
          <strong>With Your Consent:</strong> We may share your information with third parties if you
          give us permission to do so.
        </li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">4. Data Security</h2>
      <p>
        YourMedGuy.com takes reasonable precautions to protect your personal information. We use
        industry-standard security measures to safeguard your data from unauthorized access, use, or
        disclosure. However, no internet transmission is completely secure, and we cannot guarantee the
        absolute security of your data.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">5. Your Rights</h2>
      <p>You have the right to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Access and review your personal information.</li>
        <li>Request corrections to any inaccurate information.</li>
        <li>Opt-out of receiving marketing communications from us at any time.</li>
        <li>Request that we delete your personal information, subject to legal or regulatory obligations.</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">6. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. Please be aware that we are not
        responsible for the privacy practices or content of these third-party sites. We encourage you to
        read the privacy policies of any third-party websites you visit.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">7. Changes to This Privacy Policy</h2>
      <p>
        YourMedGuy.com may update this Privacy Policy from time to time. Any changes will be posted on
        this page, and the effective date will be updated accordingly. We encourage you to review this
        Privacy Policy periodically to stay informed about how we are protecting your information.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">8. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
      <LegalContact />
    </section>
  </LegalPageLayout>
);

export default PrivacyPolicy;
