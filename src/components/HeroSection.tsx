import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Award, Users, Phone } from "lucide-react";
import CaptureForm from "@/components/CaptureForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SiteRegion } from "@/types/site.types";

type HeroSectionProps = {
  region: SiteRegion;
};

const HeroSection = ({ region }: HeroSectionProps) => {
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
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, pageUrl }),
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

  const regionLabelMap: Record<SiteRegion, string> = {
    longisland: 'Long Island',
    statenisland: 'Staten Island',
    nyc: 'New York City',
  };

  const serviceAreaMap: Record<SiteRegion, string> = {
    longisland: 'Serving Nassau and Suffolk County.',
    statenisland: 'Serving Staten Island.',
    nyc: 'Serving all five boroughs.',
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Image with Headline Overlay */}
        <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px]">
          <img 
            src="/images/hero seniors .jpg" 
            alt="Diverse group of happy seniors enjoying life in the park"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          {/* Black gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Headline overlaid on image */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
              <div className="max-w-4xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white mb-4">
                  Medicare Made Simple
                </h1>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-amber-300 leading-snug">
                  {`Review Your 2026 Options in ${regionLabelMap[region]}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section Below Image */}
        <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* Left Column - Copy and Credibility Badges */}
            <div className="space-y-6 lg:space-y-8">
              {/* Description Copy */}
              <div className="space-y-4">
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  {`Keep your doctors and cut surprises. Book a quick 15 minute Medicare review with a licensed agent. We'll check doctors, medicines, and costs with no pressure. ${serviceAreaMap[region]}`}
                </p>
              </div>

              {/* Trust Indicators/Credibility Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-white border-2 border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-base text-gray-900">Licensed</p>
                        <p className="text-xs text-gray-600">Certified Agents</p>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="bg-white border-2 border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-base text-gray-900">No Obligation</p>
                        <p className="text-xs text-gray-600">No Pressure</p>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="bg-white border-2 border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-base text-gray-900">Local</p>
                        <p className="text-xs text-gray-600">Area Experts</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <CaptureForm 
                  trigger={
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg px-8 py-5 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Book Your Consultation
                    </Button>
                  }
                />
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-lg px-8 py-5 transition-all duration-300"
                  asChild
                >
                  <a href="tel:888-355-1085" className="flex items-center justify-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Call 888-355-1085
                  </a>
                </Button>
              </div>

              {/* Disclaimer Banner */}
              <Card className="bg-yellow-50 border-2 border-yellow-200 shadow-sm">
                <div className="p-4 text-yellow-800 text-sm leading-relaxed">
                  <p>
                    <strong className="font-semibold">Important:</strong> We do not offer every plan available in your area. Any information we provide is limited to the plans we do offer. Please contact Medicare.gov or 1-800-MEDICARE (1-800-633-4227), TTY: 1-877-486-2048, 24 hours a day/7 days a week, to get information on all your options.
                  </p>
                </div>
              </Card>
            </div>

            {/* Right Column - Contact Form Card */}
            <Card id="contact" className="bg-white border-2 border-blue-100 p-6 sm:p-8 shadow-xl sticky top-4">
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
      </div>
    </section>
  );
};

export default HeroSection;