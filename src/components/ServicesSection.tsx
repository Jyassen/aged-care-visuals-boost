import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Search, 
  MapPin, 
  PillBottle, 
  Gift, 
  UserCheck,
  CheckCircle
} from "lucide-react";
import CaptureForm from "@/components/CaptureForm";

const services = [
  {
    icon: Search,
    title: "Coverage Clarity",
    description: "Get clarity on your existing coverage and what it costs you. Learn the differences between Medicare Advantage, Supplement plans, and other coverage options.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: FileText,
    title: "Plan Comparison",
    description: "Find and compare Medicare plans available in your area that you may qualify for. See if you qualify for additional benefits beyond Original Medicare coverage.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: PillBottle,
    title: "Prescription Savings",
    description: "Discover programs that can help reduce your prescription drug costs. We'll review your medications and find plans that offer the best coverage.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: UserCheck,
    title: "Healthcare Navigation",
    description: "Navigate the healthcare system with best practices from experienced specialists. Ensure your doctors are in-network and understand your coverage.",
    color: "from-orange-500 to-orange-600"
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile-first responsive */}
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-balance">
            What We Help You Discover
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-pretty">
            Get clarity on your coverage options and find the Medicare plan that fits your unique needs and budget.
          </p>
        </div>

        {/* Services Grid - Enhanced responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16 lg:mb-20">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-6 sm:p-8 lg:p-10 text-center sm:text-left space-y-4 sm:space-y-6">
                <div className={`inline-flex w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${service.color} rounded-2xl items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight text-balance">
                  {service.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed text-pretty">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Cost Banner - Enhanced mobile design */}
        <Card className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 border-0 shadow-2xl overflow-hidden">
          <CardContent className="relative p-8 sm:p-12 lg:p-16 text-center space-y-6 sm:space-y-8">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            
            <div className="relative z-10 space-y-6 sm:space-y-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance">
                  All of these services are available at
                </h3>
                <div className="text-3xl sm:text-4xl lg:text-6xl font-black text-yellow-300 uppercase tracking-wide drop-shadow-lg">
                  Absolutely No Cost to You
                </div>
              </div>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed text-pretty">
                Our Medicare specialists are here to help you navigate your options with no fees, no pressure, and no hidden costs.
              </p>
              
              <div className="pt-4">
                <CaptureForm 
                  trigger={
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Get Started Today
                    </Button>
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServicesSection;