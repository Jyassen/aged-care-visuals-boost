import { Heart, Eye, Dumbbell, ShoppingCart } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import type { SiteRegion } from "@/types/site.types";
import { useState } from "react";

const benefits = [
  {
    icon: Heart,
    title: "Comprehensive dental coverage",
    description: "More than an exam and cleaning. See if you have access to dental benefits that include extractions, oral surgery, root canals and more.",
    image: "/images/dentalbenefits.jpg"
  },
  {
    icon: Eye,
    title: "Vision and hearing benefits",
    description: "Many plans include eyewear, contacts and hearing aid benefits. Find the options that fit your needs.",
    image: "/images/visioncoverage.jpg"
  },
  {
    icon: Dumbbell,
    title: "Wellness programs",
    description: "Programs that help you stay healthy and active, from health monitors to gym memberships and workout equipment.",
    image: "/images/wellnessprograms.jpg"
  },
  {
    icon: ShoppingCart,
    title: "Shopping and household benefits",
    description: "See if you are eligible for over-the-counter allowances and healthy food shopping benefits.",
    image: "/images/healthyfoods.jpg"
  }
];

type BenefitsSectionProps = {
  region: SiteRegion;
};

const BenefitsSection = ({ region }: BenefitsSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const regionDescMap: Record<SiteRegion, string> = {
    longisland: 'Long Island',
    statenisland: 'Staten Island',
    nyc: 'New York City',
  };

  const active = benefits[activeIndex];

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Extra benefits"
          title="Benefits you may qualify for beyond basic medical coverage."
          lede={`Many plans include extras that never get used because nobody explained them. We check what is available in ${regionDescMap[region]}.`}
        />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Tiles */}
          <div className="flex flex-col gap-3">
            {benefits.map((b, i) => {
              const isActive = i === activeIndex;
              return (
                <div key={b.title}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                    aria-expanded={isActive}
                    className={`w-full text-left rounded-2xl p-5 sm:p-6 transition-all duration-200 border ${
                      isActive
                        ? 'bg-ground border-ink/15 shadow-[0_18px_40px_-30px_rgba(14,31,58,0.45)]'
                        : 'bg-white border-rule hover:border-ink/25'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`flex-shrink-0 w-11 h-11 rounded-[10px] flex items-center justify-center ${isActive ? 'bg-brandblue text-white' : 'bg-[#E6EEFB] text-brandblue'}`}>
                        <b.icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-[17px] sm:text-lg font-bold text-ink tracking-tight flex-1">{b.title}</h3>
                    </div>
                    {isActive && (
                      <p className="mt-3 text-[15px] text-mute leading-relaxed sm:pl-[60px]">{b.description}</p>
                    )}
                  </button>

                  {/* Image inline on mobile only */}
                  {isActive && (
                    <div className="lg:hidden mt-3 rounded-2xl overflow-hidden aspect-[4/3]">
                      <img src={b.image} alt={b.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Image on desktop */}
          <div className="hidden lg:block sticky top-24 rounded-2xl overflow-hidden aspect-[4/3.4]">
            <img
              src={active.image}
              alt={active.title}
              className="w-full h-full object-cover transition-opacity duration-300"
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
