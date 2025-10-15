/**
 * Medicare Cost Calculator Utilities
 * Contains calculation logic, validation, and recommendation generation
 */

import { CostCalculatorInput, CostEstimate, CostBreakdown } from '@/types/medicare.types';

/** 
 * Medicare Part B Standard Premium for 2026
 * Source: CMS Official Announcement (October 2025)
 * Official Rate: $206.50/month (increase from $185.00 in 2025)
 */
export const PART_B_PREMIUM_2026 = 206.50; // Official 2026 rate from CMS

/**
 * Premium ranges based on health status
 * Based on actual 2026 NY Medicare Advantage plan distribution
 * Source: 2026_NY_Plans.md comprehensive directory
 * 
 * REALITY: 80%+ of NY enrollees choose $0-$60 premium plans, even with chronic conditions!
 * Actual plan distribution:
 * - $0 Premium: Healthfirst 65 Plus, Elderplan Flex, VIP Value, True Choice, Gold Plus, AARP, Wellcare (MANY!)
 * - $25-$40: VNS EasyCare ($25), Anthem ($24), Humana ($37)
 * - $50-$80: VIP Gold ($54), Aetna Premier ($81)
 * - $100+: Only specialty/nursing home plans ($150-$223)
 * 
 * Adjusted for REALISTIC averages based on enrollment patterns:
 */
const PREMIUM_RANGES = {
  excellent: { min: 0, max: 25 },   // Mostly $0, some choose EasyCare → avg $12.50
  good: { min: 0, max: 40 },        // Mix of $0 and low premium → avg $20
  fair: { min: 0, max: 60 },        // Some choose VIP Gold for benefits → avg $30
  poor: { min: 25, max: 80 },       // Enhanced benefits, avoid $0 plans → avg $52.50
} as const;

/**
 * Doctor visit frequency and costs by health status
 * Based on actual 2026 NY Medicare Advantage plan copays
 * Source: 2026_NY_Plans.md - typical copays across major carriers
 * 
 * NY 2026 Plan Copays (actual):
 * - Primary Care: $0 (most plans), up to $10-20
 * - Specialist: $0-$25 (most plans), up to $35-50
 * - Many $0 premium plans have $0 copays
 */
const DOCTOR_VISIT_COSTS = {
  excellent: {
    primaryCareVisits: 1,
    specialistVisits: 0,
    primaryCareCopay: 0,      // Many $0 premium plans have $0 PCP copay
    specialistCopay: 25,      // Typical NY specialist copay
    description: 'Once a year visit only'
  },
  good: {
    primaryCareVisits: 3,
    specialistVisits: 0,
    primaryCareCopay: 0,      // $0 copay common on HMO plans
    specialistCopay: 30,
    description: '2-3 routine checkups per year'
  },
  fair: {
    primaryCareVisits: 4,
    specialistVisits: 6,      // 1-2 specialists x 3-4 visits each
    primaryCareCopay: 15,     // Unified average copay for clarity
    specialistCopay: 40,      // Unified average copay for clarity
    description: 'Seasonal visits, 1-2 specialists'
  },
  poor: {
    primaryCareVisits: 6,
    specialistVisits: 12,     // 3+ specialists x 4 visits each
    primaryCareCopay: 15,     // Higher copays on some plans
    specialistCopay: 40,      // Up to $50 on some plans
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
  // More accurate range based on typical Medicare Part D copays
  // Assumes mix of generic (Tier 1-2) and some preferred brand (Tier 3)
  // Low estimate: mostly generics at $5-10 copay
  // High estimate: mix with some brands at $45-60 copay
  const prescriptionRange = {
    min: prescriptionCount * 8,   // Mostly generic drugs (Tier 1-2)
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
      amount: PART_B_PREMIUM_2026,
      description: 'Standard Medicare Part B premium (2026)',
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
    partBPremium: PART_B_PREMIUM_2026,
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
      'A Medicare Supplement (Medigap) plan might provide better coverage for your healthcare needs with more predictable costs'
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
      'With your good health, a zero-premium Medicare Advantage plan could be a cost-effective option'
    );
  }
  
  // Always include consultation CTA
  recommendations.push(
    'Schedule a free consultation to explore all plan options available in your area and find the best fit for YOUR specific needs'
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

