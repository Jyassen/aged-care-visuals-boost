import { useState } from "react";
import { Link } from "react-router-dom";
import LaunchLayout from "./LaunchLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Standalone /launch funnel page for YourMedGuy A2P approval.
 * Replicates the Yassco Consulting Group LLC Nebula site (request-information
 * page) verbatim, except the display name/logo are changed to YourMedGuy.
 * Yassco Consulting Group LLC is retained as the legal business name:
 * YourMedGuy is a subsidiary of Yassco Consulting Group LLC.
 * Contact details (email, phone, address) are kept exactly as on the source
 * site, so the page matches the A2P registration record.
 * This page uses ONLY the standalone LaunchLayout — no main-site Header,
 * Footer, navigation, or tabs — and is not linked from the main site.
 */
const RequestInfo = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [nonMarketingConsent, setNonMarketingConsent] = useState(false);
  const [promotionalConsent, setPromotionalConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";
    if (!firstName || !lastName) {
      setError("Please enter your full name (first and last).");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          source: "YourMedGuy.com Launch Request Information Form",
          pageUrl: typeof window !== "undefined" ? window.location.href : "https://yourmedguy.com/launch",
          message: [
            `Mobile Phone Number (Optional): ${mobile || "Not provided"}`,
            `Non-marketing consent (information request follow-ups, plan information clarification, and general inquiry updates): ${nonMarketingConsent ? "Yes" : "No"}`,
            `Promotional consent (Medicare plan education topics, Medicare coverage comparison topics, and Medicare enrollment guidance topics): ${promotionalConsent ? "Yes" : "No"}`,
            "Message frequency varies, up to 4 messages per month. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.",
          ].join("\n"),
        }),
      });
      if (!response.ok) throw new Error("Failed to send form");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us at team@yasscoconsultinggroupllc.nebulabrandgroup.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LaunchLayout
      title="YourMedGuy — Queens Village, Queens County, NY"
      description="Reach out to YourMedGuy for more information about Medicare options and how our guidance can help you understand coverage details."
      canonicalPath="/launch"
    >
      <p className="text-muted-foreground">
        YourMedGuy is a subsidiary of Yassco Consulting Group LLC, the legal business name.
      </p>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Request Information</h2>
        <p className="text-lg leading-relaxed">
          Reach out to YourMedGuy for more information about Medicare options and how our guidance can help you
          understand coverage details.
        </p>

        {submitted ? (
          <div className="rounded-lg border bg-muted/40 p-6">
            <p className="font-semibold">Thank you for your request.</p>
            <p className="text-muted-foreground mt-2">
              We will follow up with the information you requested. You can reply STOP at any time to opt out of
              text messages, or reply HELP for assistance.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="launch-full-name">Full Name *</Label>
              <Input
                id="launch-full-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="launch-email">Email Address *</Label>
              <Input
                id="launch-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="launch-mobile">Mobile Phone Number (Optional)</Label>
              <Input
                id="launch-mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="launch-non-marketing-consent"
                checked={nonMarketingConsent}
                onCheckedChange={(v) => setNonMarketingConsent(v === true)}
                className="mt-1"
              />
              <Label htmlFor="launch-non-marketing-consent" className="font-normal leading-relaxed cursor-pointer">
                I consent to receive <strong>non-marketing messages about information request follow-ups, plan
                information clarification, and general inquiry updates</strong> from <strong>YourMedGuy</strong>.
                Message frequency varies, up to 4 messages per month. Message &amp; data rates may apply. Text HELP
                for assistance, reply STOP to opt out.
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="launch-promotional-consent"
                checked={promotionalConsent}
                onCheckedChange={(v) => setPromotionalConsent(v === true)}
                className="mt-1"
              />
              <Label htmlFor="launch-promotional-consent" className="font-normal leading-relaxed cursor-pointer">
                I consent to receive <strong>promotional notifications about Medicare plan education topics,
                Medicare coverage comparison topics, and Medicare enrollment guidance topics</strong> from{" "}
                <strong>YourMedGuy</strong> at the phone number provided. Message frequency varies, up to 4 messages
                per month. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.
              </Label>
            </div>

            <p className="text-sm text-muted-foreground">
              <Link to="/launch/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              {" · "}
              <Link to="/launch/terms" className="text-primary hover:underline">Terms of Service</Link>
              {" · "}
              <Link to="/launch/about" className="text-primary hover:underline">About</Link>
            </p>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request Information"}
            </Button>
          </form>
        )}

        <div className="rounded-lg border bg-muted/40 p-6 space-y-1">
          <p>
            Email:{" "}
            <a href="mailto:team@yasscoconsultinggroupllc.nebulabrandgroup.com" className="text-primary hover:underline">
              team@yasscoconsultinggroupllc.nebulabrandgroup.com
            </a>
          </p>
          <p>Phone: (917) 703-8352</p>
          <p>21501 102nd Ave Queens Village NY 11429</p>
        </div>

        <p className="text-sm text-muted-foreground">
          Email, team@yasscoconsultinggroupllc.nebulabrandgroup.com, Phone, (917) 703-8352, Address 21501 102nd Ave
          Queens Village NY 11429
        </p>
      </section>
    </LaunchLayout>
  );
};

export default RequestInfo;
