/**
 * Medicare Cost Calculator Utilities
 * Contains calculation logic, validation, and recommendation generation
 */

import { CostCalculatorInput, CostEstimate, CostBreakdown } from '@/types/medicare.types';

/**
 * Medicare Part B standard premium and deductible.
 *
 * CMS publishes the coming year's Part A/B amounts in mid-November. As of 2026-11-16
 * the official 2027 figures have NOT been released (the 2026 Trustees Report projects
 * $209.50/month and a $292 deductible). Following the YourMedGuy Stress-Free Medicare
 * Guide 2027 convention, the calculator shows the confirmed 2026 amount, clearly
 * labeled, until CMS announces 2027.
 *
 * When CMS publishes the 2027 fact sheet, update `premium`, `deductible`, `year`
 * and `label` here — every display string reads from this object.
 * Source (2026): CMS "2026 Medicare Parts A & B Premiums and Deductibles" fact sheet.
 */
export const PART_B = {
  premium: 202.90,
  deductible: 283,
  year: 2026,
  label: '2026 confirmed rate. CMS has not yet announced the 2027 Part B premium.',
} as const;

/**
 * Medicare Part D (prescription drug) 2027 program amounts.
 * Source: YourMedGuy Stress-Free Medicare Guide 2027 (CMS 2027 Part D parameters).
 */
export const PART_D_2027 = {
  maxDeductible: 700,     // Maximum annual Part D deductible; many plans charge less
  outOfPocketCap: 2400,   // Hard yearly cap on covered drug costs
} as const;

/**
 * Premium ranges based on health status
 * Based on actual 2027 NY Medicare Advantage plan premiums
 * Source: "2027 Plans to Sell + SOB Benefits" sheet (carrier 2027 SOBs / CMS PBP 2027)
 *
 * 2027 NY non-SNP MAPD premium distribution (what people actually pick):
 * - $0 Premium: Healthfirst 65 Plus, EmblemHealth VIP Value, Humana Gold Plus (Kings/Queens),
 *   Aetna Signature HMO, AARP/UHC HMO-POS & PPO, many Anthem plans, MetroPlus Platinum (MANY!)
 * - $25-$50: VNS EasyCare ($25), Anthem ($29-$39), EmblemHealth VIP Saver ($40.40),
 *   Humana Gold Plus ($45-$50)
 * - $55-$110: Healthfirst Signature HMO ($60/$92), Aetna Enhanced ($69-$104),
 *   Aetna Elite PPO ($79-$109), EmblemHealth VIP Gold ($40-$166 by county)
 * - $150+: EmblemHealth VIP Core ($180), VIP Gold Plus ($216), Healthfirst Signature PPO ($155)
 *
 * Adjusted for REALISTIC averages based on enrollment patterns:
 */
const PREMIUM_RANGES = {
  excellent: { min: 0, max: 25 },   // Mostly $0, some choose EasyCare → avg $12.50
  good: { min: 0, max: 45 },        // Mix of $0 and low premium (Saver/Humana) → avg $22.50
  fair: { min: 0, max: 65 },        // Some choose Signature/Enhanced for benefits → avg $32.50
  poor: { min: 25, max: 105 },      // Richer benefits, avoid $0 plans (Elite/Gold) → avg $65
} as const;

/**
 * Doctor visit frequency and costs by health status
 * Based on actual 2027 NY Medicare Advantage plan copays
 * Source: "2027 Plans to Sell + SOB Benefits" sheet - PCP / Specialist columns
 *
 * NY 2027 Plan Copays (actual):
 * - Primary Care: $0 on nearly every plan; a few charge $5-$15
 * - Specialist: $35-$55 on most plans (Humana $35-$50, Aetna $40-$55,
 *   EmblemHealth $35-$50, Healthfirst $40-$45, Anthem $45-$60, UHC $30-$55)
 * - D-SNP plans: $0 copays (not modeled here)
 */
const DOCTOR_VISIT_COSTS = {
  excellent: {
    primaryCareVisits: 1,
    specialistVisits: 0,
    primaryCareCopay: 0,      // $0 PCP copay on nearly all 2027 NY plans
    specialistCopay: 40,      // Typical NY specialist copay
    description: 'Once a year visit only'
  },
  good: {
    primaryCareVisits: 3,
    specialistVisits: 0,
    primaryCareCopay: 0,      // $0 copay standard on HMO plans
    specialistCopay: 40,
    description: '2-3 routine checkups per year'
  },
  fair: {
    primaryCareVisits: 4,
    specialistVisits: 6,      // 1-2 specialists x 3-4 visits each
    primaryCareCopay: 10,     // Blended: mostly $0, some plans $5-$15
    specialistCopay: 45,      // Blended mid-point of $35-$55
    description: 'Seasonal visits, 1-2 specialists'
  },
  poor: {
    primaryCareVisits: 6,
    specialistVisits: 12,     // 3+ specialists x 4 visits each
    primaryCareCopay: 10,     // Blended: mostly $0, some plans $5-$15
    specialistCopay: 45,      // Up to $60 on some plans
    description: 'Frequent visits, 3+ specialists'
  }
} as const;

/**
 * Calculates estimated Medicare costs based on user input
 * @param input - User's age, location, health status, and prescription count
 * @returns Complete cost estimate with breakdown and recommendations
 */
