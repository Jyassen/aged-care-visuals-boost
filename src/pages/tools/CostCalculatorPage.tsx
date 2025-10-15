/**
 * Medicare Cost Calculator Page
 * Full page layout for the cost calculator tool
 */

import CostCalculator from '@/components/tools/CostCalculator/CostCalculator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Complete page for the Medicare Cost Calculator tool
 * Seamless blue background with integrated hero and calculator
 */
export default function CostCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800">
        {/* Integrated Hero + Calculator Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero Content */}
            <div className="text-center text-white mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                What Will Medicare Cost YOU?
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-6">
                Get your personalized Medicare cost estimate in 30 seconds
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  100% Free
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No Obligation
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Instant Results
                </span>
              </div>
            </div>

            {/* Calculator - White Container */}
            <CostCalculator />
          </div>
        </section>
        
        {/* Trust Section */}
        <section className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted by 500+ New York Families
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              YourMedGuy has helped hundreds of New York residents 
              navigate Medicare and find the right plan for their needs and budget.
            </p>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-700">Families Helped</div>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">4.9★</div>
                <div className="text-gray-700">Average Rating</div>
              </div>
              <div className="p-6 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">Local</div>
                <div className="text-gray-700">New York Experts</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Compliance Disclaimer (CMS/HIPAA) */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8 text-xs text-gray-600 space-y-3">
          <p>
            YourMedGuy is not affiliated with or endorsed by the U.S. government or the federal Medicare program. This
            information is for educational purposes only and is not a complete description of benefits. Plan availability,
            premiums, copays, and benefits vary by carrier, county, and eligibility, and are subject to change.
          </p>
          <p>
            We do not offer every plan available in your area. Any information we provide is limited to the plans we do
            offer. Please contact Medicare.gov or 1-800-MEDICARE (TTY: 1-877-486-2048), 24 hours a day/7 days a week, to
            get information on all your options.
          </p>
          <p>
            Your information is protected under HIPAA to the extent applicable and will be used to contact you about
            Medicare plans by a licensed insurance agent. Consent to be contacted is not a condition of purchase.
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

