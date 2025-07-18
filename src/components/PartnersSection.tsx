import { Card, CardContent } from "@/components/ui/card";

const partners = [
  {
    name: "Blue Cross Blue Shield",
    logo: "🛡️", // Using emoji as placeholder for actual logos
    description: "Comprehensive Medicare plans"
  },
  {
    name: "Anthem",
    logo: "🏥",
    description: "Medicare Advantage options"
  },
  {
    name: "Aetna",
    logo: "❤️",
    description: "Health & wellness focused"
  },
  {
    name: "Humana",
    logo: "🌟",
    description: "Medicare supplement plans"
  },
  {
    name: "UnitedHealthcare",
    logo: "🔵",
    description: "Nationwide coverage"
  },
  {
    name: "Kaiser Permanente",
    logo: "🏢",
    description: "Integrated care model"
  },
  {
    name: "Cigna",
    logo: "⚡",
    description: "Prescription drug plans"
  },
  {
    name: "Molina Healthcare",
    logo: "🌅",
    description: "Community-focused care"
  }
];

const PartnersSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
            Allow Us to Save You Time and Money!
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-pretty">
            We shop multiple carriers, help you understand your options, and find you the best plans with the lowest premiums.
          </p>
        </div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {partners.map((partner, index) => (
            <Card 
              key={index} 
              className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center space-y-3">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                  {partner.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {partner.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Statement */}
        <div className="text-center bg-blue-50 rounded-2xl p-6 sm:p-8">
          <p className="text-lg sm:text-xl text-blue-900 font-medium max-w-3xl mx-auto">
            As independent brokers, we work with all major insurance carriers to find you the perfect Medicare plan at the best price - 
            <span className="font-bold"> at absolutely no cost to you!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection; 