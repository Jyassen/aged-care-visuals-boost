import LaunchLayout from "./LaunchLayout";

/**
 * A2P About page for YourMedGuy.
 * Replicates the Yassco Consulting Group LLC Nebula About page verbatim,
 * except the display name is changed to YourMedGuy. Yassco Consulting Group
 * LLC is retained as the legal business name: YourMedGuy is a subsidiary
 * of Yassco Consulting Group LLC. Contact details are kept exactly as on
 * the source site.
 */
const About = () => (
  <LaunchLayout
    title="About"
    description="About YourMedGuy, a subsidiary of Yassco Consulting Group LLC, serving Queens Village, Queens County, NY."
    canonicalPath="/launch/about"
  >
    <header className="space-y-2 border-b pb-8">
      <h1 className="text-3xl md:text-4xl font-bold">About — YourMedGuy</h1>
      <p className="text-muted-foreground">
        YourMedGuy is a subsidiary of Yassco Consulting Group LLC, the legal business name.
      </p>
    </header>

    <section className="space-y-4">
      <p className="text-lg leading-relaxed">
        Explain Medicare parts and common plan options in plain language, including what each option typically covers
        and how to evaluate fit based on personal circumstances.
      </p>
      <p>
        Service area: <strong>Queens Village, Queens County, NY</strong>
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Our Story</h2>
      <p>
        YourMedGuy focuses on helping seniors navigate Medicare decisions with clarity and confidence. We are committed
        to making complex plan information easier to understand so individuals can evaluate options based on what
        matters most to them. Our work is driven by a practical, customer-first approach to Medicare education and
        guidance.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Our Mission</h2>
      <p>
        To help seniors understand Medicare options through clear, accurate information and supportive guidance. To
        make coverage decisions less confusing and more manageable for individuals and families.
      </p>
    </section>

    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <div className="rounded-lg border bg-muted/40 p-6 space-y-1">
        <p>
          Email:{" "}
          <a href="mailto:support@yourmedguy.com" className="text-primary hover:underline">
            support@yourmedguy.com
          </a>
        </p>
        <p>Phone: (917) 703-8352</p>
        <p>21501 102nd Ave Queens Village NY 11429</p>
      </div>
      <p>
        <strong>YourMedGuy, a subsidiary of Yassco Consulting Group LLC</strong>
      </p>
      <p>21501 102nd Ave Queens Village NY 11429</p>
      <p>support@yourmedguy.com • (917) 703-8352</p>
    </section>
  </LaunchLayout>
);

export default About;
