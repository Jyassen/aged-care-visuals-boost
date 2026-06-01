import LegalPageLayout from "@/components/legal/LegalPageLayout";
import LegalContact from "@/components/legal/LegalContact";

const ConsentToContact = () => (
  <LegalPageLayout
    title="Consent to Contact"
    description="How YourMedGuy communicates with you and your opt-out rights."
    canonicalPath="/consent-to-contact"
  >
    <header className="space-y-2 border-b pb-8">
      <h1 className="text-3xl md:text-4xl font-bold">Consent to Contact</h1>
      <p className="text-lg leading-relaxed">
        By submitting your contact information through our website, you consent to receive
        communications from YourMedGuy, a subsidiary of Yassco Consulting Group LLC. This includes calls,
        emails, and text messages related to Medicare plan information, updates, and special offers.
      </p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">1. Methods of Contact</h2>
      <p>
        We may contact you via phone, SMS, or email. Consent to receive communications is not required
        as a condition of purchasing any goods or services from YourMedGuy. By submitting your
        information, you agree to receive communications from us, which may include automated dialing
        systems or pre-recorded messages, as permitted by law.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">2. Opting Out</h2>
      <p>
        You may opt out of communications at any time by contacting us at the information provided
        below, or by using the &quot;Unsubscribe&quot; link included in any marketing email or replying
        &quot;STOP&quot; to any SMS message.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">3. Compliance</h2>
      <p>
        YourMedGuy complies with all applicable laws, including the Telephone Consumer Protection Act
        (TCPA) and CMS regulations regarding Medicare communications. We ensure that all outreach is
        conducted according to legal and regulatory guidelines to protect your privacy and ensure
        responsible marketing practices.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Contact Us</h2>
      <LegalContact />
    </section>
  </LegalPageLayout>
);

export default ConsentToContact;
