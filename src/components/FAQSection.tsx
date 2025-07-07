import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Are you an insurance company?",
    answer: "No, we are not an insurance company. We are an independent health insurance brokerage that assists individuals in shopping, comparing and enrolling in Medicare plans. We offer plans from major insurance companies like Humana, United Healthcare, Aetna, Blue Cross Blue Shield, and others. You can find the same plans at the same price as going directly to the insurance companies."
  },
  {
    question: "How much does your assistance cost?",
    answer: "Assistance is completely free. The prices for plans are the same as if you went directly to the insurance companies. We are compensated by the insurance companies when we help individuals enroll in their plans. Our agents get paid the same no matter which plan you choose, ensuring independent advice based solely on your needs."
  },
  {
    question: "How do you help me choose the right plan?",
    answer: "We provide straight answers to your health insurance questions. We match you with the best Medicare plan by comparing options from top insurance companies side by side and understanding your unique coverage needs. Your personal agent will review your medications and costs and check if your doctors are in-network. We ensure you understand the coverage and pricing before enrollment."
  },
  {
    question: "What should I have ready when I call to enroll?",
    answer: "When calling to enroll, please have your red, white, and blue Medicare ID card with you. It's also helpful to have a list of your current medications and the names of your doctors if you'd like to check if they're covered under the plan. Having these details will ensure a smooth enrollment process."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl-accessible md:text-4xl-accessible font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xl-accessible text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get answers to common questions about Medicare and our services.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background border border-border rounded-lg px-6 py-2 shadow-sm"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;