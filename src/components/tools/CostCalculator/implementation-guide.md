# Enhanced Medicare Cost Calculator - Implementation Guide

## 🚀 Quick Start Implementation

This guide provides step-by-step instructions to build the Enhanced Medicare Cost Calculator in your existing React/TypeScript project.

---

## 📋 Prerequisites

### Required Dependencies
```bash
# Install core dependencies
npm install framer-motion lucide-react
npm install @radix-ui/react-dialog @radix-ui/react-progress
npm install react-hook-form @hookform/resolvers zod

# Install dev dependencies (if not already installed)
npm install --save-dev @types/react @types/react-dom
```

### Project Structure Check
Ensure your project has:
```
src/
├── components/
│   ├── ui/           # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── progress.tsx
│   │   └── separator.tsx
│   └── tools/        # Tools directory (create if needed)
└── lib/
    └── utils.ts     # Utility functions
```

---

## 🏗️ Step 1: Create Component Structure

### Create Directory Structure
```bash
# Create the calculator directory
mkdir -p src/components/tools/CostCalculator/hooks
mkdir -p src/components/tools/CostCalculator/ui
mkdir -p src/components/tools/CostCalculator/__tests__

# Create all component files
touch src/components/tools/CostCalculator/CostCalculator.tsx
touch src/components/tools/CostCalculator/CostCalculatorForm.tsx
touch src/components/tools/CostCalculator/CostCalculatorResults.tsx
touch src/components/tools/CostCalculator/costCalculator.utils.ts
touch src/components/tools/CostCalculator/costCalculator.types.ts
touch src/components/tools/CostCalculator/costCalculator.validation.ts
touch src/components/tools/CostCalculator/costCalculator.analytics.ts
touch src/components/tools/CostCalculator/hooks/useCostCalculator.ts
touch src/components/tools/CostCalculator/hooks/useFormProgress.ts
touch src/components/tools/CostCalculator/ui/CalculatorLoading.tsx
```

---

## 📝 Step 2: Define TypeScript Types

### Create `costCalculator.types.ts`
```typescript
export interface EnhancedCostCalculatorInput {
  age: number;
  zipCode: string;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  prescriptionCount: number;
  healthConditions: string[];
  doctorVisitFrequency: 'rarely' | 'occasionally' | 'frequently' | 'very-frequently';
  specialistVisitFrequency: 'rarely' | 'occasionally' | 'frequently' | 'very-frequently';
  currentInsurancePremium?: number;
  currentDoctorCopays?: number;
  currentPrescriptionCosts?: number;
}

export interface EnhancedCostEstimate {
  monthlyPremium: { min: number; max: number; average: number };
  partBPremium: number;
  prescriptionCosts: { min: number; max: number };
  copayAccumulation: {
    primaryCare: number;
    specialist: number;
    totalAnnualCopays: number;
  };
  suggestedMedications: Array<{
    name: string;
    genericName: string;
    estimatedMonthlyCost: number;
    condition: string;
    tier: number;
  }>;
  currentVsMedicare: {
    currentAnnualTotal: number;
    medicareAnnualTotal: number;
    savings: number;
  };
  totalMonthly: { min: number; max: number };
  totalAnnual: { min: number; max: number };
  breakdown: Array<{
    category: string;
    amount: number;
    description: string;
  }>;
  recommendations: string[];
}

export type CalculatorStep = 'form' | 'loading' | 'results';

export interface HealthCondition {
  id: string;
  label: string;
  icon: string;
}

export interface VisitFrequency {
  value: 'rarely' | 'occasionally' | 'frequently' | 'very-frequently';
  label: string;
  visits: number;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface CalculatorEvent {
  event: string;
  tool_name: string;
  age?: number;
  health_status?: string;
  prescription_count?: number;
  estimated_monthly_min?: number;
  estimated_monthly_max?: number;
  source?: string;
  estimated_value?: number;
}
```

---

## 🔧 Step 3: Implement Calculation Logic

