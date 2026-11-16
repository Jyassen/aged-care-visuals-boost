import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    title: "Book a time",
    description: "Pick a morning, afternoon or evening slot. We call you.",
  },
  {
    title: "We review your plan together",
    description: "Doctors, prescriptions and costs, checked live while you listen.",
  },
  {
    title: "You decide",
    description: "Stay or switch. If a change makes sense for you, we handle the enrollment paperwork.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-ground py-14 sm:py-16 lg:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <SectionHeading
              kicker="How it works"
              title="Fifteen minutes on the phone. No pressure, no obligation."
            />
            <ol className="border-t border-rule">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 py-4 border-b border-rule">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-ink text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-[17px] font-bold text-ink tracking-tight">{s.title}</h3>
                    <p className="text-[15px] text-mute leading-relaxed mt-0.5">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="/images/seniors happy appointment .jpg"
              alt="Senior couple reviewing their Medicare options with an advisor"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
