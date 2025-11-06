import { Card, CardContent } from "@/components/ui/card";
import { Heart, Eye, Dumbbell, ShoppingCart } from "lucide-react";
import type { SiteRegion } from "@/types/site.types";
import { useState } from "react";

const benefits = [
  {
    icon: Heart,
    title: "Comprehensive Dental Coverage",
    description: "It's more than just an exam and cleaning! See if you have access to comprehensive dental benefits that include extractions, oral surgery, root canals and more.",
    image: "/images/dentalbenefits.jpg"
  },
  {
    icon: Eye,
    title: "Vision & Hearing Benefits",
    description: "Many plans include eyewear and contacts and hearing aid benefits to increase your quality of life. Find the options that fit your needs.",
    image: "/images/visioncoverage.jpg"
  },
  {
    icon: Dumbbell,
    title: "Wellness Programs",
    description: "Many plans have programs that will help you stay healthy and fit. From health monitors to gym memberships and even workout equipment.",
    image: "/images/wellnessprograms.jpg"
  },
  {
    icon: ShoppingCart,
    title: "Shopping & Household Benefits",
    description: "See if you are eligible to receive shopping and household assistance with over the counter allowances and healthy shopping benefits.",
    image: "/images/healthyfoods.jpg"
  }
];

type BenefitsSectionProps = {
  region: SiteRegion;
};

const BenefitsSection = ({ region }: BenefitsSectionProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  
  const regionDescMap: Record<SiteRegion, string> = {
    longisland: 'Long Island',
    statenisland: 'Staten Island',
    nyc: 'New York City',
  };

  const currentBenefit = hoveredIndex !== null ? benefits[hoveredIndex] : benefits[0];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Additional Benefits You May Qualify For
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {`Discover the extra benefits that could be included in your Medicare plan beyond basic medical coverage. See options available in ${regionDescMap[region]}.`}
          </p>
        </div>

        {/* Interactive Benefits Display */}
        
        {/* Mobile Layout - Tiles with images inline */}
        <div className="lg:hidden space-y-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="space-y-4">
              <button
                onClick={() => setHoveredIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`w-full text-left p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
                  hoveredIndex === index
                    ? 'bg-blue-600 shadow-2xl scale-[1.02]'
                    : 'bg-white border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      hoveredIndex === index
                        ? 'bg-white/20'
                        : 'bg-blue-100'
                    }`}>
                      <benefit.icon className={`h-7 w-7 sm:h-8 sm:w-8 ${
                        hoveredIndex === index ? 'text-white' : 'text-blue-600'
                      }`} />
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-bold flex-1 ${
                      hoveredIndex === index ? 'text-white' : 'text-gray-900'
                    }`}>
                      {benefit.title}
                    </h3>
                  </div>
                  
                  {hoveredIndex === index && (
                    <p className="text-base sm:text-lg text-white leading-relaxed pl-[72px] sm:pl-[80px]">
                      {benefit.description}
                    </p>
                  )}
                </div>
              </button>
              
              {/* Image below each tile on mobile */}
              <div className="relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout - Two column with changing image */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Side - Benefit Tiles */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <button
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`w-full text-left p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
                  hoveredIndex === index
                    ? 'bg-blue-600 shadow-2xl scale-[1.02]'
                    : 'bg-white border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      hoveredIndex === index
                        ? 'bg-white/20'
                        : 'bg-blue-100'
                    }`}>
                      <benefit.icon className={`h-7 w-7 sm:h-8 sm:w-8 ${
                        hoveredIndex === index ? 'text-white' : 'text-blue-600'
                      }`} />
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-bold flex-1 ${
                      hoveredIndex === index ? 'text-white' : 'text-gray-900'
                    }`}>
                      {benefit.title}
                    </h3>
                  </div>
                  
                  {hoveredIndex === index && (
                    <p className="text-base sm:text-lg text-white leading-relaxed pl-[72px] sm:pl-[80px]">
                      {benefit.description}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right Side - Full Vertical Image */}
          <div className="relative h-[600px] sm:h-[700px] lg:h-auto lg:min-h-[800px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={currentBenefit.image}
              alt={currentBenefit.title}
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;