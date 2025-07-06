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

const services = [
  {
    icon: FileText,
    title: "Understand Your Current Health Plan",
    description: "Get clear, easy-to-understand explanations of your existing coverage and what it costs you each month."
  },
  {
    icon: Search,
    title: "Explore Medicare Options",
    description: "Learn the differences between Medicare Advantage, Supplement plans, and other coverage options in simple terms."
  },
  {
    icon: MapPin,
    title: "Evaluate Local Plans",
    description: "Find and compare Medicare plans available in your specific area that you may qualify for."
  },
  {
    icon: PillBottle,
    title: "Lower Medication Costs",
    description: "Discover programs and plans that can help significantly reduce your prescription drug costs."
  },
  {
    icon: Gift,
    title: "Maximize Your Benefits",
    description: "See if you qualify for additional benefits beyond Original Medicare coverage, like dental and vision."
  },
  {
    icon: UserCheck,
    title: "Get Expert Advice",
    description: "Navigate the healthcare system with best practices and guidance from experienced Medicare specialists."
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl-accessible md:text-4xl-accessible font-bold text-foreground">
            Why Choose YourMedGuy?
          </h2>
          <p className="text-xl-accessible text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We make Medicare simple and help you find the coverage that's right for your needs and budget.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-medium hover:shadow-strong transition-all duration-300 group">
              <CardContent className="p-8 text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl-accessible font-semibold text-foreground leading-tight">
                  {service.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Cost Banner */}
        <Card className="bg-gradient-primary border-0 shadow-strong">
          <CardContent className="p-12 text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-primary-foreground" />
            </div>
            <h3 className="text-2xl-accessible md:text-3xl-accessible font-bold text-primary-foreground">
              All of these services are available at
            </h3>
            <div className="text-4xl-accessible md:text-5xl font-bold text-accent uppercase tracking-wide">
              Absolutely No Cost to You
            </div>
            <p className="text-xl-accessible text-primary-foreground/90 max-w-2xl mx-auto">
              Our Medicare specialists are here to help you navigate your options with no fees, no pressure, and no hidden costs.
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-xl px-12 py-4 shadow-strong"
            >
              Get Started Today
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ServicesSection;