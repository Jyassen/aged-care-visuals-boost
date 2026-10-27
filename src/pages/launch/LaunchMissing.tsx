import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { LaunchFrame } from "@/components/launch/LaunchLayout";

export default function LaunchMissing() {
  return (
    <LaunchFrame>
      <SEO
        title="Page not found — YourMedGuy"
        description="That page is not part of the YourMedGuy information request site."
        canonical="https://yourmedguy.com/launch"
      />
      <div className="card" style={{ marginTop: 18 }}>
        <h2>That page is not on this site</h2>
        <p className="muted">Use the menu above, or go back to the YourMedGuy information page.</p>
        <p style={{ marginTop: 10 }}>
          <Link className="u" to="/launch">Back to home</Link>
        </p>
      </div>
    </LaunchFrame>
  );
}