export function calculateMedicareCosts(input: CostCalculatorInput): CostEstimate {
  const { healthStatus, prescriptionCount } = input;
  
  // Get base premium range based on health status
  const basePremium = PREMIUM_RANGES[healthStatus];
  
  // Get doctor visit information for this health status
  const doctorVisits = DOCTOR_VISIT_COSTS[healthStatus];
  
  // Calculate annual doctor visit costs
  const primaryCareCostAnnual = doctorVisits.primaryCareVisits * doctorVisits.primaryCareCopay;
  const specialistCostAnnual = doctorVisits.specialistVisits * doctorVisits.specialistCopay;
  const totalDoctorCostAnnual = primaryCareCostAnnual + specialistCostAnnual;
  const avgDoctorCostMonthly = totalDoctorCostAnnual / 12;
  
  // Calculate prescription costs
  // Range based on 2027 NY MAPD drug tiers ("2027 Plans to Sell + SOB Benefits"):
  // Tier 1 $0-$5, Tier 2 $0-$12, Tier 3 17-25% coinsurance, Tier 4 25-50%, Tier 5 25-33%
  // Low estimate: mostly generics (Tier 1-2) at $0-$12 copay
  // High estimate: mix with some preferred brands at ~17-25% coinsurance (~$45-$60/fill)
  const prescriptionRange = {
    min: prescriptionCount * 5,   // Mostly generic drugs (Tier 1-2)
    max: prescriptionCount * 50,  // Mix of generics and preferred brands (Tier 2-3)
  };
  
  // Calculate average premium
  const averagePremium = (basePremium.min + basePremium.max) / 2;
  
  // Calculate average prescription cost for breakdown
  const avgPrescriptionCost = (prescriptionRange.min + prescriptionRange.max) / 2;
  
  // Calculate total monthly costs (excluding Part B premium - that's separate)
  const monthlyTotal = {
    min: basePremium.min + prescriptionRange.min + avgDoctorCostMonthly,
    max: basePremium.max + prescriptionRange.max + avgDoctorCostMonthly,
  };
  
  // Build detailed cost breakdown with doctor visits
  const breakdown: CostBreakdown[] = [
    {
      category: 'Medicare Part B Premium',
      amount: PART_B.premium,
      description: `Standard Medicare Part B premium (${PART_B.year} rate; 2027 not yet announced)`,
    },
    {
      category: 'Medicare Advantage Plan Premium',
      amount: averagePremium,
      description: 'Estimated based on your health status',
    },
    {
      category: 'Doctor Visits & Copays',
      amount: avgDoctorCostMonthly,
      description: `${doctorVisits.primaryCareVisits} primary care visit${doctorVisits.primaryCareVisits === 1 ? '' : 's'} @ $${doctorVisits.primaryCareCopay}${doctorVisits.specialistVisits > 0 ? ` + ${doctorVisits.specialistVisits} specialist visits @ $${doctorVisits.specialistCopay}` : ''}/year`,
    },
    {
      category: 'Prescription Drugs (Part D)',
      amount: avgPrescriptionCost,
      description: `Estimated for ${prescriptionCount} prescription${prescriptionCount !== 1 ? 's' : ''}`,
    },
  ];
  
  // Generate personalized recommendations
  const recommendations = generateRecommendations(input, monthlyTotal);
  
  return {
    monthlyPremium: {
      min: basePremium.min,
      max: basePremium.max,
      average: averagePremium,
    },
    partBPremium: PART_B.premium,
    prescriptionCosts: prescriptionRange,
    totalMonthly: monthlyTotal,
    totalAnnual: {
      min: monthlyTotal.min * 12,
      max: monthlyTotal.max * 12,
    },
    breakdown,
    recommendations,
  };
}

/**
 * Generates personalized recommendations based on user's situation
 * @param input - User's calculator input
 * @param costs - Calculated cost totals
 * @returns Array of personalized recommendation strings
 */
function generateRecommendations(
  input: CostCalculatorInput,
  costs: { min: number; max: number }
): string[] {
  const recommendations: string[] = [];
  
  // Recommendation for high prescription users
  if (input.prescriptionCount > 5) {
    recommendations.push(
      'Consider Medicare Advantage plans with integrated prescription coverage to potentially lower your medication costs'
    );
  }
  
  // Recommendation for fair/poor health status
  if (input.healthStatus === 'poor' || input.healthStatus === 'fair') {
    recommendations.push(
      'A Medicare Supplement (Medigap) plan may offer more predictable costs; compare benefits to your needs'
    );
  }
  
  // Recommendation for high overall costs
  if (costs.max > 500) {
    recommendations.push(
      'You may qualify for Extra Help, a program that helps pay Medicare prescription drug costs. Ask us about eligibility'
    );
  }
  
  // Recommendation for excellent health
  if (input.healthStatus === 'excellent' && input.prescriptionCount <= 2) {
    recommendations.push(
      'With your good health, a zero-premium Medicare Advantage plan may be a cost-effective option'
    );
  }
  
  // Always include consultation CTA
  recommendations.push(
    'Book a consultation to review plan options available in your area and identify options suitable for your needs'
  );
  
  return recommendations;
}

/**
 * Validates if a ZIP code is in New York State
 * Valid NY ZIP code ranges: 10000-14999
 * Covers all five boroughs, Long Island, Upstate, and Western NY
 * 
 * @param zipCode - 5-digit ZIP code string
 * @returns true if valid New York ZIP code, false otherwise
 */
export function validateZipCode(zipCode: string): boolean {
  // Check if it's a 5-digit number
  if (!/^\d{5}$/.test(zipCode)) {
    return false;
  }
  
  const zip = parseInt(zipCode, 10);
  
  // Check if within New York State ZIP code ranges
  return zip >= 10000 && zip <= 14999;
}

/**
 * Formats a dollar amount for display
 * @param amount - Dollar amount to format
 * @returns Formatted string (e.g., "$174.70")
 */
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Formats a cost range for display
 * @param min - Minimum cost
 * @param max - Maximum cost
 * @returns Formatted range string (e.g., "$100 - $200")
 */
export function formatCostRange(min: number, max: number): string {
  return `$${Math.round(min)} - $${Math.round(max)}`;
}