### Create `costCalculator.utils.ts`
```typescript
import { EnhancedCostCalculatorInput, EnhancedCostEstimate } from './costCalculator.types';

const HEALTH_MULTIPLIERS = {
  excellent: { min: 0, max: 150 },
  good: { min: 50, max: 200 },
  fair: { min: 100, max: 300 },
  poor: { min: 150, max: 400 }
};

const VISIT_FREQUENCIES = {
  rarely: 1,
  occasionally: 4,
  frequently: 8,
  'very-frequently': 15
};

const COPAY_RATES = {
  primaryCare: 30,
  specialist: 60
};

const PART_B_PREMIUM = 174.70;

const HEALTH_CONDITION_MEDICATIONS = {
  diabetes: [
    { name: 'Metformin', genericName: 'metformin', cost: 15, tier: 2, condition: 'Diabetes' },
    { name: 'Insulin', genericName: 'insulin', cost: 85, tier: 3, condition: 'Diabetes' }
  ],
  'high-blood-pressure': [
    { name: 'Lisinopril', genericName: 'lisinopril', cost: 10, tier: 1, condition: 'High Blood Pressure' }
  ],
  'high-cholesterol': [
    { name: 'Atorvastatin', genericName: 'atorvastatin', cost: 25, tier: 2, condition: 'High Cholesterol' }
  ],
  'heart-disease': [
    { name: 'Atorvastatin', genericName: 'atorvastatin', cost: 25, tier: 2, condition: 'Heart Disease' },
    { name: 'Lisinopril', genericName: 'lisinopril', cost: 10, tier: 1, condition: 'Heart Disease' }
  ],
  arthritis: [
    { name: 'Ibuprofen', genericName: 'ibuprofen', cost: 5, tier: 1, condition: 'Arthritis' }
  ],
  'asthma-copd': [
    { name: 'Albuterol', genericName: 'albuterol', cost: 15, tier: 2, condition: 'Asthma/COPD' }
  ],
  'depression-anxiety': [
    { name: 'Sertraline', genericName: 'sertraline', cost: 8, tier: 1, condition: 'Depression/Anxiety' }
  ]
};

export const calculateMedicareCosts = (input: EnhancedCostCalculatorInput): EnhancedCostEstimate => {
  // Base premium calculation
  const healthMultiplier = HEALTH_MULTIPLIERS[input.healthStatus];
  const basePremium = healthMultiplier.min + Math.random() * (healthMultiplier.max - healthMultiplier.min);

  // Part B premium (fixed)
  const partBPremium = PART_B_PREMIUM;

  // Prescription cost calculation
  const prescriptionCostPerDrug = 45;
  const prescriptionRange = {
    min: input.prescriptionCount * 20,
    max: input.prescriptionCount * 80
  };

  // Doctor copay accumulation
  const primaryVisits = VISIT_FREQUENCIES[input.doctorVisitFrequency];
  const specialistVisits = VISIT_FREQUENCIES[input.specialistVisitFrequency];

  const primaryCopays = primaryVisits * COPAY_RATES.primaryCare;
  const specialistCopays = specialistVisits * COPAY_RATES.specialist;
  const totalAnnualCopays = primaryCopays + specialistCopays;

  // Suggested medications based on health conditions
  const suggestedMedications: EnhancedCostEstimate['suggestedMedications'] = [];

  input.healthConditions.forEach(condition => {
    const medications = HEALTH_CONDITION_MEDICATIONS[condition as keyof typeof HEALTH_CONDITION_MEDICATIONS];
    if (medications) {
      const numToAdd = Math.min(2, medications.length);
      const selectedMeds = medications.slice(0, numToAdd);
      suggestedMedications.push(...selectedMeds);
    }
  });

  // Remove duplicates
  const uniqueMedications = suggestedMedications.filter((med, index, self) =>
    index === self.findIndex(m => m.name === med.name)
  );

  // Calculate prescription costs including suggested medications
  const suggestedMedsCost = uniqueMedications.reduce((sum, med) => sum + med.estimatedMonthlyCost, 0);
  const totalPrescriptionCost = {
    min: prescriptionRange.min + suggestedMedsCost,
    max: prescriptionRange.max + suggestedMedsCost
  };

  // Total monthly calculation
  const totalMonthly = {
    min: Math.round(basePremium + partBPremium + totalPrescriptionCost.min / 12),
    max: Math.round((basePremium + partBPremium + totalPrescriptionCost.max / 12) * 1.2),
    average: Math.round((basePremium + partBPremium + (totalPrescriptionCost.min + totalPrescriptionCost.max) / 24) * 1.1)
  };

  // Total annual
  const totalAnnual = {
    min: totalMonthly.min * 12,
    max: totalMonthly.max * 12
  };

  // Cost breakdown
  const breakdown = [
    {
      category: 'Medicare Part B',
      amount: partBPremium,
      description: 'Monthly premium for medical coverage'
    },
    {
      category: 'Plan Premium',
      amount: Math.round(basePremium),
      description: 'Monthly premium for Medicare Advantage plan'
    },
    {
      category: 'Prescriptions',
      amount: Math.round(totalPrescriptionCost.min / 12),
      description: 'Estimated monthly prescription costs'
    },
    {
      category: 'Doctor Copays',
      amount: Math.round(totalAnnualCopays / 12),
      description: 'Monthly copays for doctor visits'
    }
  ];

  // Current vs Medicare comparison
  const currentMonthly = (input.currentInsurancePremium || 0) +
                        (input.currentDoctorCopays || 0) +
                        (input.currentPrescriptionCosts || 0);

  const currentAnnual = currentMonthly * 12;
  const medicareAnnual = totalMonthly.average * 12;
  const savings = currentAnnual - medicareAnnual;

  // Personalized recommendations
  const recommendations = generateRecommendations(input, totalMonthly);

  return {
    monthlyPremium: {
      min: Math.round(basePremium),
      max: Math.round(basePremium * 1.5),
      average: Math.round(basePremium * 1.25)
    },
    partBPremium,
    prescriptionCosts: totalPrescriptionCost,
    copayAccumulation: {
      primaryCare: primaryCopays,
      specialist: specialistCopays,
      totalAnnualCopays
    },
    suggestedMedications: uniqueMedications,
    currentVsMedicare: {
      currentAnnualTotal: currentAnnual,
      medicareAnnualTotal: medicareAnnual,
      savings
    },
    totalMonthly,
    totalAnnual,
    breakdown,
    recommendations
  };
};

const generateRecommendations = (input: EnhancedCostCalculatorInput, costs: any): string[] => {
  const recommendations = [];

  if (input.healthConditions.length > 0) {
    recommendations.push('Medicare Advantage plan for comprehensive coverage including dental/vision');
  } else {
    recommendations.push('Consider Medicare Advantage for additional benefits at similar cost');
  }

  if (input.prescriptionCount > 3) {
    recommendations.push('Part D plan with comprehensive formulary covering your medications');
  }

  if (input.doctorVisitFrequency === 'very-frequently' || input.specialistVisitFrequency === 'very-frequently') {
    recommendations.push('Zero copay doctor visits to reduce out-of-pocket costs');
  }

  if (input.currentInsurancePremium && input.currentInsurancePremium > costs.average) {
    recommendations.push(`Potential monthly savings of $${(input.currentInsurancePremium - costs.average)}`);
  }

  return recommendations;
};

export const validateZipCode = (zipCode: string): boolean => {
  const zip = parseInt(zipCode);
  return (
    (zip >= 11500 && zip <= 11599) || // Nassau
    (zip >= 11700 && zip <= 11799) || // Suffolk
    (zip >= 11900 && zip <= 11999)    // Suffolk
  );
};

export const getCountyFromZip = (zipCode: string): string => {
  const zip = parseInt(zipCode);
  if (zip >= 11500 && zip <= 11599) return 'Nassau';
  if (zip >= 11700 && zip <= 11999) return 'Suffolk';
  return 'Long Island';
};
```

