import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { LaunchFrame, LaunchMail, LaunchPhone } from "@/components/launch/LaunchLayout";
import { BRAND, LAUNCH_PAGES } from "@/launch/brand";

const page = LAUNCH_PAGES[6];

export default function LaunchSms() {
  return (
    <LaunchFrame>
      <SEO title={page.title} description={page.description} canonical={`https://yourmedguy.com${page.path}`} />
      <div className="card" style={{ marginTop: 18 }}>
        <h2>SMS Program</h2>
        <p className="muted">
          {BRAND} may send SMS messages to customers who provide their mobile number and consent.
          Message frequency may vary. Message & data rates may apply.
        </p>
        <div className="kv" style={{ marginTop: 12 }}>
          <div className="k">Opt out</div>
          <div className="v">Reply <strong>STOP</strong> at any time.</div>
          <div className="k">Help</div>
          <div className="v">Reply <strong>HELP</strong> for assistance.</div>
          <div className="k">Support</div>
          <div className="v"><LaunchMail /> • <LaunchPhone /></div>
        </div>
        <p className="muted" style={{ marginTop: 12 }}>
          For additional details, please review our <Link className="u" to="/launch/privacy">Privacy Policy</Link> and <Link className="u" to="/launch/terms">Terms of Service</Link>.
        </p>
      </div>
    </LaunchFrame>
  );
}
