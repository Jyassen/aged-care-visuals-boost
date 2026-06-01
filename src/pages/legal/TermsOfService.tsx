import LegalPageLayout from "@/components/legal/LegalPageLayout";
import LegalContact from "@/components/legal/LegalContact";

const TermsOfService = () => (
  <LegalPageLayout
    title="Terms of Service"
    description="Terms and conditions for using YourMedGuy.com and our Medicare services."
    canonicalPath="/terms-of-service"
  >
    <header className="space-y-2 border-b pb-8">
      <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
      <p className="text-muted-foreground">Effective Date: September 13, 2024</p>
      <p className="text-lg leading-relaxed">
        Welcome to YourMedGuy.com, a subsidiary of Yassco Consulting Group LLC. By accessing and using
        our website and services, you agree to the following Terms of Service.
      </p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">1. Use of Website</h2>
      <p>
        You agree to use the website in accordance with these terms and any applicable laws and
        regulations. Unauthorized use of this website may result in legal actions.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">2. Service Limitations</h2>
      <p>
        We strive to provide accurate and up-to-date information about Medicare plans, but we do not
        guarantee the completeness or accuracy of any information on our site. The content is provided
        for general informational purposes only and is not intended as legal, financial, or medical
        advice.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">3. No Government Affiliation</h2>
      <p>
        YourMedGuy is an independent service provider and is not affiliated with the U.S. government or
        the Centers for Medicare &amp; Medicaid Services (CMS).
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
      <p>
        All content, including text, images, logos, and design, is the intellectual property of Yassco
        Consulting Group LLC and may not be used without express permission.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
      <p>
        YourMedGuy shall not be liable for any direct, indirect, incidental, or consequential damages
        arising from the use or inability to use our website or services.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">6. Changes to Terms</h2>
      <p>
        We reserve the right to update these Terms of Service at any time. Any changes will be posted
        on this page with the effective date.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Contact Us</h2>
      <p>For any questions, contact us at:</p>
      <LegalContact />
    </section>
  </LegalPageLayout>
);

export default TermsOfService;
