import { ShieldCheck, MapPin, Users } from "lucide-react";

/**
 * Carrier strip directly under the hero plus three proof points. Carrier
 * names are rendered as text wordmarks (no logo assets in the repo), which
 * stays accurate to the "we compare major carriers" claim made in the FAQ.
 *
 * Full list of carriers with 2027 New York or New Jersey plans Jamal is ready
 * to sell, per the "2027 Plans to Sell + SOB Benefits" sheet (Can Sell = Yes).
 * Not listed: Wellcare (no writable plan), Elderplan (MAP approval pending),
 * Horizon BCBS NJ and Clover (contracting pending). Update when the sheet changes.
 */
const carriers = [
  "UnitedHealthcare",
  "Humana",
  "Aetna",
  "Anthem",
  "Wellpoint",
  "EmblemHealth",
  "Healthfirst",
  "VNS Health",
  "MetroPlus",
  "VillageCareMAX",
  "HealthSpring (Cigna)",
  "Jefferson Health Plans",
];

const proof = [
  { icon: ShieldCheck, label: "Licensed NY & NJ Medicare brokers" },
  { icon: Users, label: "Independent. We work for you, not the carrier." },
  { icon: MapPin, label: "Local help across NYC, Long Island, Staten Island & New Jersey" },
];

const TrustBar = () => {
  return (
    <section className="bg-white border-y border-rule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-7 gap-y-2 py-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-mute">Plans compared from</span>
          {carriers.map((name) => (
            <span key={name} className="text-sm sm:text-[15px] font-bold text-[#8A97AB] tracking-tight">
              {name}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 border-t border-rule py-4">
          {proof.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 text-ink">
              <item.icon className="h-5 w-5 text-brandblue flex-shrink-0" />
              <span className="text-sm font-medium leading-snug">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
