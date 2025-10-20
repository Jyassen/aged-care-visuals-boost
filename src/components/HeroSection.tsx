import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Award, Users, Phone } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import CaptureForm from "@/components/CaptureForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    bestTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      bestTime: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          bestTime: '',
          message: ''
        });

        // Redirect to thank-you page for conversion tracking
        navigate(`/thank-you?src=homepage-inline`);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="text-white space-y-6 lg:space-y-8 order-1 lg:order-1">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-white">
                Medicare Made Simple
              </h1>
              <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-amber-300 leading-snug">
                Review Your 2026 Options in Long Island
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed max-w-2xl">
                Keep your doctors and cut surprises. Book a quick 15 minute Medicare review with a licensed agent. We’ll check doctors, medicines, and costs with no pressure. Serving Nassau and Suffolk County.
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
                  <p className="font-semibold text-base sm:text-lg text-white">No Obligation</p>
                  <p className="text-sm text-blue-200">No Pressure</p>
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
                    Book Your Consultation
                  </Button>
                }
              />
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-5 backdrop-blur-sm transition-all duration-300"
                asChild
              >
                <a href="tel:888-355-1085" className="flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Call 888-355-1085
                </a>
              </Button>
            </div>

            {/* Disclaimer Banner - Better mobile styling */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 text-sm sm:text-base leading-relaxed shadow-sm">
              <p>
                <strong className="font-semibold">Important:</strong> We do not offer every plan available in your area. Any information we provide is limited to the plans we do offer. Please contact Medicare.gov or 1-800-MEDICARE (1-800-633-4227), TTY: 1-877-486-2048, 24 hours a day/7 days a week, to get information on all your options.
              </p>
            </div>
          </div>

          {/* Contact Form Card - Improved mobile experience */}
          <Card id="contact" className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 shadow-2xl border-0 order-2 lg:order-2">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Get Your Consultation
                </h3>
                <p className="text-gray-600 text-base sm:text-lg">
                  Speak with a Medicare specialist today
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-base font-medium text-gray-700">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-base font-medium text-gray-700">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-medium text-gray-700">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium text-gray-700">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bestTime" className="text-base font-medium text-gray-700">Best Time to Call</Label>
                  <Select value={formData.bestTime} onValueChange={handleSelectChange}>
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
                    name="message"
                    placeholder="Tell us about your Medicare needs..."
                    className="text-base py-3 px-4 min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Thank you! We'll call you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Something went wrong. Please try again or call us directly.</p>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Sending...' : 'Meet Your MedGuy'}
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