---

## ✅ Step 4: Implement Validation Logic

### Create `costCalculator.validation.ts`
```typescript
import { z } from 'zod';

export const costCalculatorSchema = z.object({
  age: z.number()
    .min(55, 'Must be at least 55 years old')
    .max(100, 'Must be 100 or younger'),

  zipCode: z.string()
    .length(5, 'ZIP code must be 5 digits')
    .regex(/^\d{5}$/, 'ZIP code must contain only numbers')
    .refine(validateNassauSuffolkZip, 'We currently serve Nassau and Suffolk counties only'),

  healthStatus: z.enum(['excellent', 'good', 'fair', 'poor'], {
    required_error: 'Please select your health status'
  }),

  prescriptionCount: z.number()
    .min(0, 'Cannot be negative')
    .max(50, 'Please enter a realistic number')
    .default(0),

  healthConditions: z.array(z.string())
    .default([]),

  doctorVisitFrequency: z.enum(['rarely', 'occasionally', 'frequently', 'very-frequently'], {
    required_error: 'Please select doctor visit frequency'
  }),

  specialistVisitFrequency: z.enum(['rarely', 'occasionally', 'frequently', 'very-frequently'], {
    required_error: 'Please select specialist visit frequency'
  }),

  currentInsurancePremium: z.number().optional(),
  currentDoctorCopays: z.number().optional(),
  currentPrescriptionCosts: z.number().optional()
});

export const leadFormSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),

  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),

  phone: z.string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),

  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters')
});

const validateNassauSuffolkZip = (zipCode: string): boolean => {
  const zip = parseInt(zipCode);
  return (
    (zip >= 11500 && zip <= 11599) || // Nassau
    (zip >= 11700 && zip <= 11799) || // Suffolk
    (zip >= 11900 && zip <= 11999)    // Suffolk
  );
};

export const getZipCodeValidationMessage = (zipCode: string): string => {
  if (!zipCode) return '';
  if (zipCode.length !== 5) return 'ZIP code must be 5 digits';
  if (!/^\d{5}$/.test(zipCode)) return 'ZIP code must contain only numbers';
  if (!validateNassauSuffolkZip(zipCode)) return 'We currently serve Nassau and Suffolk counties only';
  return '✓ Valid Nassau/Suffolk County ZIP';
};

export const getAgeValidationMessage = (age: number): string => {
  if (!age) return '';
  if (age < 55) return 'Must be at least 55 years old for Medicare';
  if (age > 100) return 'Please enter a realistic age';
  return '✓ Valid age for Medicare';
};

export const getPrescriptionValidationMessage = (count: number): string => {
  if (count < 0) return 'Cannot be negative';
  if (count > 50) return 'Please enter a realistic number of medications';
  return '✓ Valid prescription count';
};

export const isFormStepComplete = (step: number, data: any): boolean => {
  switch (step) {
    case 1:
      return !!(data.age && data.age >= 55 && data.age <= 100);
    case 2:
      return !!(data.zipCode && validateNassauSuffolkZip(data.zipCode));
    case 3:
      return !!(data.healthStatus && data.healthConditions);
    case 4:
      return !!(
        data.doctorVisitFrequency &&
        data.specialistVisitFrequency &&
        data.prescriptionCount !== undefined
      );
    default:
      return false;
  }
};
```

