import { Button } from "@/components/ui/button";
import { Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CaptureForm from "@/components/CaptureForm";
import Logo from "@/components/Logo";

type HeaderProps = {
  /** When true, hides the primary "Book my free review" CTA (desktop and mobile menu) */
  hideBookButton?: boolean;
};

const Header = ({ hideBookButton = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/longisland' || location.pathname === '/statenisland';

  const navLinks = [
    { href: isHomePage ? "#services" : "/#services", label: "What we check" },
    { href: isHomePage ? "#how-it-works" : "/#how-it-works", label: "How it works" },
    { href: "/tools/cost-calculator", label: "Cost calculator" },
    { href: "/medicarestarterkit", label: "Free guides" },
    { href: isHomePage ? "#reviews" : "/#reviews", label: "Reviews" },
  ];

  const linkClass = "text-mute hover:text-ink transition-colors duration-200 font-medium text-[15px] whitespace-nowrap";

  return (
    <header className="bg-white border-b border-rule sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className={linkClass}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {!hideBookButton && (
              <CaptureForm
                trigger={
                  <Button variant="dark" size="default">
                    Book my free review
                  </Button>
                }
              />
            )}
          </div>

          {/* Mobile CTA + Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {!hideBookButton && (
              <CaptureForm
                trigger={
                  <Button variant="dark" size="sm" className="hidden sm:inline-flex">
                    Book a review
                  </Button>
                }
              />
            )}
            <button
              className="p-2 rounded-full hover:bg-ground active:bg-rule transition-colors duration-200 touch-manipulation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-ink" />
              ) : (
                <Menu className="h-6 w-6 text-ink" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[28rem] opacity-100 border-t border-rule' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4">
            <nav className="flex flex-col">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-ink font-medium text-base py-3 px-2 rounded-lg hover:bg-ground touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-rule space-y-3">
              <a
                href="mailto:support@yourmedguy.com"
                className="flex items-center text-brandblue font-semibold text-base hover:text-brandblue-dark touch-manipulation py-2 px-2"
              >
                <Mail className="h-5 w-5 mr-2" />
                support@yourmedguy.com
              </a>
              {!hideBookButton && (
                <CaptureForm
                  trigger={
                    <Button variant="amber" size="lg" className="w-full">
                      Book my free review
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
