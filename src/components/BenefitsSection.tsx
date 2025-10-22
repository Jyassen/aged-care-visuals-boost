import { Card, CardContent } from "@/components/ui/card";
import { Heart, Eye, Dumbbell, ShoppingCart } from "lucide-react";
import type { SiteRegion } from "@/types/site.types";

const benefits = [
  {
    icon: Heart,
    title: "Comprehensive Dental Coverage",
    description: "It's more than just an exam and cleaning! See if you have access to comprehensive dental benefits that include extractions, oral surgery, root canals and more."
  },
  {
    icon: Eye,
    title: "Vision & Hearing Benefits",
    description: "Many plans include eyewear and contacts and hearing aid benefits to increase your quality of life. Find the options that fit your needs."
  },
  {
    icon: Dumbbell,
    title: "Wellness Programs",
    description: "Many plans have programs that will help you stay healthy and fit. From health monitors to gym memberships and even workout equipment."
  },
  {
    icon: ShoppingCart,
    title: "Shopping & Household Benefits",
    description: "See if you are eligible to receive shopping and household assistance with over the counter allowances and healthy shopping benefits."
  }
];

type BenefitsSectionProps = {
  region: SiteRegion;
};

const BenefitsSection = ({ region }: BenefitsSectionProps) => {
  const regionDescMap: Record<SiteRegion, string> = {
    longisland: 'Long Island',
    statenisland: 'Staten Island',
    nyc: 'New York City',
  };
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl-accessible md:text-4xl-accessible font-bold text-foreground">
            Additional Benefits You May Qualify For
          </h2>
          <p className="text-xl-accessible text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {`Discover the extra benefits that could be included in your Medicare plan beyond basic medical coverage. See options available in ${regionDescMap[region]}.`}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-medium hover:shadow-strong transition-all duration-300 group">
              <CardContent className="p-8 text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl-accessible font-semibold text-foreground leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;