import { Shield, DollarSign, Users, Clock, CheckCircle, Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const reasons = [
  { icon: Shield, title: "Licensed and certified", description: "Every agent is a state-licensed Medicare specialist." },
  { icon: DollarSign, title: "No cost to you", description: "Our help is free. We are paid by the carriers, the same amount whichever plan you choose." },
  { icon: Users, title: "Independent brokers", description: "We represent multiple carriers, so the advice is based on your needs." },
  { icon: Clock, title: "We do the comparing", description: "Research and side-by-side comparison, done for you." },
  { icon: CheckCircle, title: "One-on-one guidance", description: "A real person who knows your doctors and your prescriptions." },
  { icon: Star, title: "Support after enrollment", description: "Questions in March get answered just like questions in November." },
];

const PartnersSection = () => {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Why YourMedGuy"
          title="Independent brokers who work for you, not the insurance company."
          lede="Same plans, same prices as going direct. The difference is someone on your side who compares them for you."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reasons.map((r) => (
            <div key={r.title} className="border border-rule rounded-2xl p-6">
              <span className="w-10 h-10 rounded-[10px] bg-[#E6EEFB] text-brandblue flex items-center justify-center mb-4">
                <r.icon className="h-5 w-5" />
              </span>
              <h3 className="text-[17px] font-bold text-ink tracking-tight mb-1.5">{r.title}</h3>
              <p className="text-[15px] text-mute leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
