import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Search, 
  MapPin, 
  PillBottle, 
  Gift, 
  UserCheck,
  CheckCircle,
  Phone,
  Check
} from "lucide-react";
import CaptureForm from "@/components/CaptureForm";
import type { SiteRegion } from "@/types/site.types";
import { useState } from "react";

const tabServices = [
  {
    value: "understand",
    icon: Search,
    title: "Understand Your Plan",
    description: "Get clarity on your existing coverage and costs. Learn the differences between Medicare Advantage, Supplement plans, and other options.",
    color: "from-blue-500 to-blue-600"
  },
  {
    value: "compare",
    icon: FileText,
    title: "Compare Plans",
    description: "Find and compare Medicare plans available in your area. We'll help you pick the one that suits your needs and budget.",
    color: "from-green-500 to-green-600"
  },
  {
    value: "discover",
    icon: Gift,
    title: "Discover Your Extra Benefits",
    description: "Uncover additional benefits like dental, vision, hearing, wellness programs, prescription savings, and grocery allowances.",
    color: "from-purple-500 to-purple-600"
  }
];

type ServicesSectionProps = {
  region: SiteRegion;
};

const ServicesSection = ({ region }: ServicesSectionProps) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const regionSupportMap: Record<SiteRegion, string> = {
    longisland: 'Local support for Nassau and Suffolk County.',
    statenisland: 'Local support for Staten Island.',
    nyc: 'Local support across all five boroughs.',
  };

  const defaultCopy = `Get clarity on your coverage options and find the Medicare plan that fits your unique needs and budget. ${regionSupportMap[region]}`;
  
  const displayedCopy = selectedService 
    ? tabServices.find(s => s.value === selectedService)?.description || defaultCopy
    : defaultCopy;

  return (
    <section id="services" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline Above Image */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900">
            You're Not Alone, Let's Make Sense of It All
          </h2>
        </div>

        {/* Image with Copy and Service Buttons Overlay */}
        <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] mb-12 sm:mb-16 lg:mb-20">
          <img 
            src="/images/elderly-couple.jpg" 
            alt="Senior couple reviewing Medicare documents together, finding clarity and peace of mind"
            className="w-full h-full object-cover rounded-2xl"
          />
          {/* Black gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-2xl"></div>
          
          {/* Copy and Service Buttons overlaid on image */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 sm:px-8 lg:px-12 pb-8 sm:pb-12 lg:pb-16">
              <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
                {/* Dynamic Copy */}
                <p className="text-lg sm:text-xl lg:text-2xl text-white leading-relaxed min-h-[80px] sm:min-h-[100px] flex items-center justify-center">
                  {displayedCopy}
                </p>
                
                {/* Service Selection Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {tabServices.map((service) => (
                    <Button
                      key={service.value}
                      size="lg"
                      onClick={() => setSelectedService(service.value)}
                      className={`${
                        selectedService === service.value
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl'
                          : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                      } font-semibold text-base sm:text-lg px-6 py-5 transition-all duration-300 border-2 border-white/40`}
                    >
                      <service.icon className="h-5 w-5 mr-2" />
                      {service.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* No Cost Banner - Enhanced mobile design with Agent Image */}
        <Card className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 border-0 shadow-2xl overflow-hidden">
          <CardContent className="relative p-0">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            
            <div className="px-8 sm:px-12 lg:px-16 pt-8 sm:pt-10 lg:pt-12 pb-0 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-center lg:text-left">
                Our Licensed Agents Can Help You Every Step of the Way
              </h2>

              <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 lg:gap-10 items-end pb-0">
                {/* Left Column - Checklist & CTA */}
                <div className="relative z-10 flex flex-col space-y-6 pb-8 sm:pb-10 lg:pb-12">
                  <div className="space-y-4">
                    {[
                      'Review your coverage and make sure it still fits your needs.',
                      'Check if your doctors accept your current or new plan.',
                      'Confirm drug coverage and copays before you make a switch.',
                      'Find a plan that fits your budget and lifestyle.'
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4"
                      >
                        <span className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg">
                          <Check className="h-5 w-5" strokeWidth={3} />
                        </span>
                        <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center lg:justify-start">
                    <CaptureForm 
                      trigger={
                        <Button 
                          size="lg" 
                          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          Get Started Today
                        </Button>
                      }
                    />
                  </div>
                </div>

                {/* Right Column - Agent Image */}
                <div className="relative z-10 hidden lg:flex items-end justify-end h-full">
                  <img 
                    src="/images/portrait-smiling-businesswoman-with-headset.png" 
                    alt="Friendly Medicare advisor ready to help"
                    className="w-full max-w-[1650px] h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServicesSection;