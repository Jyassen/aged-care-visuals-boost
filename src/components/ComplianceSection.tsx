const resources = [
  { title: "1-800-MEDICARE", sub: "General Medicare help", href: "https://www.medicare.gov", label: "medicare.gov", extra: <><a className="text-brandblue hover:underline" href="tel:1-800-633-4227">1-800-633-4227</a> · TTY 1-877-486-2048</> },
  { title: "Plan Finder", sub: "Compare plans, drugs, and costs", href: "https://www.medicare.gov/plan-compare", label: "Medicare Plan Finder" },
  { title: "NY Medicaid", sub: "Eligibility and enrollment", href: "https://www.health.ny.gov/health_care/medicaid/", label: "health.ny.gov/medicaid" },
  { title: "EPIC (NY)", sub: "Rx assistance for seniors 65+", href: "https://www.health.ny.gov/health_care/epic/", label: "health.ny.gov/epic" },
];

const ComplianceSection = () => {
  return (
    <section className="bg-white border-t border-rule py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-4 text-[13px] text-mute leading-relaxed">
          <p>
            <strong className="text-ink font-semibold">Important disclosure:</strong> We do not offer every plan available in your area. Any information we provide is limited to the plans we do offer. Please contact Medicare.gov or 1-800-MEDICARE (1-800-633-4227), TTY: 1-877-486-2048, 24 hours a day/7 days a week, to get information on all your options.
          </p>
          <p>
            This website is not connected with or endorsed by the United States Government or the federal Medicare program. We may be paid a commission if you purchase a plan through our site.
          </p>
          <p>
            <strong className="text-ink font-semibold">Consent notice:</strong> By submitting your contact information through our website, you agree to be contacted by a licensed insurance agent from YourMedGuy about Medicare plan options by phone, email, or text. Consent is not a condition of purchase.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {resources.map((r) => (
            <div key={r.title} className="bg-white rounded-xl border border-rule p-4 text-[13px]">
              <h4 className="font-bold text-ink text-sm mb-0.5">{r.title}</h4>
              <p className="text-mute text-xs">{r.sub}</p>
              {r.extra && <p className="mt-1.5 text-mute">{r.extra}</p>}
              <a className="mt-1.5 inline-block text-brandblue hover:underline font-medium" href={r.href} target="_blank" rel="noreferrer">{r.label}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;
