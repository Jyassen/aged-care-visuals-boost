import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import LaunchForm from "@/components/launch/LaunchForm";
import { LaunchFrame, LaunchMail, LaunchPhone } from "@/components/launch/LaunchLayout";
import {
  ABOUT_BLURB,
  ADDRESS,
  AREA,
  BRAND,
  LEGAL_NAME,
  HEADLINE,
  HERO_IMAGE,
  LAUNCH_PAGES,
  SERVICES,
  UPDATED,
} from "@/launch/brand";

const page = LAUNCH_PAGES[0];

export default function LaunchHome() {
  return (
    <LaunchFrame>
      <SEO
        title={page.title}
        description={page.description}
        canonical={`https://yourmedguy.com${page.path}`}
        ogImage="https://yourmedguy.com/launch/hero.jpg"
        ogImageAlt="YourMedGuy Medicare guidance"
      />
      <div className="hero" style={{ backgroundImage: `url('${HERO_IMAGE}')` }}>
        <div className="heroInner">
          <div className="heroLogo">M</div>
          <h1 className="h1">{HEADLINE}</h1>
          <div className="sub">
            {BRAND} • Serving {AREA} • Updated {UPDATED}
          </div>
          <div className="ctaRow">
            <a className="btn" href="#optin">Sign Up For Info</a>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h2>About</h2>
          <p className="muted">{ABOUT_BLURB}</p>
          <p className="muted" style={{ marginTop: 10 }}>{BRAND} is a subsidiary of {LEGAL_NAME}, the legal business name.</p>
          <p style={{ marginTop: 10 }}>
            <Link className="u" to="/launch/about">Learn more →</Link>
          </p>
          <div style={{ marginTop: 16 }}>
            <h2>Services</h2>
            <div className="svcGrid">
              {SERVICES.map((service) => (
                <div className="svc" key={service.title}>
                  <div className="svcTitle">{service.title}</div>
                  <div className="svcDesc">{service.body}</div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 10 }}>
              <Link className="u" to="/launch/services">View all services →</Link>
            </p>
          </div>
        </div>

        <div className="card">
          <h2>Contact</h2>
          <div className="kv">
            <div className="k">Email</div>
            <div className="v"><LaunchMail /></div>
            <div className="k">Phone</div>
            <div className="v"><LaunchPhone /></div>
            <div className="k">Address</div>
            <div className="v">{ADDRESS}</div>
          </div>
        </div>
      </div>

      <div className="card" id="optin" style={{ marginTop: 18 }}>
        <h2>Request Information</h2>
        <p className="muted">
          Reach out to {BRAND} for more information about Medicare options and how our guidance can help you understand coverage details.
        </p>
        <LaunchForm idPrefix="launch-home" />
      </div>
    </LaunchFrame>
  );
}