---

## 📊 Step 5: Create Analytics Tracking

### Create `costCalculator.analytics.ts`
```typescript
import { CalculatorEvent } from './costCalculator.types';

export const trackCalculatorStart = (): void => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'calculator_started', {
      tool_name: 'cost_calculator'
    } as CalculatorEvent);
  }
};

export const trackCalculatorProgress = (step: number, data: any): void => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'calculator_step_completed', {
      tool_name: 'cost_calculator',
      step: step,
      ...data
    } as CalculatorEvent);
  }
};

export const trackCalculatorCompletion = (results: any, formData: any): void => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'calculator_completed', {
      tool_name: 'cost_calculator',
      age: formData.age,
      health_status: formData.healthStatus,
      prescription_count: formData.prescriptionCount,
      estimated_monthly_min: results.totalMonthly.min,
      estimated_monthly_max: results.totalMonthly.max
    } as CalculatorEvent);
  }
};

export const trackLeadCapture = (value: number): void => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'lead_captured', {
      source: 'cost_calculator',
      estimated_value: value
    } as CalculatorEvent);
  }
};

export const trackCalculatorReset = (): void => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'calculator_reset', {
      tool_name: 'cost_calculator'
    } as CalculatorEvent);
  }
};
```

---

## 🎣 Step 6: Implement Custom Hooks

