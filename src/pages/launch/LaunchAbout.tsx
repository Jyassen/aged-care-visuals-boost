import SEO from "@/components/SEO";
import { AddressBlock, LaunchFrame } from "@/components/launch/LaunchLayout";
import { ABOUT_BLURB, AREA, BRAND, LAUNCH_PAGES, WHY } from "@/launch/brand";

const page = LAUNCH_PAGES[1];

export default function LaunchAbout() {
  return (
    <LaunchFrame>
      <SEO title={page.title} description={page.description} canonical={`https://yourmedguy.com${page.path}`} />
      <div className="card" style={{ marginTop: 18 }}>
        <h2>About {BRAND}</h2>
        <div className="about-section">
          <p>{ABOUT_BLURB}</p>
          <p style={{ marginTop: 10 }}>
            Service area: <strong>{AREA}</strong>
          </p>
        </div>
        <div className="about-section" id="about-story">
          <h3>Our Story</h3>
          <p>
            {BRAND} focuses on helping seniors navigate Medicare decisions with clarity and confidence. We are committed to making complex plan information easier to understand so individuals can evaluate options based on what matters most to them. Our work is driven by a practical, customer-first approach to Medicare education and guidance.
          </p>
        </div>
        <div className="about-section" id="about-mission">
          <h3>Our Mission</h3>
          <p>
            To help seniors understand Medicare options through clear, accurate information and supportive guidance. To make coverage decisions less confusing and more manageable for individuals and families.
          </p>
        </div>
        <div className="about-section" id="about-why">
          <h3>Why Choose Us</h3>
          <ul className="why-list">
            {WHY.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <AddressBlock />
      </div>
    </LaunchFrame>
  );
}
