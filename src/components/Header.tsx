import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-xl-accessible font-bold text-primary">YourMedGuy</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">Medicare Made Simple</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground hover:text-primary transition-colors text-lg">
              Why Choose Us
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors text-lg">
              How It Works
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors text-lg">
              Get Help
            </a>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Call Now</p>
              <a href="tel:347-305-2260" className="text-lg font-semibold text-primary hover:text-primary-hover flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                347-305-2260
              </a>
            </div>
            <Button size="lg" className="bg-gradient-primary hover:bg-primary-hover text-lg px-6 py-3">
              Free Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <nav className="flex flex-col space-y-4 mb-4">
              <a 
                href="#services" 
                className="text-foreground hover:text-primary transition-colors text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Choose Us
              </a>
              <a 
                href="#how-it-works" 
                className="text-foreground hover:text-primary transition-colors text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#contact" 
                className="text-foreground hover:text-primary transition-colors text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Help
              </a>
            </nav>
            <div className="space-y-3">
              <a href="tel:347-305-2260" className="flex items-center text-primary text-lg font-semibold">
                <Phone className="h-5 w-5 mr-2" />
                347-305-2260
              </a>
              <Button className="w-full bg-gradient-primary hover:bg-primary-hover text-lg py-3">
                Free Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;