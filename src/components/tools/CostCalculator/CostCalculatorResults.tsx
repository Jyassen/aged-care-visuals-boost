/**
 * Medicare Cost Calculator Results Component
 * Displays calculated costs, breakdown, and recommendations
 */

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Calendar, DollarSign, ChevronDown, ChevronUp, X } from 'lucide-react';
import { CostEstimate } from '@/types/medicare.types';
import LeadCaptureForm from '../shared/LeadCaptureForm';
import CaptureForm from '@/components/CaptureForm';

interface CostCalculatorResultsProps {
  /** Calculated cost estimate to display */
  estimate: CostEstimate;
  /** Callback to reset calculator and show form again */
  onReset: () => void;
}

/**
 * Displays Medicare cost calculation results with breakdown and CTA
 */
export default function CostCalculatorResults({ estimate, onReset }: CostCalculatorResultsProps) {
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  const [showMidPagePopup, setShowMidPagePopup] = useState(false);
  
  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Show mid-page popup when user scrolls ~50% down the results
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrolled / docHeight > 0.4) {
        setShowMidPagePopup(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  // Detailed copay information for NY 2026 Medicare plans
  const getCopayDetails = (category: string) => {
    const details: Record<string, { title: string; items: { label: string; amount: string }[] }> = {
      'Medicare Part B Premium': {
        title: 'What Part B Covers',
        items: [
          { label: 'Doctor visits', amount: '$0 copay (after deductible)' },
          { label: 'Outpatient care', amount: '$0 copay (after deductible)' },
          { label: 'Preventive services', amount: '$0 copay' },
          { label: 'Annual deductible', amount: '$240 (2026)' },
          { label: 'Part B coinsurance', amount: '20% of Medicare-approved amount' },
        ]
      },
      'Medicare Advantage Plan Premium': {
        title: 'Real NY 2026 Medicare Advantage Plan Premiums',
        items: [
          { label: '$0 Premium Plans (Commonly selected)', amount: 'Healthfirst, Elderplan, VIP Value, True Choice' },
          { label: 'Low Premium Plans ($25-$40)', amount: 'VNS EasyCare ($25), Anthem ($24), Humana ($37)' },
          { label: 'Mid Premium Plans ($50-$80)', amount: 'EmblemHealth VIP Gold ($54), Aetna Premier ($81)' },
          { label: 'What\'s Included', amount: 'Part D prescription coverage' },
          { label: 'Extra Benefits', amount: 'Dental, vision, hearing often included' },
          { label: 'Network', amount: 'Must use plan doctors and hospitals' },
        ]
      },
      'Doctor Visits & Copays': {
        title: 'Your Estimated Annual Visit Costs (NY 2026 Plans)',
        items: [
          { label: 'Based on health status', amount: 'Actual 2026 NY plan copays' },
          { label: 'Very healthy (1 PCP visit)', amount: '$0/year ($0 copay)' },
          { label: 'Pretty healthy (3 PCP visits)', amount: '$0/year ($0 copay)' },
          { label: 'Managing conditions (4 PCP + 6 specialist)', amount: '$390/year ($15 PCP + $40 specialist)' },
          { label: 'Multiple conditions (6 PCP + 12 specialist)', amount: '$690/year ($15 PCP + $40 specialist)' },
          { label: 'Additional urgent care visit', amount: '$40 - $75 per visit' },
        ]
      },
      'Prescription Drugs (Part D)': {
        title: 'Actual NY 2026 Drug Costs per Prescription',
        items: [
          { label: 'Tier 1 (Generic)', amount: '$0 - $10 copay' },
          { label: 'Tier 2 (Preferred Generic)', amount: '$5 - $15 copay' },
          { label: 'Tier 3 (Preferred Brand)', amount: '$40 - $60 copay' },
          { label: 'Tier 4 (Non-Preferred)', amount: '$85 - $120 copay' },
          { label: 'Tier 5 (Specialty)', amount: '25-33% coinsurance' },
          { label: 'Annual Part D deductible', amount: 'Up to $615 (2026 max)' },
          { label: 'Your estimate assumes', amount: 'Mix of generic & brand drugs' },
        ]
      }
    };
    return details[category] || null;
  };
  
  return (
    <div className="space-y-6">
      {/* Mid-page popup trigger */}
      <div className="relative">
        {/* Observer element roughly mid-page */}
        <div
          className="sr-only"
          aria-hidden
          id="mid-page-anchor"
        />
      </div>
      {/* Part B Premium Notice */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            Medicare Part B Premium (Not Included in Total Below)
          </h3>
          <p className="text-gray-700">
            Usually you will still pay your Part B premium deducted from your Social Security or directly.
          </p>
          
          <button
            onClick={() => toggleSection(-1)}
            className="w-full flex justify-between items-center p-4 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            <div>
              <p className="font-bold text-gray-900 text-xl">${estimate.partBPremium.toFixed(2)} per month</p>
              <p className="text-sm text-gray-600 mt-1">2026 verified premium amount</p>
            </div>
            {expandedSections[-1] ? 
              <ChevronUp className="h-5 w-5 text-blue-600" /> : 
              <ChevronDown className="h-5 w-5 text-blue-600" />
            }
          </button>
          
          {expandedSections[-1] && (
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h5 className="font-semibold text-sm text-blue-900 mb-3">What Part B Covers</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Doctor visits</span>
                  <span className="font-medium text-gray-900">$0 copay (after deductible)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Outpatient care</span>
                  <span className="font-medium text-gray-900">$0 copay (after deductible)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Preventive services</span>
                  <span className="font-medium text-gray-900">$0 copay</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Annual deductible</span>
                  <span className="font-medium text-gray-900">$240 (2026)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Part B coinsurance</span>
                  <span className="font-medium text-gray-900">20% of Medicare-approved amount</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      {/* Mid-page Popup CTA */}
      {showMidPagePopup && !showLeadCapture && (
        <div className="fixed bottom-6 right-6 z-40 w-[360px] max-w-[92vw] shadow-2xl">
          <Card className="relative p-4 border-2 border-amber-300 bg-amber-50">
            <button
              aria-label="Dismiss"
              onClick={() => setShowMidPagePopup(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="font-bold text-gray-900 mb-1">You may qualify for lower costs</div>
            <p className="text-sm text-gray-700 mb-3">
              If you receive Extra Help, Medicaid, or other benefits, your costs may be even lower. Find out from YourMedGuy.
            </p>
            <CaptureForm
              title="Check Savings & Programs"
              description="Find out if Extra Help, Medicaid or other programs can lower your costs."
              trigger={
                <Button
                  type="button"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                >
                  Fill Out Form
                </Button>
              }
            />
            <p className="text-[10px] text-gray-500 mt-2 text-center">
              By submitting, you consent to be contacted by a licensed agent. Not affiliated with or endorsed by the U.S. government or the federal Medicare program.
            </p>
          </Card>
        </div>
      )}

      {/* Main Cost Display */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Your Additional Medicare Costs</h3>
          <p className="text-sm text-gray-600">(Not including Part B premium shown above)</p>
          
          <div className="space-y-2">
            <div className="text-4xl sm:text-5xl font-bold text-blue-900">
              ${Math.round(estimate.totalMonthly.min)} - ${Math.round(estimate.totalMonthly.max)}
            </div>
            <p className="text-lg text-gray-600">per month</p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Calendar className="h-5 w-5" />
            <span>
              ${estimate.totalAnnual.min.toLocaleString()} - ${estimate.totalAnnual.max.toLocaleString()} per year
            </span>
          </div>

          <p className="text-sm text-gray-600 max-w-3xl mx-auto mt-3">
            Note: This estimate does not include other medical costs you may have such as labs, blood tests, MRI/CT scans, or outpatient procedures. For detailed costs, speak with one of our experienced licensed brokers.
          </p>
        </div>
      </Card>
      
      
      {/* Medicare Advantage Cost Estimator */}
      <Card className="p-6 border-2 border-blue-300">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-md font-bold text-sm">OPTION 1</div>
          <h4 className="text-xl font-bold text-gray-900">Medicare Advantage Cost Breakdown</h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">All-in-one plan with Part D included (80% of NY enrollees choose this)</p>
        
        <div className="space-y-2">
          {estimate.breakdown.filter(item => item.category !== 'Medicare Part B Premium').map((item, index) => {
            const copayDetails = getCopayDetails(item.category);
            const isExpanded = expandedSections[index];
            
            return (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex justify-between items-start p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{item.category}</p>
                      {copayDetails && (
                        isExpanded ? 
                          <ChevronUp className="h-4 w-4 text-blue-600" /> : 
                          <ChevronDown className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-gray-900">${item.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">per month</p>
                  </div>
                </button>
                
                {isExpanded && copayDetails && (
                  <div className="px-4 pb-4 pt-2 bg-blue-50/50 border-t border-blue-100">
                    <h5 className="font-semibold text-sm text-blue-900 mb-3">{copayDetails.title}</h5>
                    <div className="space-y-2">
                      {copayDetails.items.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{detail.label}</span>
                          <span className="font-medium text-gray-900">{detail.amount}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3 italic">
                      * Costs vary by plan. Click consultation below for personalized quote.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h5 className="font-semibold text-gray-900 mb-2">Medicare Advantage Benefits:</h5>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>📊 80% of New York Medicare enrollees choose Medicare Advantage</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-amber-500 mt-0.5" /><span>All-in-one plan with Part D prescription coverage included</span></li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-amber-500 mt-0.5" /><span>Many $0 premium plan options in New York</span></li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-amber-500 mt-0.5" /><span>Often includes dental, vision, and hearing</span></li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-amber-500 mt-0.5" /><span>Copays for services (typically $0-$40 per visit)</span></li>
            <li>⚠ Must use plan's network of doctors</li>
          </ul>
        </div>
      </Card>
      
      {/* OR Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <div className="bg-gray-200 px-6 py-2 rounded-full font-bold text-gray-700 text-lg">OR</div>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
      
      {/* Medicare Supplement (Medigap) Alternative */}
      <Card className="p-6 border-2 border-purple-300">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-purple-600 text-white px-3 py-1 rounded-md font-bold text-sm">OPTION 2</div>
          <h4 className="text-xl font-bold text-gray-900">Medicare Supplement (Medigap) Cost Breakdown</h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">Original Medicare + Supplement policy (Freedom to see any doctor)</p>
        
        <div className="space-y-3">
          {/* Medigap Plan G */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">Plan G (Commonly selected)</p>
                <p className="text-sm text-gray-600 mt-1">Robust coverage; buy Part D separately</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">$150 - $250</p>
                <p className="text-xs text-gray-500">per month</p>
              </div>
            </div>
          </div>
          
          {/* Medigap Plan N */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">Plan N (Lower cost)</p>
                <p className="text-sm text-gray-600 mt-1">Lower premium; small copays for office/ER</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">$100 - $180</p>
                <p className="text-xs text-gray-500">per month</p>
              </div>
            </div>
          </div>
          
          {/* Part D Separate */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">Part D Prescription Plan (Separate)</p>
                <p className="text-sm text-gray-600 mt-1">Required for drug coverage with Medigap</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">$30 - $80</p>
                <p className="text-xs text-gray-500">per month</p>
              </div>
            </div>
          </div>

          {/* Totals for Medigap */}
          <div className="border-2 border-purple-300 bg-purple-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900 text-lg">Plan N: $200 - $330</p>
                <p className="text-sm text-gray-600">(Not including Part B premium)</p>
              </div>
              <p className="text-xs text-gray-500">premiums + Part D</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900 text-lg">Plan G: $230 - $410</p>
                <p className="text-sm text-gray-600">(Not including Part B premium)</p>
              </div>
              <p className="text-xs text-gray-500">premiums + Part D</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <h5 className="font-semibold text-gray-900 mb-2">Medicare Supplement Benefits:</h5>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-amber-500 mt-0.5" /><span>See ANY doctor that accepts Medicare nationwide</span></li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-amber-500 mt-0.5" /><span>No network restrictions — complete freedom</span></li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-amber-500 mt-0.5" /><span>Predictable costs — very few surprise bills</span></li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-amber-500 mt-0.5" /><span>Covers Part B 20% coinsurance and other gaps</span></li>
            <li>⚠ Higher monthly premium than most MA plans</li>
            <li>⚠ Must purchase Part D prescription coverage separately</li>
          </ul>
        </div>
      </Card>
      
      {/* Choose Which Option Section (kept) */}
      <Card className="p-6 bg-amber-50 border-amber-200">
        <h4 className="font-bold text-gray-900 mb-3">💡 Which Option Is Right for You?</h4>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Choose Medicare Advantage if:</strong> You want lower monthly costs (${Math.round(estimate.totalMonthly.min)}-${Math.round(estimate.totalMonthly.max)}/mo), don't mind using network doctors, and want dental/vision/hearing included.
          </p>
          <p>
            <strong>Choose Medicare Supplement if:</strong> You travel frequently, want to see any doctor nationwide, value predictable costs, and can budget $200–$410/month including Part D.
          </p>
        </div>
      </Card>
      
      {/* Recommendations removed per request */}
      
      {/* CTA Section */}
      {!showLeadCapture ? (
        <Card className="p-8 text-center bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Want a Detailed, Personalized Analysis?
          </h3>
          <p className="text-gray-700 mb-6">
            Get a free consultation to discuss your situation and explore plan options suitable for your needs.
          </p>
          <Button
            onClick={() => setShowLeadCapture(true)}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg px-8 py-6"
          >
            Get My Free Consultation
          </Button>
          <p className="text-sm text-gray-600 mt-4">
            No pressure • No obligation • Licensed local experts
          </p>
        </Card>
      ) : (
        <LeadCaptureForm
          source="cost-calculator"
          context={{
            estimatedCosts: estimate.totalMonthly,
            calculatorResults: {
              monthlyRange: `$${Math.round(estimate.totalMonthly.min)} - $${Math.round(estimate.totalMonthly.max)}`,
              annualRange: `$${estimate.totalAnnual.min.toLocaleString()} - $${estimate.totalAnnual.max.toLocaleString()}`,
              prescriptionCosts: estimate.prescriptionCosts,
            }
          }}
          onSuccess={() => {
            console.log('Lead captured successfully from cost calculator');
          }}
        />
      )}
      
      {/* Calculate Again */}
      <div className="text-center">
        <Button variant="outline" onClick={onReset}>
          Calculate Again
        </Button>
      </div>
    </div>
  );
}

