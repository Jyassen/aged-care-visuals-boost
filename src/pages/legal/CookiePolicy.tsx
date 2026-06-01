import LegalPageLayout from "@/components/legal/LegalPageLayout";
import LegalContact from "@/components/legal/LegalContact";

const CookiePolicy = () => (
  <LegalPageLayout
    title="Cookie Policy"
    description="Learn how YourMedGuy uses cookies and similar technologies."
    canonicalPath="/cookie-policy"
  >
    <header className="space-y-2 border-b pb-8">
      <h1 className="text-3xl md:text-4xl font-bold">Cookie Policy</h1>
      <p className="text-muted-foreground">Effective Date: September 13, 2024</p>
      <p className="text-lg leading-relaxed">
        At YourMedGuy.com, we use cookies and similar technologies to enhance your browsing experience.
        By continuing to use our website, you consent to the use of cookies in accordance with this
        policy.
      </p>
    </header>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help the site
        remember your preferences and activities.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">2. How We Use Cookies</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>To improve website functionality.</li>
        <li>To track website usage and analyze visitor behavior.</li>
        <li>To enable advertising and marketing campaigns.</li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">3. Types of Cookies We Use</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Essential Cookies:</strong> Necessary for the website to function properly.
        </li>
        <li>
          <strong>Analytics Cookies:</strong> Help us understand how visitors interact with the site.
        </li>
        <li>
          <strong>Marketing Cookies:</strong> Used to display relevant advertisements.
        </li>
      </ul>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">4. Managing Cookies</h2>
      <p>
        You can control cookie preferences through your browser settings. However, disabling cookies may
        affect the website&apos;s functionality.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Contact Us</h2>
      <p>For more information, contact us at:</p>
      <LegalContact />
    </section>
  </LegalPageLayout>
);

export default CookiePolicy;
