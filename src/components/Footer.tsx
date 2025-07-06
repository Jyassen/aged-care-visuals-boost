import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
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
                href="tel:347-305-2260" 
                className="flex items-center space-x-3 text-primary-foreground/90 hover:text-accent transition-colors text-lg"
              >
                <Phone className="h-5 w-5" />
                <span>347-305-2260</span>
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
                <span>Serving Medicare Recipients Nationwide</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-6">
            <h4 className="text-xl-accessible font-semibold">Business Hours</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-primary-foreground/90 text-lg">
                <Clock className="h-5 w-5" />
                <div>
                  <p>Mon - Fri: 9AM - 6PM</p>
                  <p>Saturday: 10AM - 4PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-lg">
              Emergency Medicare questions? Leave a message and we'll get back to you quickly.
            </p>
          </div>

          {/* Quick CTA */}
          <div className="space-y-6">
            <h4 className="text-xl-accessible font-semibold">Get Started Today</h4>
            <p className="text-primary-foreground/90 text-lg leading-relaxed">
              Don't wait until enrollment season. Get your questions answered and explore your options now.
            </p>
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-3 w-full shadow-strong"
            >
              Free Consultation
            </Button>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-primary-foreground/80 text-lg">
                © 2024 YourMedGuy - A subsidiary of Yassco Consulting Group LLC
              </p>
              <p className="text-primary-foreground/70 text-base">
                Licensed Medicare Insurance Agent
              </p>
            </div>
            <div className="flex space-x-6 text-primary-foreground/80 text-lg">
              <a href="#privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;