### Create `hooks/useCostCalculator.ts`
```typescript
import { useState, useCallback } from 'react';
import { EnhancedCostCalculatorInput, EnhancedCostEstimate } from '../costCalculator.types';
import { calculateMedicareCosts } from '../costCalculator.utils';
import { trackCalculatorStart, trackCalculatorCompletion } from '../costCalculator.analytics';

export const useCostCalculator = () => {
  const [results, setResults] = useState<EnhancedCostEstimate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateCosts = useCallback(async (input: EnhancedCostCalculatorInput): Promise<EnhancedCostEstimate> => {
    const startTime = Date.now();

    try {
      setIsLoading(true);
      setError(null);

      trackCalculatorStart();

      // Simulate API delay for UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      const calculationResults = calculateMedicareCosts(input);

      trackCalculatorCompletion(calculationResults, input);

      setResults(calculationResults);
      return calculationResults;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Calculation failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResults(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    calculateCosts,
    results,
    isLoading,
    error,
    reset
  };
};
```

### Create `hooks/useFormProgress.ts`
```typescript
import { useState, useCallback } from 'react';
import { EnhancedCostCalculatorInput } from '../costCalculator.types';
import { isFormStepComplete } from '../costCalculator.validation';

export const useFormProgress = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const totalSteps = 4;

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const canProceedToStep = useCallback((step: number, formData: Partial<EnhancedCostCalculatorInput>) => {
    for (let i = 1; i < step; i++) {
      if (!isFormStepComplete(i, formData)) {
        return false;
      }
    }
    return true;
  }, []);

  const getProgressPercentage = useCallback(() => {
    return Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);
  }, [currentStep, totalSteps]);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setCompletedSteps(new Set());
  }, []);

  return {
    currentStep,
    totalSteps,
    completedSteps,
    nextStep,
    prevStep,
    canProceedToStep,
    getProgressPercentage,
    reset
  };
};
```

---

## 🎨 Step 7: Create UI Components

### Create `ui/CalculatorLoading.tsx`
```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Loader2 } from 'lucide-react';

export const CalculatorLoading: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[400px] space-y-8"
    >
      <div className="relative">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
          <Calculator className="w-12 h-12 text-blue-600" />
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Loader2 className="w-24 h-24 text-blue-500" />
        </motion.div>
      </div>

      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">
          Calculating Your Medicare Costs
        </h3>
        <p className="text-gray-600 max-w-md">
          Analyzing your health profile, location, and prescription needs to provide accurate Medicare estimates...
        </p>

        <div className="w-full max-w-sm mx-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="bg-blue-600 h-full rounded-full"
            />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center"
      >
        <div className="text-sm text-gray-500 space-y-1">
          <div>✓ Analyzing health conditions</div>
          <div>✓ Calculating prescription costs</div>
          <div>✓ Estimating doctor visit copays</div>
          <div>✓ Comparing with current coverage</div>
        </div>
      </motion.div>
    </motion.div>
  );
};
```

---

## 🏗️ Step 8: Build Main Components

