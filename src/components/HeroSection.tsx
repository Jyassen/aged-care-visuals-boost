import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Award, Users, Phone } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Healthcare professionals helping seniors" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl-accessible md:text-5xl font-bold leading-tight">
                Find Medicare Solutions That Fit Your
                <span className="text-accent"> Budget & Lifestyle</span>
              </h1>
              <p className="text-xl-accessible text-white/90 leading-relaxed">
                Whether you're new to Medicare or searching for better coverage, speak with a local licensed Medicare specialist who can simplify the process and give you peace of mind.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 text-white/90">
                <Shield className="h-8 w-8 text-accent" />
                <div>
                  <p className="font-semibold text-lg">Licensed</p>
                  <p className="text-sm">Certified Agents</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <Award className="h-8 w-8 text-accent" />
                <div>
                  <p className="font-semibold text-lg">No Cost</p>
                  <p className="text-sm">Free Service</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <Users className="h-8 w-8 text-accent" />
                <div>
                  <p className="font-semibold text-lg">Local</p>
                  <p className="text-sm">Area Experts</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl px-8 py-4 shadow-strong"
              >
                Get Started Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-xl px-8 py-4"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 347-305-2260
              </Button>
            </div>
          </div>

          {/* Contact Form Card */}
          <Card id="contact" className="bg-white/95 backdrop-blur-sm p-8 shadow-strong">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl-accessible font-bold text-foreground">
                  Get Your Free Consultation
                </h3>
                <p className="text-muted-foreground text-lg">
                  Speak with a Medicare specialist today
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-lg font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      className="text-lg py-3 px-4"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-lg font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      className="text-lg py-3 px-4"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-lg font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="text-lg py-3 px-4"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="text-lg py-3 px-4"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bestTime" className="text-lg font-medium">Best Time to Call</Label>
                  <Select>
                    <SelectTrigger className="text-lg py-3 px-4">
                      <SelectValue placeholder="Select preferred time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                      <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-lg font-medium">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your Medicare needs..."
                    className="text-lg py-3 px-4 min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:bg-primary-hover text-xl py-4 shadow-medium"
                >
                  Meet Your MedGuy
                </Button>

                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  By submitting your information, you consent to receive communications from YourMedGuy. 
                  This includes calls, emails, and text messages about Medicare plans and special offers.
                </p>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;