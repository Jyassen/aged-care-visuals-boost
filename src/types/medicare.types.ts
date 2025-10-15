/**
 * TypeScript type definitions for Medicare Cost Calculator
 * These interfaces define the data structures used throughout the calculator tool
 */

/**
 * Input data for the Medicare cost calculator
 * Collected from user via the calculator form
 */
export interface CostCalculatorInput {
  /** User's age (must be between 55 and 100) */
  age: number;
  
  /** 5-digit ZIP code (validated for Nassau/Suffolk County) */
  zipCode: string;
  
  /** Overall health status affecting premium estimates */
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  
  /** Number of regular prescription medications (0-50) */
  prescriptionCount: number;
  
  /** Optional: Current Medicare plan type for comparison */
  currentMedicare?: string;
}

/**
 * Cost estimate results from the calculator
 * Contains all calculated costs and personalized recommendations
 */
export interface CostEstimate {
  /** Medicare Advantage or Supplement plan premium range */
  monthlyPremium: {
    min: number;
    max: number;
    average: number;
  };
  
  /** Medicare Part B premium (standard rate) */
  partBPremium: number;
  
  /** Estimated prescription drug costs */
  prescriptionCosts: {
    min: number;
    max: number;
  };
  
  /** Total monthly cost range */
  totalMonthly: {
    min: number;
    max: number;
  };
  
  /** Total annual cost range */
  totalAnnual: {
    min: number;
    max: number;
  };
  
  /** Detailed breakdown of cost categories */
  breakdown: CostBreakdown[];
  
  /** Personalized recommendations based on user input */
  recommendations: string[];
}

/**
 * Individual cost category breakdown
 * Used to show itemized costs to the user
 */
export interface CostBreakdown {
  /** Cost category name (e.g., "Medicare Part B Premium") */
  category: string;
  
  /** Monthly cost amount in dollars */
  amount: number;
  
  /** Human-readable description of this cost */
  description: string;
}

