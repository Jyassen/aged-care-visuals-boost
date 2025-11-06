/**
 * Medicare Cost Calculator Main Component
 * Manages state and flow between form and results
 */

import { useState } from 'react';
import CostCalculatorForm from './CostCalculatorForm';
import CostCalculatorResults from './CostCalculatorResults';
import { calculateMedicareCosts } from './costCalculator.utils';
import { CostCalculatorInput, CostEstimate } from '@/types/medicare.types';

/**
 * Main container component for the Medicare cost calculator
 * Manages the calculation flow and state
 */
export default function CostCalculator() {
  // State for calculated estimate
  const [estimate, setEstimate] = useState<CostEstimate | null>(null);
  
  // State for calculation in progress
  const [isCalculating, setIsCalculating] = useState(false);
  
  // State for user inputs (needed for PDF generation)
  const [calculatorInput, setCalculatorInput] = useState<CostCalculatorInput | null>(null);
  
  /**
   * Handles calculation request from form
   * Simulates processing time and calculates costs
   */
  const handleCalculate = async (input: CostCalculatorInput) => {
    setCalculatorInput(input);
    setIsCalculating(true);
    
    // Simulate API call / processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Calculate the costs
    const result = calculateMedicareCosts(input);
    setEstimate(result);
    setIsCalculating(false);
    
    // Track analytics if Google Analytics is available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cost_calculator_completed', {
        age: input.age,
        health_status: input.healthStatus,
        prescription_count: input.prescriptionCount,
        estimated_monthly_min: result.totalMonthly.min,
        estimated_monthly_max: result.totalMonthly.max,
      });
    }
  };
  
  /**
   * Resets calculator to show form again
   */
  const handleReset = () => {
    setEstimate(null);
    // Also reset any scroll-related UI like mid-page popup
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {!estimate ? (
        <CostCalculatorForm 
          onCalculate={handleCalculate}
        />
      ) : (
        // Key on a changing value so the results component remounts cleanly each time
        <CostCalculatorResults 
          key={`${estimate.totalMonthly.min}-${estimate.totalMonthly.max}`}
          estimate={estimate}
          inputs={calculatorInput}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

