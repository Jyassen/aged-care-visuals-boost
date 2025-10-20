import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Shield, ExternalLink } from "lucide-react";
import CaptureForm from "@/components/CaptureForm";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">M</span>
              </div>
              <div>
                <h3 className="text-xl-accessible font-bold">YourMedGuy</h3>
                <p className="text-primary-foreground/80">Medicare Made Simple</p>
              </div>
            </div>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              We're a subsidiary of Yassco Consulting Group LLC, dedicated to helping you navigate Medicare with confidence and ease.
            </p>
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <Shield className="h-5 w-5 text-accent" />
              <span className="text-lg">Licensed & Trusted</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl-accessible font-semibold">Contact Us</h4>
            <div className="space-y-4">
              <a 
                href="tel:888-355-1085" 
                className="flex items-center space-x-3 text-primary-foreground/90 hover:text-accent transition-colors text-lg"
              >
                <Phone className="h-5 w-5" />
                <span>888-355-1085</span>
              </a>
              <a 
                href="mailto:help@yourmedguy.com" 
                className="flex items-center space-x-3 text-primary-foreground/90 hover:text-accent transition-colors text-lg"
              >
                <Mail className="h-5 w-5" />
                <span>help@yourmedguy.com</span>
              </a>
              <div className="flex items-start space-x-3 text-primary-foreground/90 text-lg">
                <MapPin className="h-5 w-5 mt-1" />
                <span>Serving Long Island: Nassau and Suffolk County</span>
              </div>
            </div>
          </div>

          {/* Medicare Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-accent">Medicare Resources</h4>
            <div className="space-y-2">
              <a 
                href="https://www.medicare.gov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Medicare.gov
              </a>
              <a 
                href="https://www.medicare.gov/plan-compare" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Plan Finder Tool
              </a>
              <a 
                href="https://www.shiptacenter.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                State Health Insurance Program
              </a>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="space-y-6">
            <h4 className="text-xl-accessible font-semibold">Get Started Today</h4>
            <p className="text-primary-foreground/90 text-lg leading-relaxed">
              Don't wait until enrollment season. Get your questions answered and explore your options now.
            </p>
            <CaptureForm 
              trigger={
                <Button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-3 w-full shadow-strong"
                >
                  Book Consultation
                </Button>
              }
            />
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-primary-foreground/80">
                © 2025 YourMedGuy. All rights reserved. | Licensed Medicare Agent | A subsidiary of Yassco Consulting Group LLC
              </p>
              <p className="text-primary-foreground/70 text-sm mt-2">
                This website is for informational purposes only and is not connected with or endorsed by the United States Government or the federal Medicare program.
              </p>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-primary-foreground/80 text-sm">
              <a href="#privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-accent transition-colors">Terms of Service</a>
              <a href="#compliance" className="hover:text-accent transition-colors">Compliance Information</a>
              <a href="#accessibility" className="hover:text-accent transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;