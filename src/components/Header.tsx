import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CaptureForm from "@/components/CaptureForm";

type HeaderProps = {
  /** When true, hides the primary "Book Consultation" CTA (desktop and mobile menu) */
  hideBookButton?: boolean;
};

const Header = ({ hideBookButton = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/longisland' || location.pathname === '/statenisland';

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Optimized for mobile-first */}
          <a href="/" className="flex items-center space-x-2 min-w-0 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow">
              <span className="text-white font-bold text-sm sm:text-lg">M</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate group-hover:text-blue-700">YourMedGuy</h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Medicare Made Simple</p>
            </div>
          </a>

          {/* Desktop Navigation - Hidden on mobile for performance */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href={isHomePage ? "#services" : "/#services"}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-base"
            >
              Why Choose Us
            </a>
            <a 
              href={isHomePage ? "#how-it-works" : "/#how-it-works"}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-base"
            >
              How It Works
            </a>
            <a 
              href={isHomePage ? "#contact" : "/#contact"}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-base"
            >
              Get Help
            </a>
          </nav>

          {/* Contact Info & CTA - Progressive disclosure */}
          <div className="hidden xl:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Call Now</p>
              <a 
                href="tel:888-355-1085" 
                className="text-lg font-semibold text-blue-600 hover:text-blue-700 flex items-center transition-colors duration-200"
              >
                <Phone className="h-4 w-4 mr-1" />
                888-355-1085
              </a>
            </div>
            {!hideBookButton && (
              <CaptureForm 
                trigger={
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Book Consultation
                  </Button>
                }
              />
            )}
          </div>

          {/* Mobile CTA + Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <CaptureForm 
              trigger={
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-3 py-2 text-sm hidden sm:block"
                >
                  Get Help
                </Button>
              }
            />
            <button
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 touch-manipulation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Optimized with proper animations */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 border-t border-gray-200' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <a 
                href={isHomePage ? "#services" : "/#services"}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-base py-2 px-2 rounded-md hover:bg-gray-50 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Choose Us
              </a>
              <a 
                href={isHomePage ? "#how-it-works" : "/#how-it-works"}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-base py-2 px-2 rounded-md hover:bg-gray-50 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href={isHomePage ? "#contact" : "/#contact"}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-base py-2 px-2 rounded-md hover:bg-gray-50 touch-manipulation"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Help
              </a>
            </nav>
            
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <a 
                href="tel:888-355-1085" 
                className="flex items-center text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors duration-200 touch-manipulation py-2"
              >
                <Phone className="h-5 w-5 mr-2" />
                888-355-1085
              </a>
              {!hideBookButton && (
                <CaptureForm 
                  trigger={
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 text-base shadow-md hover:shadow-lg transition-all duration-200">
                      Book Consultation
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