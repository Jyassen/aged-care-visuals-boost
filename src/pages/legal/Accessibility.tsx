import LegalPageLayout from "@/components/legal/LegalPageLayout";
import LegalContact from "@/components/legal/LegalContact";

const Accessibility = () => (
  <LegalPageLayout
    title="Accessibility Statement"
    description="YourMedGuy is committed to making our website accessible to all users."
    canonicalPath="/accessibility"
  >
    <header className="space-y-2 border-b pb-8">
      <h1 className="text-3xl md:text-4xl font-bold">Accessibility Statement</h1>
      <p className="text-lg leading-relaxed">
        YourMedGuy.com is committed to making our website accessible to individuals with disabilities,
        in compliance with the Americans with Disabilities Act (ADA).
      </p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">1. Accessibility Features</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Our website is designed with accessibility in mind, including screen reader compatibility and
          keyboard navigation support.
        </li>
        <li>We regularly test our website for usability and accessibility improvements.</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">2. Feedback</h2>
      <p>
        If you encounter any accessibility barriers or have suggestions on how we can improve the
        accessibility of our website, please contact us at:
      </p>
      <LegalContact />
      <p>We are continuously working to ensure a seamless experience for all users.</p>
    </section>
  </LegalPageLayout>
);

export default Accessibility;