### Create `CostCalculatorForm.tsx`
```tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Calculator, Heart, MapPin, Pill, Stethoscope, Users } from 'lucide-react';
import { EnhancedCostCalculatorInput } from './costCalculator.types';
import { costCalculatorSchema, getZipCodeValidationMessage, getAgeValidationMessage, getPrescriptionValidationMessage, isFormStepComplete } from './costCalculator.validation';
import { useFormProgress } from './hooks/useFormProgress';
import { trackCalculatorProgress } from './costCalculator.analytics';

const HEALTH_CONDITIONS = [
  { id: 'diabetes', label: 'Diabetes', icon: '🩸' },
  { id: 'high-blood-pressure', label: 'High Blood Pressure', icon: '🫀' },
  { id: 'high-cholesterol', label: 'High Cholesterol', icon: '🩸' },
  { id: 'heart-disease', label: 'Heart Disease', icon: '❤️' },
  { id: 'arthritis', label: 'Arthritis', icon: '🦴' },
  { id: 'asthma-copd', label: 'Asthma/COPD', icon: '🫁' },
  { id: 'depression-anxiety', label: 'Depression/Anxiety', icon: '🧠' },
];

const VISIT_FREQUENCIES = [
  { value: 'rarely', label: 'Rarely (< 2 times/year)', visits: 1 },
  { value: 'occasionally', label: 'Occasionally (3-5 times/year)', visits: 4 },
  { value: 'frequently', label: 'Frequently (6-10 times/year)', visits: 8 },
  { value: 'very-frequently', label: 'Very Frequently (10+ times/year)', visits: 15 },
];

type FormData = EnhancedCostCalculatorInput;

interface CostCalculatorFormProps {
  onSubmit: (data: EnhancedCostCalculatorInput) => void;
}

export const CostCalculatorForm: React.FC<CostCalculatorFormProps> = ({ onSubmit }) => {
  const { currentStep, totalSteps, nextStep, prevStep, getProgressPercentage } = useFormProgress();
  const [zipCodeMessage, setZipCodeMessage] = useState('');

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(costCalculatorSchema),
    defaultValues: {
      healthConditions: [],
    }
  });

  const watchedZipCode = watch('zipCode');
  const watchedAge = watch('age');
  const watchedPrescriptionCount = watch('prescriptionCount');
  const watchedHealthConditions = watch('healthConditions');

  // Update validation messages
  React.useEffect(() => {
    if (watchedZipCode) {
      setZipCodeMessage(getZipCodeValidationMessage(watchedZipCode));
    }
  }, [watchedZipCode]);

  const onSubmitForm = (data: FormData) => {
    trackCalculatorProgress(currentStep, data);
    onSubmit(data);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">How old are you?</CardTitle>
              <CardDescription>We'll personalize your Medicare estimate based on your age.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="55"
                  max="100"
                  placeholder="65"
                  {...register('age', { valueAsNumber: true })}
                  className="text-center text-xl"
                />
                <div className="text-center text-sm">
                  {watchedAge ? getAgeValidationMessage(watchedAge) :
                   'Must be 55 or older for Medicare eligibility'}
                </div>
                {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                <Button
                  onClick={nextStep}
                  className="w-full"
                  disabled={!watchedAge || watchedAge < 55 || watchedAge > 100}
                >
                  Continue →
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">What's your ZIP code?</CardTitle>
              <CardDescription>We focus on Nassau and Suffolk counties in Long Island.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  placeholder="11554"
                  {...register('zipCode')}
                  className="text-center text-xl"
                  maxLength={5}
                />
                <div className={`text-center text-sm ${zipCodeMessage.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                  {zipCodeMessage || 'Enter your 5-digit ZIP code'}
                </div>
                {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
                <Button
                  onClick={nextStep}
                  className="w-full"
                  disabled={!zipCodeMessage.includes('✓')}
                >
                  Continue →
                </Button>
                <Button variant="outline" onClick={prevStep} className="w-full">
                  ← Back
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Tell us about your health</CardTitle>
              <CardDescription>This helps us suggest relevant medications and estimate costs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Overall Health Status</Label>
                  <Select onValueChange={(value) => setValue('healthStatus', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your health status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent - No health issues</SelectItem>
                      <SelectItem value="good">Good - Routine checkups only</SelectItem>
                      <SelectItem value="fair">Fair - Manage 1-2 chronic conditions</SelectItem>
                      <SelectItem value="poor">Poor - Multiple health challenges</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.healthStatus && <p className="text-red-500 text-sm">{errors.healthStatus.message}</p>}
                </div>

                <div>
                  <Label className="text-base font-medium">Health Conditions (check all that apply)</Label>
                  <div className="grid grid-cols-1 gap-3 mt-3">
                    {HEALTH_CONDITIONS.map((condition) => (
                      <div key={condition.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition.id}
                          checked={watchedHealthConditions?.includes(condition.id)}
                          onCheckedChange={(checked) => {
                            const current = watchedHealthConditions || [];
                            if (checked) {
                              setValue('healthConditions', [...current, condition.id]);
                            } else {
                              setValue('healthConditions', current.filter(c => c !== condition.id));
                            }
                          }}
                        />
                        <Label htmlFor={condition.id} className="text-sm">
                          {condition.icon} {condition.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep} className="flex-1">
                    ← Back
                  </Button>
                  <Button onClick={nextStep} className="flex-1" disabled={!watch('healthStatus')}>
                    Continue →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Doctor visits & medications</CardTitle>
              <CardDescription>Help us understand your healthcare usage patterns.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">How often do you see your primary doctor?</Label>
                  <Select onValueChange={(value) => setValue('doctorVisitFrequency', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {VISIT_FREQUENCIES.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">How often do you see specialists?</Label>
                  <Select onValueChange={(value) => setValue('specialistVisitFrequency', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {VISIT_FREQUENCIES.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="prescriptionCount" className="text-base font-medium">
                    Number of prescription medications
                  </Label>
                  <Input
                    id="prescriptionCount"
                    type="number"
                    min="0"
                    max="50"
                    placeholder="3"
                    {...register('prescriptionCount', { valueAsNumber: true })}
                  />
                  <div className="text-center text-sm mt-1">
                    {watchedPrescriptionCount !== undefined ? getPrescriptionValidationMessage(watchedPrescriptionCount) :
                     'Monthly medications you take regularly'}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <Label className="text-sm font-medium text-gray-700">Optional: Current healthcare costs</Label>
                  <p className="text-xs text-gray-500 mb-3">Help us show you potential savings</p>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <Label htmlFor="currentPremium" className="text-sm">Monthly insurance premium</Label>
                      <Input
                        id="currentPremium"
                        type="number"
                        placeholder="450"
                        {...register('currentInsurancePremium', { valueAsNumber: true })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="currentCopays" className="text-sm">Monthly doctor copays</Label>
                      <Input
                        id="currentCopays"
                        type="number"
                        placeholder="150"
                        {...register('currentDoctorCopays', { valueAsNumber: true })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="currentPrescriptions" className="text-sm">Monthly prescription costs</Label>
                      <Input
                        id="currentPrescriptions"
                        type="number"
                        placeholder="200"
                        {...register('currentPrescriptionCosts', { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSubmit(onSubmitForm)} className="w-full text-lg py-6">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate My Costs
                </Button>

                <Button variant="outline" onClick={prevStep} className="w-full">
                  ← Back
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="max-w-md mx-auto">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{getProgressPercentage()}% Complete</span>
        </div>
        <Progress value={getProgressPercentage()} className="h-2" />
      </div>

      {/* Form Content */}
      {renderStepContent()}

      {/* Trust Indicators */}
      <div className="text-center text-sm text-gray-600 max-w-md mx-auto">
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className="flex items-center gap-1">
            <span className="text-green-500">✓</span> Free
          </span>
          <span className="flex items-center gap-1">
            <span className="text-green-500">✓</span> Personalized
          </span>
          <span className="flex items-center gap-1">
            <span className="text-green-500">✓</span> Instant
          </span>
        </div>
      </div>
    </div>
  );
};
```

---

## 🎉 Step 9: Create Main Container Component

### Create `CostCalculator.tsx`
```tsx
import React, { useState } from 'react';
import { CostCalculatorForm } from './CostCalculatorForm';
import { CostCalculatorResults } from './CostCalculatorResults';
import { CalculatorLoading } from './ui/CalculatorLoading';
import { useCostCalculator } from './hooks/useCostCalculator';
import { EnhancedCostCalculatorInput } from './costCalculator.types';

export const CostCalculator: React.FC = () => {
  const [step, setStep] = useState<'form' | 'loading' | 'results'>('form');
  const [formData, setFormData] = useState<Partial<EnhancedCostCalculatorInput>>({});
  const { calculateCosts, results, isLoading } = useCostCalculator();

  const handleFormSubmit = async (data: EnhancedCostCalculatorInput) => {
    setFormData(data);
    setStep('loading');

    try {
      await calculateCosts(data);
      setStep('results');
    } catch (error) {
      console.error('Calculation error:', error);
      // Handle error - could show error state
      setStep('form');
    }
  };

  const handleReset = () => {
    setStep('form');
    setFormData({});
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Medicare Cost Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get your personalized Medicare cost estimate in 60 seconds.
          See exactly what Medicare will cost based on your unique situation.
        </p>
      </div>

      {step === 'form' && (
        <CostCalculatorForm onSubmit={handleFormSubmit} />
      )}

      {step === 'loading' && (
        <CalculatorLoading />
      )}

      {step === 'results' && results && (
        <CostCalculatorResults
          results={results}
          formData={formData as EnhancedCostCalculatorInput}
          onReset={handleReset}
        />
      )}
    </div>
  );
};
```

---

## 🚀 Step 10: Integrate into Your App

### Add to your page routing:
```typescript
// In your pages or routing configuration
import { CostCalculator } from '@/components/tools/CostCalculator/CostCalculator';

// Add route for /cost-calculator
<CostCalculator />
```

### Add API endpoint for lead capture:
```typescript
// pages/api/contact.ts or app/api/contact/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    firstName,
    lastName,
    phone,
    email,
    source,
    context,
    message
  } = req.body;

  try {
    // Send email notification
    const transporter = nodemailer.createTransporter({
      // Your email configuration
    });

    await transporter.sendMail({
      from: 'YourMedGuy <noreply@yourmedguy.com>',
      to: 'leads@yourmedguy.com',
      subject: `New Lead: ${firstName} ${lastName} - ${source}`,
      html: `
        <h2>New Lead from ${source}</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Estimated Value:</strong> $${context.estimatedMonthlyMin}-${context.estimatedMonthlyMax}/month</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    // Send auto-responder
    await transporter.sendMail({
      from: 'YourMedGuy <noreply@yourmedguy.com>',
      to: email,
      subject: 'Your Medicare Cost Estimate - Next Steps',
      html: `
        <h2>Hi ${firstName},</h2>
        <p>Thanks for using our Medicare Cost Calculator!</p>
        <p>Here's a recap of your personalized estimate:</p>
        <p><strong>💰 Estimated Monthly Cost:</strong> $${context.estimatedMonthlyMin} - $${context.estimatedMonthlyMax}</p>
        <p><strong>📅 Estimated Annual Cost:</strong> $${context.estimatedMonthlyMin * 12} - $${context.estimatedMonthlyMax * 12}</p>
        <p>Based on your age ${context.age} and location.</p>
        <p>Ready to discuss your options? Call us at 347-305-2260 or reply to this email.</p>
      `
    });

    res.status(200).json({ success: true, message: 'Lead captured successfully' });
  } catch (error) {
    console.error('Lead capture error:', error);
    res.status(500).json({ success: false, message: 'Failed to capture lead' });
  }
}
```

---

## ✅ Step 11: Test and Deploy

### Run the development server:
```bash
npm run dev
```

### Test the calculator:
1. Navigate to your calculator page
2. Complete all form steps
3. Verify calculations display correctly
4. Test lead capture form
5. Check email delivery

### Build for production:
```bash
npm run build
npm run preview
```

---

## 🐛 Troubleshooting

### Common Issues:

**Component not rendering:**
- Check that all dependencies are installed
- Verify import paths are correct
- Ensure Shadcn/ui components are properly configured

**Form validation not working:**
- Check that Zod schema is properly imported
- Verify form field names match schema
- Test individual validation functions

**Calculations not working:**
- Check that calculation utilities are imported
- Verify input data structure matches types
- Test calculation functions individually

**Styling issues:**
- Ensure Tailwind CSS is properly configured
- Check that custom color variables are defined
- Verify responsive breakpoints are working

---

## 📈 Performance Optimization

### Bundle Splitting:
```typescript
// In your build configuration
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
```

### Lazy Loading:
```typescript
const CostCalculator = lazy(() => import('@/components/tools/CostCalculator/CostCalculator'));

// In your component
<Suspense fallback={<div>Loading calculator...</div>}>
  <CostCalculator />
</Suspense>
```

### Image Optimization:
- Use WebP format for icons
- Implement lazy loading for images
- Optimize SVG icons

---

## 🔧 Maintenance Tasks

### Monthly Updates:
- Update Medicare premium rates
- Refresh prescription cost estimates
- Verify ZIP code validations

### Quarterly Reviews:
- Check calculation accuracy
- Update medication mappings
- Review user feedback

### Annual Updates:
- Update CMS compliance requirements
- Refresh design system
- Optimize performance

---

**Your Enhanced Medicare Cost Calculator is now ready for implementation!** 🎯💰

This comprehensive implementation guide provides everything needed to build, test, and deploy the calculator in your existing React/TypeScript project. The calculator will drive high-quality leads with its personalized cost estimates and intelligent medication suggestions. 

Ready to start coding? Begin with the TypeScript types and work your way through each component! 🚀
