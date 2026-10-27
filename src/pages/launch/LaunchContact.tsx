import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import LaunchForm from "@/components/launch/LaunchForm";
import { LaunchFrame, LaunchMail, LaunchPhone } from "@/components/launch/LaunchLayout";
import { ADDRESS, BRAND, LAUNCH_PAGES, SERVICES } from "@/launch/brand";

const page = LAUNCH_PAGES[3];

export default function LaunchContact() {
  return (
    <LaunchFrame>
      <SEO title={page.title} description={page.description} canonical={`https://yourmedguy.com${page.path}`} />
      <div className="contact-grid">
        <div className="card">
          <h2>Request Information</h2>
          <p className="muted">
            Reach out to {BRAND} for more information about Medicare options and how our guidance can help you understand coverage details.
          </p>
          <LaunchForm idPrefix="launch-contact" includeMessage />
        </div>
        <div className="card">
          <h2>Contact info</h2>
          <div className="kv">
            <div className="k">Email</div>
            <div className="v"><LaunchMail /></div>
            <div className="k">Phone</div>
            <div className="v"><LaunchPhone /></div>
            <div className="k">Address</div>
            <div className="v">{ADDRESS}</div>
          </div>
          <div className="split">
            <h3>What to Expect</h3>
            <ul className="expect">
              <li>Response within 24 hours</li>
              <li>Free consultation</li>
              <li>No obligation to proceed</li>
            </ul>
          </div>
          <div className="split">
            <h3>Our Services</h3>
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
      </div>
    </LaunchFrame>
  );
}
