const ComplianceSection = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-6 text-sm text-muted-foreground text-center leading-relaxed">
          <p>
            <strong className="text-foreground">Important Disclosure:</strong> We do not offer every plan available in your area. Please contact Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Program (SHIP) to get information on all your options.
          </p>
          
          <p>
            This website is not connected with or endorsed by the United States Government or the federal Medicare program. We may be paid a commission if you purchase a plan through our site.
          </p>
          
          <p>
            <strong className="text-foreground">Consent Notice:</strong> By submitting your contact information through our website, you consent to receive communications from YourMedGuy, a subsidiary of Yassco Consulting Group LLC. This includes calls, emails, and text messages related to Medicare plan information, updates, and special offers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;