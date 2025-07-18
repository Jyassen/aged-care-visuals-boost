import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Award, Users, Phone } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import CaptureForm from "@/components/CaptureForm";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Optimized Loading */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Healthcare professionals helping seniors" 
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/90"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Hero Content - Mobile-first optimization */}
          <div className="text-white space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                Find the Right Medicare Plan for You
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-2xl">
                Get personalized help navigating Medicare options with a licensed agent. Compare plans, understand your benefits, and enroll with confidence.
              </p>
            </div>

            {/* Trust Indicators - Improved mobile layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="flex items-center space-x-3 text-blue-100 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-blue-300 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-base sm:text-lg text-white">Licensed</p>
                  <p className="text-sm text-blue-200">Certified Agents</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-blue-100 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <Award className="h-8 w-8 sm:h-10 sm:w-10 text-blue-300 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-base sm:text-lg text-white">No Cost</p>
                  <p className="text-sm text-blue-200">Free Service</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-blue-100 bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <Users className="h-8 w-8 sm:h-10 sm:w-10 text-blue-300 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-base sm:text-lg text-white">Local</p>
                  <p className="text-sm text-blue-200">Area Experts</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons - Responsive spacing */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-4">
              <CaptureForm 
                trigger={
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-5 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Get Your Free Consultation
                  </Button>
                }
              />
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-5 backdrop-blur-sm transition-all duration-300"
                asChild
              >
                <a href="tel:347-305-2260" className="flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Call 347-305-2260
                </a>
              </Button>
            </div>

            {/* Disclaimer Banner - Better mobile styling */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 text-sm sm:text-base leading-relaxed shadow-sm">
              <p>
                <strong className="font-semibold">Important:</strong> We do not offer every plan available in your area. Currently we represent organizations which offer products in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Program to get information on all your options.
              </p>
            </div>
          </div>

          {/* Contact Form Card - Improved mobile experience */}
          <Card id="contact" className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 shadow-2xl border-0 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Get Your Free Consultation
                </h3>
                <p className="text-gray-600 text-base sm:text-lg">
                  Speak with a Medicare specialist today
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-base font-medium text-gray-700">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-base font-medium text-gray-700">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-medium text-gray-700">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium text-gray-700">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bestTime" className="text-base font-medium text-gray-700">Best Time to Call</Label>
                  <Select>
                    <SelectTrigger className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
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
                  <Label htmlFor="message" className="text-base font-medium text-gray-700">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your Medicare needs..."
                    className="text-base py-3 px-4 min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Meet Your MedGuy
                </Button>

                <p className="text-sm text-gray-500 text-center leading-relaxed">
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