import { Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Elizabeth R.",
    location: "Brooklyn, NY",
    text: "Thank you for making my Medicare enrollment process easy. I appreciate the time you took to explain all of my options. I will recommend you to all of my Medicare friends!",
    planType: "Medicare Advantage"
  },
  {
    id: 2,
    name: "Robert M.",
    location: "Queens, NY",
    text: "The service was outstanding. The agent was knowledgeable and patient with all my questions, and I understood my plan for the first time.",
    planType: "Medicare Supplement"
  },
  {
    id: 3,
    name: "Margaret S.",
    location: "Manhattan, NY",
    text: "I was so confused about Medicare options until I called YourMedGuy. They made everything clear and helped me choose the right plan for my needs and budget.",
    planType: "Prescription Drug Plan"
  },
  {
    id: 4,
    name: "James T.",
    location: "Bronx, NY",
    text: "Professional, courteous, and incredibly helpful. They took the stress out of choosing Medicare coverage. Thank you!",
    planType: "Medicare Advantage"
  }
];

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const Stars = () => (
  <span className="flex gap-0.5" aria-label="5 out of 5 stars">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="h-4 w-4 text-amber fill-current" />
    ))}
  </span>
);

const TestimonialsSection = () => {
  return (
    <section id="reviews" className="bg-ground py-14 sm:py-16 lg:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-2">
          <SectionHeading
            kicker="Reviews"
            title="What New York families say after the call."
          />
          <div className="inline-flex items-center gap-3 bg-white rounded-full border border-rule px-4 py-2 mb-8 sm:mb-10 self-start">
            <Stars />
            <span className="text-base font-bold text-ink">4.9<span className="text-mute font-medium">/5</span></span>
            <span className="text-sm text-mute">from verified clients</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {testimonials.map((t) => (
            <figure key={t.id} className="bg-white border border-rule rounded-2xl p-6 flex flex-col">
              <Stars />
              <blockquote className="mt-3 text-[15px] text-ink leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[#C9D7EC] text-navy text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {getInitials(t.name)}
                </span>
                <span className="text-[13px] text-mute leading-tight">
                  <span className="block text-sm font-bold text-ink">{t.name}</span>
                  {t.location} · {t.planType}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-xs text-mute text-center max-w-3xl mx-auto mt-8 leading-relaxed">
          Individual results vary. Testimonials reflect the experiences of specific clients and are not a guarantee of future results or savings.
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
