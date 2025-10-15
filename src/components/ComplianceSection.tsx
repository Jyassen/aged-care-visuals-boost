const ComplianceSection = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-6 text-sm text-muted-foreground text-center leading-relaxed">
          <p>
            <strong className="text-foreground">Important Disclosure:</strong> We do not offer every plan available in your area. Any information we provide is limited to the plans we do offer. Please contact Medicare.gov or 1-800-MEDICARE (1-800-633-4227), TTY: 1-877-486-2048, 24 hours a day/7 days a week, to get information on all your options.
          </p>
          
          <p>
            This website is not connected with or endorsed by the United States Government or the federal Medicare program. We may be paid a commission if you purchase a plan through our site.
          </p>
          
          <p>
            <strong className="text-foreground">Consent Notice:</strong> By submitting your contact information through our website, you agree to be contacted by a licensed insurance agent from YourMedGuy about Medicare plan options by phone, email, or text. Consent is not a condition of purchase.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;