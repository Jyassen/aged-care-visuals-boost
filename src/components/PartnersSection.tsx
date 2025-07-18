import { Card, CardContent } from "@/components/ui/card";
import { Shield, DollarSign, Users, Clock, CheckCircle, Star } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Licensed & Certified",
    description: "All our agents are state-licensed Medicare specialists",
    color: "from-blue-600 to-blue-700"
  },
  {
    icon: DollarSign,
    title: "No Cost to You",
    description: "Our services are completely free - we're paid by the insurance companies",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Users,
    title: "Independent Brokers",
    description: "We represent multiple carriers to find you the best options",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "We do the research and comparison shopping for you",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: CheckCircle,
    title: "Personalized Service",
    description: "One-on-one guidance tailored to your specific needs",
    color: "from-teal-500 to-teal-600"
  },
  {
    icon: Star,
    title: "Ongoing Support",
    description: "We're here to help throughout your Medicare journey",
    color: "from-indigo-500 to-indigo-600"
  }
];

const PartnersSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
            Why Choose YourMedGuy?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-pretty">
            As independent Medicare brokers, we work for you - not the insurance companies. 
            Let us save you time and money by finding the perfect plan.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${benefit.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Statement */}
        <div className="text-center bg-blue-50 rounded-2xl p-6 sm:p-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-900">
              We Shop All Major Medicare Plans For You
            </h3>
            <p className="text-lg sm:text-xl text-blue-800 font-medium">
              We work with all the major insurance carriers in your area to compare plans, benefits, and costs. 
              Our goal is simple: find you the best Medicare coverage at the best price.
            </p>
            <p className="text-base text-blue-700">
              <span className="font-bold">Best of all:</span> Our expert guidance costs you absolutely nothing!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection; 