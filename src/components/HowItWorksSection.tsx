import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, FileCheck, Smile } from "lucide-react";
import CaptureForm from "@/components/CaptureForm";

const steps = [
  {
    step: "1",
    icon: Phone,
    title: "STEP 1: Contact Us",
    description: "Call us or fill out our form. We'll schedule a convenient time to discuss your Medicare needs and current coverage.",
    color: "bg-primary"
  },
  {
    step: "2", 
    icon: FileCheck,
    title: "STEP 2: Plan Review",
    description: "We'll compare plans from major insurance companies, review your medications, and check if your doctors are in-network.",
    color: "bg-accent"
  },
  {
    step: "3",
    icon: Smile,
    title: "STEP 3: Easy Enrollment",
    description: "Once you've chosen the best plan for your needs, we'll handle the enrollment process and ensure you understand your new coverage.",
    color: "bg-success"
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl-accessible md:text-4xl-accessible font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-xl-accessible text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Getting the right Medicare coverage is easier than you think. Here's our simple 3-step process:
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="bg-gradient-card border-0 shadow-medium hover:shadow-strong transition-all duration-300 h-full">
                <CardContent className="p-8 text-center space-y-6 relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center shadow-medium`}>
                      <span className="text-white font-bold text-xl">{step.step}</span>
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="pt-8">
                    <div className="mx-auto w-16 h-16 bg-muted rounded-2xl flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-foreground" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl-accessible font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Connector Arrow (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-medium">
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-primary-foreground transform rotate-90"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-muted to-muted/50 border-0 shadow-medium">
          <CardContent className="p-12 text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl-accessible md:text-3xl-accessible font-bold text-foreground">
                Ready to Find Your Perfect Medicare Plan?
              </h3>
              <p className="text-xl-accessible text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Don't navigate Medicare alone. Our licensed specialists are standing by to help you find coverage that fits your needs and budget.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CaptureForm 
                trigger={
                  <Button 
                    size="lg" 
                    className="bg-gradient-primary hover:bg-primary-hover text-xl px-12 py-4 shadow-strong"
                  >
                    Start Your Free Consultation
                  </Button>
                }
              />
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Or call us directly</p>
                <a 
                  href="tel:347-305-2260" 
                  className="text-xl-accessible font-semibold text-primary hover:text-primary-hover flex items-center justify-center sm:justify-start"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  347-305-2260
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorksSection;