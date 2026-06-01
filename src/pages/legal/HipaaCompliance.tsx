import LegalPageLayout from "@/components/legal/LegalPageLayout";
import LegalContact from "@/components/legal/LegalContact";

const HipaaCompliance = () => (
  <LegalPageLayout
    title="HIPAA Compliance"
    description="How YourMedGuy safeguards your protected health information."
    canonicalPath="/hipaa-compliance"
  >
    <header className="space-y-2 border-b pb-8">
      <h1 className="text-3xl md:text-4xl font-bold">HIPAA Compliance Statement</h1>
      <p className="text-lg leading-relaxed">
        YourMedGuy.com, a subsidiary of Yassco Consulting Group LLC, is committed to safeguarding the
        privacy of your health information in accordance with the Health Insurance Portability and
        Accountability Act (HIPAA).
      </p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">1. Protected Health Information (PHI)</h2>
      <p>
        We may collect personal and health-related information when providing Medicare services. This
        information is protected and only shared in compliance with HIPAA regulations.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">2. How We Protect Your Information</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>We implement administrative, physical, and technical safeguards to secure your PHI.</li>
        <li>We limit access to PHI to authorized individuals who need it for legitimate business purposes.</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">3. Your Rights</h2>
      <p>
        You have the right to access, correct, and request restrictions on the use of your PHI. You may
        also request an accounting of disclosures.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Contact Us</h2>
      <p>For more information on your rights, please contact us at:</p>
      <LegalContact />
    </section>
  </LegalPageLayout>
);

export default HipaaCompliance;
