import { ShieldCheck, MapPin, Users } from "lucide-react";

/**
 * Trust strip shown directly under the hero: the carriers we shop plus a few
 * proof points. Carrier names are rendered as clean text wordmarks (we do not
 * ship carrier logo assets), which reads as intentional and stays accurate to
 * the "we compare major carriers" claim already made in the FAQ.
 */
const carriers = [
  "UnitedHealthcare",
  "Humana",
  "Aetna",
  "Blue Cross Blue Shield",
  "Cigna",
  "Wellcare",
];

const proof = [
  { icon: ShieldCheck, label: "Licensed NY Medicare brokers" },
  { icon: Users, label: "Independent — we work for you, not the carrier" },
  { icon: MapPin, label: "Local help across NYC, Long Island & Staten Island" },
];

const TrustBar = () => {
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-gray-500 mb-5">
          We compare plans from the top Medicare carriers
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-8">
          {carriers.map((name) => (
            <span
              key={name}
              className="text-base sm:text-lg font-bold text-gray-400 tracking-tight"
            >
              {name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {proof.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 justify-center sm:justify-start text-gray-700"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <item.icon className="h-5 w-5" />
              </span>
              <span className="text-sm sm:text-base font-medium leading-snug">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
