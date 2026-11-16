import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CaptureForm from "@/components/CaptureForm";
import Logo from "@/components/Logo";
import type { SiteRegion } from "@/types/site.types";

type FooterProps = {
  region?: SiteRegion;
};

const Footer = ({ region = 'nyc' }: FooterProps) => {
  const serviceAreaMap: Record<SiteRegion, string> = {
    longisland: 'Serving Long Island: Nassau and Suffolk County',
    statenisland: 'Serving Staten Island',
    nyc: 'Serving New York City: all five boroughs',
  };

  const colClass = "space-y-2 text-[14px]";
  const linkClass = "block text-mute hover:text-ink transition-colors";
  const headClass = "text-[13px] font-bold text-ink mb-3";

  return (
    <footer className="bg-white border-t border-rule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-8 lg:gap-10 mb-10">
          <div className="space-y-4">
            <Logo />
            <p className="text-[14px] text-mute leading-relaxed max-w-[36ch]">
              Licensed, independent New York Medicare brokers. A subsidiary of Yassco Consulting Group LLC.
            </p>
            <p className="text-[14px] text-mute">{serviceAreaMap[region]}</p>
            <a href="mailto:support@yourmedguy.com" className="inline-block text-[14px] font-semibold text-brandblue hover:text-brandblue-dark">
              support@yourmedguy.com
            </a>
          </div>

          <div className={colClass}>
            <h4 className={headClass}>Help</h4>
            <a href="#contact" className={linkClass}>Book a free review</a>
            <Link to="/tools/cost-calculator" className={linkClass}>Medicare cost calculator</Link>
            <Link to="/medicarestarterkit" className={linkClass}>Free NY Medicare starter kit</Link>
            <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer" className={linkClass}>Medicare.gov</a>
            <a href="https://www.medicare.gov/plan-compare" target="_blank" rel="noopener noreferrer" className={linkClass}>Plan Finder</a>
            <a href="https://www.shiptacenter.org" target="_blank" rel="noopener noreferrer" className={linkClass}>State Health Insurance Program</a>
          </div>

          <div className={colClass}>
            <h4 className={headClass}>Areas</h4>
            <Link to="/" className={linkClass}>New York City</Link>
            <Link to="/longisland" className={linkClass}>Long Island</Link>
            <Link to="/statenisland" className={linkClass}>Staten Island</Link>
            <h4 className={`${headClass} pt-4`}>Legal</h4>
            <Link to="/privacy-policy" className={linkClass}>Privacy policy</Link>
            <Link to="/terms-of-service" className={linkClass}>Terms of service</Link>
            <Link to="/legal" className={linkClass}>Legal documents</Link>
            <Link to="/accessibility" className={linkClass}>Accessibility</Link>
          </div>

          <div className="space-y-4">
            <h4 className={headClass}>Get started</h4>
            <p className="text-[14px] text-mute leading-relaxed">
              Get your questions answered and your plan checked before the deadline.
            </p>
            <CaptureForm
              trigger={
                <Button variant="amber" size="lg" className="w-full">
                  Book my free review
                </Button>
              }
            />
          </div>
        </div>

        <div className="border-t border-rule pt-6 text-xs text-mute leading-relaxed space-y-2">
          <p>© {new Date().getFullYear()} YourMedGuy. All rights reserved. Licensed Medicare agents. A subsidiary of Yassco Consulting Group LLC.</p>
          <p>We do not offer every plan available in your area. Any information we provide is limited to the plans we do offer. Please contact Medicare.gov or 1-800-MEDICARE (1-800-633-4227), TTY 1-877-486-2048, 24 hours a day, 7 days a week, to get information on all your options. This website is not connected with or endorsed by the United States Government or the federal Medicare program.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
