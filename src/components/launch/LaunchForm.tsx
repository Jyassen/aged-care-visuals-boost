import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { BRAND } from "@/launch/brand";
import { useLaunchUi } from "@/components/launch/LaunchLayout";

type LaunchFormProps = {
  idPrefix: string;
  includeMessage?: boolean;
};

export default function LaunchForm({ idPrefix, includeMessage = false }: LaunchFormProps) {
  const { openThanks } = useLaunchUi();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [infoSms, setInfoSms] = useState(false);
  const [promoSms, setPromoSms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const field = (name: string) => `${idPrefix}-${name}`;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const trimmed = fullName.trim().replace(/\s+/g, " ");
    const [firstName, ...rest] = trimmed.split(" ");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(" ") || "—",
          phone: phone.trim() || "Not provided",
          email: email.trim(),
          source: "launch-request",
          pageUrl: window.location.href,
          message: [
            note.trim() ? `Message: ${note.trim()}` : "",
            `Non-marketing SMS consent: ${infoSms ? "yes" : "no"}`,
            `Promotional SMS consent: ${promoSms ? "yes" : "no"}`,
            "Funnel: /launch",
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      if (!response.ok) {
        setError(`Something went wrong. Please call ${BRAND} and we will take your request.`);
        return;
      }

      setFullName("");
      setEmail("");
      setPhone("");
      setNote("");
      setInfoSms(false);
      setPromoSms(false);
      openThanks();
    } catch {
      setError(`Something went wrong. Please call ${BRAND} and we will take your request.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} autoComplete="on">
      <label htmlFor={field("name")}>Full Name *</label>
      <input
        id={field("name")}
        name="full_name"
        type="text"
        required
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
      />

      <label htmlFor={field("email")}>Email Address *</label>
      <input
        id={field("email")}
        name="email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label htmlFor={field("phone")}>Mobile Phone Number (Optional)</label>
      <input
        id={field("phone")}
        name="phone"
        type="tel"
        inputMode="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />

      {includeMessage ? (
        <>
          <label htmlFor={field("message")}>Message</label>
          <textarea
            id={field("message")}
            name="message"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </>
      ) : null}

      <label className="check" htmlFor={field("info")}>
        <input
          id={field("info")}
          name="sms_informational"
          type="checkbox"
          checked={infoSms}
          onChange={(event) => setInfoSms(event.target.checked)}
        />
        <span>
          I consent to receive <strong>non-marketing messages about information request follow-ups, plan information clarification, and general inquiry updates</strong> from <strong>{BRAND}</strong>. Message frequency varies, up to 4 messages per month. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.
        </span>
      </label>

      <label className="check" htmlFor={field("promo")}>
        <input
          id={field("promo")}
          name="sms_marketing"
          type="checkbox"
          checked={promoSms}
          onChange={(event) => setPromoSms(event.target.checked)}
        />
        <span>
          I consent to receive <strong>promotional notifications about Medicare plan education topics, Medicare coverage comparison topics, and Medicare enrollment guidance topics</strong> from <strong>{BRAND}</strong> at the phone number provided. Message frequency varies, up to 4 messages per month. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.
        </span>
      </label>

      <div className="legal-links">
        <Link to="/launch/privacy">Privacy Policy</Link>
        {" · "}
        <Link to="/launch/terms">Terms of Service</Link>
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="ctaRow">
        <button className="btn accent" type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
