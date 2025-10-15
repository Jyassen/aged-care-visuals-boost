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

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="bg-white rounded-md border p-4">
              <h4 className="font-semibold text-foreground mb-1">1-800-MEDICARE</h4>
              <p className="text-xs">General Medicare help</p>
              <p className="mt-1 text-sm"><a className="text-blue-600 hover:underline" href="tel:1-800-633-4227">1-800-633-4227</a> • TTY 1-877-486-2048</p>
              <a className="text-sm text-blue-600 hover:underline" href="https://www.medicare.gov" target="_blank" rel="noreferrer">medicare.gov</a>
            </div>
            <div className="bg-white rounded-md border p-4">
              <h4 className="font-semibold text-foreground mb-1">Plan Finder</h4>
              <p className="text-xs">Compare plans, drugs, and costs</p>
              <a className="mt-1 inline-block text-sm text-blue-600 hover:underline" href="https://www.medicare.gov/plan-compare" target="_blank" rel="noreferrer">Medicare Plan Finder</a>
            </div>
            <div className="bg-white rounded-md border p-4">
              <h4 className="font-semibold text-foreground mb-1">NY Medicaid</h4>
              <p className="text-xs">Eligibility and enrollment</p>
              <a className="mt-1 inline-block text-sm text-blue-600 hover:underline" href="https://www.health.ny.gov/health_care/medicaid/" target="_blank" rel="noreferrer">health.ny.gov/medicaid</a>
            </div>
            <div className="bg-white rounded-md border p-4">
              <h4 className="font-semibold text-foreground mb-1">EPIC (NY)</h4>
              <p className="text-xs">Rx assistance for seniors 65+</p>
              <a className="mt-1 inline-block text-sm text-blue-600 hover:underline" href="https://www.health.ny.gov/health_care/epic/" target="_blank" rel="noreferrer">health.ny.gov/epic</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;