import { Link } from "react-router-dom";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import LegalContact from "@/components/legal/LegalContact";
import { ChevronRight } from "lucide-react";

const documents = [
  {
    title: "Privacy Policy",
    path: "/privacy-policy",
    description: "How we collect, use, and protect your personal information.",
    effectiveDate: "September 14, 2024",
  },
  {
    title: "Terms of Service",
    path: "/terms-of-service",
    description: "Terms and conditions for using our website and services.",
    effectiveDate: "September 13, 2024",
  },
  {
    title: "Accessibility Statement",
    path: "/accessibility",
    description: "Our commitment to ADA-compliant website accessibility.",
  },
  {
    title: "Cookie Policy",
    path: "/cookie-policy",
    description: "How we use cookies and similar technologies on our website.",
    effectiveDate: "September 13, 2024",
  },
  {
    title: "Consent to Contact",
    path: "/consent-to-contact",
    description: "How we communicate with you and your opt-out rights.",
  },
  {
    title: "HIPAA Compliance",
    path: "/hipaa-compliance",
    description: "How we safeguard your protected health information.",
  },
];

const LegalDocuments = () => (
  <LegalPageLayout
    title="Legal Documents"
    description="Privacy policy, terms of service, and other legal documents for YourMedGuy."
    canonicalPath="/legal"
    backTo="/"
    backLabel="Back to Home"
  >
    <header className="space-y-2 border-b pb-8">
      <h1 className="text-3xl md:text-4xl font-bold">Legal Documents</h1>
      <p className="text-lg leading-relaxed text-muted-foreground">
        YourMedGuy.com — A Subsidiary of Yassco Consulting Group LLC
      </p>
    </header>

    <div className="space-y-4">
      {documents.map((doc) => (
        <Link
          key={doc.path}
          to={doc.path}
          className="flex items-center justify-between gap-4 rounded-lg border p-5 hover:border-primary/40 hover:bg-muted/30 transition-colors group"
        >
          <div>
            <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {doc.title}
            </h2>
            <p className="text-muted-foreground mt-1">{doc.description}</p>
            {doc.effectiveDate && (
              <p className="text-sm text-muted-foreground mt-1">
                Effective: {doc.effectiveDate}
              </p>
            )}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0" />
        </Link>
      ))}
    </div>

    <section className="space-y-4 pt-4 border-t">
      <h2 className="text-2xl font-semibold">CMS Disclaimer</h2>
      <p>
        We do not offer every plan available in your area. Please contact Medicare.gov or
        1-800-MEDICARE to get information on all of your options.
      </p>
      <p>
        YourMedGuy is a subsidiary of Yassco Consulting Group LLC. Licensed broker Jamal Yassen, with a
        valid LAH license, offers Medicare services and represents multiple insurance carriers. No
        government affiliation is implied, and YourMedGuy is an independent agency.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <LegalContact />
    </section>
  </LegalPageLayout>
);

export default LegalDocuments;
