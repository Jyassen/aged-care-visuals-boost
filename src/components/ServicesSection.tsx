import SectionHeading from "@/components/SectionHeading";
import type { SiteRegion } from "@/types/site.types";

const checks = [
  {
    tag: "Dr",
    title: "Your doctors",
    description: "We confirm every doctor and hospital you use is still in network for 2027, not just your primary.",
  },
  {
    tag: "Rx",
    title: "Your prescriptions",
    description: "Each medication is checked by tier and pharmacy so you are not overpaying at the counter.",
  },
  {
    tag: "$",
    title: "Your total cost",
    description: "Premium plus deductibles plus copays, side by side with the plans you qualify for.",
  },
];

type ServicesSectionProps = {
  region: SiteRegion;
};

const ServicesSection = ({ region }: ServicesSectionProps) => {
  const regionSupportMap: Record<SiteRegion, string> = {
    longisland: 'Local support for Nassau and Suffolk County.',
    statenisland: 'Local support for Staten Island.',
    nyc: 'Local support across all five boroughs.',
  };

  return (
    <section id="services" className="bg-ground py-14 sm:py-16 lg:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="What we check"
          title="Three things that decide whether your plan is still right."
          lede={`Most people never re-check after they enroll. Networks, drug tiers and premiums change every year. ${regionSupportMap[region]}`}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {checks.map((c) => (
            <div key={c.title} className="bg-white border border-rule rounded-2xl p-6">
              <div className="w-10 h-10 rounded-[10px] bg-[#E6EEFB] text-brandblue font-extrabold text-base flex items-center justify-center mb-4">
                {c.tag}
              </div>
              <h3 className="text-[17px] font-bold text-ink tracking-tight mb-1.5">{c.title}</h3>
              <p className="text-[15px] text-mute leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
