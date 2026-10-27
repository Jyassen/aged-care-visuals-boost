import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  ABOUT_BLURB,
  ADDRESS,
  AREA,
  BRAND,
  BRAND_LEGAL,
  EMAIL,
  LEGAL_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/launch/brand";
import "@/launch/launch.css";

const LaunchUiContext = createContext<{ openThanks: () => void } | null>(null);

export function useLaunchUi() {
  const value = useContext(LaunchUiContext);
  if (!value) throw new Error("Launch UI is only available inside /launch");
  return value;
}

function Mark({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden="true">
      M
    </div>
  );
}

function ThanksModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="launch-thanks-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        <button className="modal-close" type="button" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <div className="modal-logo">M</div>
        <h3 id="launch-thanks-title">Thank You!</h3>
        <p>
          <strong>{BRAND}</strong> will reach out within 24 hours by phone or text if you opted in.
        </p>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 14 }}>
          If you opted in for SMS, you can opt out any time by replying <strong>STOP</strong>. For help, reply <strong>HELP</strong>.
        </p>
        <button className="btn" type="button" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}

export function LaunchMail() {
  return (
    <a className="u" href={`mailto:${EMAIL}`}>
      {EMAIL}
    </a>
  );
}

export function LaunchPhone() {
  return (
    <a className="u" href={PHONE_TEL}>
      {PHONE_DISPLAY}
    </a>
  );
}

function LaunchNav() {
  const links = [
    { to: "/launch", label: "Home", end: true },
    { to: "/launch/about", label: "About", end: false },
    { to: "/launch/services", label: "Services", end: false },
    { to: "/launch/contact", label: "Contact", end: false },
  ];

  return (
    <div className="nav">
      <Link to="/launch" className="brand" aria-label={`${BRAND} home`}>
        <Mark className="logo" />
        <div className="brandName">{BRAND}</div>
      </Link>
      <nav className="navlinks" aria-label="Launch">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export function AddressBlock() {
  return (
    <div className="address-block">
      <strong style={{ color: "var(--fg)" }}>{BRAND}</strong>
      <br />
      {ADDRESS}
      <br />
      <LaunchMail /> • <LaunchPhone />
    </div>
  );
}

function LaunchFooter() {
  return (
    <footer className="foot">
      <div className="footGrid">
        <div>
          <div className="footTitle">{BRAND}</div>
          <div className="footText">{ABOUT_BLURB}</div>
          <div className="footMeta">
            Serving {AREA}
            <br />
            {BRAND_LEGAL}
          </div>
        </div>
        <div>
          <div className="footTitle">Contact</div>
          <ul className="footList">
            <li>
              Email: <LaunchMail />
            </li>
            <li>
              Phone: <LaunchPhone />
            </li>
            <li>{ADDRESS}</li>
          </ul>
        </div>
        <div>
          <div className="footTitle">Quick Links</div>
          <ul className="footList">
            <li><Link className="u" to="/launch">Home</Link></li>
            <li><Link className="u" to="/launch/about">About</Link></li>
            <li><Link className="u" to="/launch/services">Services</Link></li>
            <li><Link className="u" to="/launch/contact">Contact</Link></li>
            <li><Link className="u" to="/launch/privacy">Privacy Policy</Link></li>
            <li><Link className="u" to="/launch/terms">Terms & Conditions</Link></li>
            <li><Link className="u" to="/launch/sms">SMS Program</Link></li>
          </ul>
        </div>
      </div>
      <div className="footBottom">
        <div>© {BRAND}</div>
        <div>Legal business name: {LEGAL_NAME}</div>
      </div>
      <p className="disclosure">
        {BRAND} is not connected with or endorsed by the United States government or the federal Medicare program.
        We do not offer every plan available in your area. For information on all of your options, contact{" "}
        <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer">Medicare.gov</a> or 1-800-MEDICARE.
      </p>
    </footer>
  );
}

export function LaunchFrame({ children }: { children: ReactNode }) {
  return (
    <div className="wrap">
      <LaunchNav />
      {children}
      <LaunchFooter />
    </div>
  );
}

export function LegalFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="launch-legal">
      <div className="brandHeader">
        <Link to="/launch" className="brand" aria-label={`${BRAND} home`}>
          <Mark className="brandLogo" />
          <span>
            <div className="brandName">{BRAND}</div>
            <div className="brandLegal">A subsidiary of {LEGAL_NAME}</div>
          </span>
        </Link>
      </div>
      <h1>{title}</h1>
      {children}
      <div className="legal-foot">
        <div>
          <Link to="/launch/sms">SMS Program</Link>
          {" • "}
          <Link to="/launch/privacy">Privacy Policy</Link>
          {" • "}
          <Link to="/launch/terms">Terms of Service</Link>
        </div>
        <div>© {BRAND_LEGAL}</div>
      </div>
    </article>
  );
}

export default function LaunchLayout() {
  const [open, setOpen] = useState(false);

  return (
    <LaunchUiContext.Provider value={{ openThanks: () => setOpen(true) }}>
      <div className="launch-site">
        <Outlet />
        {open ? <ThanksModal onClose={() => setOpen(false)} /> : null}
      </div>
    </LaunchUiContext.Provider>
  );
}
