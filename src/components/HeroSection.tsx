import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import CaptureForm from "@/components/CaptureForm";
import ReviewCard from "@/components/ReviewCard";
import type { SiteRegion } from "@/types/site.types";

type HeroSectionProps = {
  region: SiteRegion;
};

const HeroSection = ({ region }: HeroSectionProps) => {
  const serviceAreaMap: Record<SiteRegion, string> = {
    longisland: 'Nassau and Suffolk County',
    statenisland: 'Staten Island',
    nyc: 'all five boroughs',
  };

  return (
    <section className="bg-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center py-10 sm:py-14 lg:py-16">
          {/* Copy */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 bg-white border border-rule rounded-full pl-1.5 pr-3 py-1.5 text-[13px] font-semibold text-mute mb-5">
              <span className="bg-amber text-amber-ink rounded-full px-2 py-0.5 text-xs font-bold">AEP</span>
              Enrollment closes December 7
            </div>

            <h1 className="text-[2.25rem] sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink">
              Your Medicare plan, <span className="text-brandblue">reviewed by someone</span> who works for you.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-mute leading-relaxed max-w-[40ch]">
              {`Independent, licensed New York agents compare your current plan against every major carrier. Fifteen minutes, free, and you keep your doctors. Serving ${serviceAreaMap[region]}.`}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <CaptureForm
                trigger={
                  <Button variant="amber" size="lg" className="w-full sm:w-auto">
                    Book my free review
                  </Button>
                }
              />
              <Button variant="quiet" size="lg" className="w-full sm:w-auto" asChild>
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>

            <div className="mt-5 flex items-center gap-2.5 text-sm text-mute">
              <span className="flex gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber fill-current" />
                ))}
              </span>
              <span>Rated 4.9 by New York families</span>
            </div>
          </div>

          {/* Example review */}
          <div className="min-w-0 lg:pl-4">
            <ReviewCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
