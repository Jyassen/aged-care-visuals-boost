# Enhanced Medicare Cost Calculator - Complete Component Prompt

## 🎯 COMPONENT OVERVIEW

Create a comprehensive **Enhanced Medicare Cost Calculator** React component with the following specifications:

**Tech Stack:** React + TypeScript + Tailwind CSS + Shadcn/ui + Framer Motion
**Purpose:** Hyper-personalized Medicare cost estimation with health condition integration
**Target:** Generate 35-45% lead capture rate through value demonstration

---

## 📋 REQUIRED COMPONENTS

### 1. Main Container: `CostCalculator.tsx`

```tsx
import React, { useState } from 'react';
import { CostCalculatorForm } from './CostCalculatorForm';
import { CostCalculatorResults } from './CostCalculatorResults';
import { useCostCalculator } from './hooks/useCostCalculator';

export const CostCalculator: React.FC = () => {
  const [step, setStep] = useState<'form' | 'loading' | 'results'>('form');
  const [formData, setFormData] = useState<Partial<EnhancedCostCalculatorInput>>({});
  const { calculateCosts, results, isLoading } = useCostCalculator();

  const handleFormSubmit = async (data: EnhancedCostCalculatorInput) => {
    setFormData(data);
    setStep('loading');

    // Simulate calculation delay for UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const calculationResults = calculateCosts(data);
    setStep('results');
  };

  const handleReset = () => {
    setStep('form');
    setFormData({});
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {step === 'form' && (
        <CostCalculatorForm onSubmit={handleFormSubmit} />
      )}

      {step === 'loading' && (
        <CalculatorLoading />
      )}

      {step === 'results' && (
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

### 2. Form Component: `CostCalculatorForm.tsx`

```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Calculator, Heart, MapPin, Pill, Stethoscope, Users } from 'lucide-react';

const formSchema = z.object({
  age: z.number().min(55).max(100),
  zipCode: z.string().regex(/^\d{5}$/, 'Must be 5 digits'),
  healthStatus: z.enum(['excellent', 'good', 'fair', 'poor']),
  prescriptionCount: z.number().min(0).max(50),
  healthConditions: z.array(z.string()),
  doctorVisitFrequency: z.enum(['rarely', 'occasionally', 'frequently', 'very-frequently']),
  specialistVisitFrequency: z.enum(['rarely', 'occasionally', 'frequently', 'very-frequently']),
  currentInsurancePremium: z.number().optional(),
  currentDoctorCopays: z.number().optional(),
  currentPrescriptionCosts: z.number().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface CostCalculatorFormProps {
  onSubmit: (data: EnhancedCostCalculatorInput) => void;
}

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

export const CostCalculatorForm: React.FC<CostCalculatorFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      healthConditions: [],
    }
  });

  const watchedZipCode = watch('zipCode');
  const watchedHealthConditions = watch('healthConditions');

  // ZIP Code validation for Nassau/Suffolk
  const isValidZip = watchedZipCode && (
    (watchedZipCode >= '11500' && watchedZipCode <= '11599') || // Nassau
    (watchedZipCode >= '11700' && watchedZipCode <= '11799') || // Suffolk
    (watchedZipCode >= '11900' && watchedZipCode <= '11999')    // Suffolk
  );

  const onSubmitForm = (data: FormData) => {
    onSubmit(data as EnhancedCostCalculatorInput);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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
                {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                <Button onClick={nextStep} className="w-full" disabled={!watch('age')}>
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
                {watchedZipCode && (
                  <div className={`text-center text-sm ${isValidZip ? 'text-green-600' : 'text-red-600'}`}>
                    {isValidZip ? '✓ Valid Nassau/Suffolk County ZIP' : '❌ We currently serve Nassau and Suffolk counties only'}
                  </div>
                )}
                {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
                <Button onClick={nextStep} className="w-full" disabled={!isValidZip}>
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
                  <p className="text-sm text-gray-600 mt-1">Monthly medications you take regularly</p>
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
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
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

### 3. Results Component: `CostCalculatorResults.tsx`

```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Calculator,
  Calendar,
  Heart,
  Pill,
  Stethoscope,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Phone,
  Mail,
  CheckCircle
} from 'lucide-react';
import { EnhancedCostEstimate, EnhancedCostCalculatorInput } from './costCalculator.types';

interface CostCalculatorResultsProps {
  results: EnhancedCostEstimate;
  formData: EnhancedCostCalculatorInput;
  onReset: () => void;
}

export const CostCalculatorResults: React.FC<CostCalculatorResultsProps> = ({
  results,
  formData,
  onReset
}) => {
  const [showLeadForm, setShowLeadForm] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCountyName = (zipCode: string) => {
    const zip = parseInt(zipCode);
    if (zip >= 11500 && zip <= 11599) return 'Nassau';
    if (zip >= 11700 && zip <= 11999) return 'Suffolk';
    return 'Long Island';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Results Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-blue-900">
            Your Personalized Medicare Estimate
          </CardTitle>
          <CardDescription className="text-lg">
            Based on your age, location, and health profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Primary Cost Display */}
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {formatCurrency(results.totalMonthly.min)} - {formatCurrency(results.totalMonthly.max)}
            </div>
            <div className="text-xl text-gray-600 mb-1">per month</div>
            <div className="text-lg text-gray-500">
              <Calendar className="w-4 h-4 inline mr-1" />
              {formatCurrency(results.totalAnnual.min)} - {formatCurrency(results.totalAnnual.max)} per year
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{formData.age}</div>
              <div className="text-sm text-gray-600">Your Age</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{getCountyName(formData.zipCode)}</div>
              <div className="text-sm text-gray-600">County</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{formData.prescriptionCount}</div>
              <div className="text-sm text-gray-600">Medications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 capitalize">{formData.healthStatus}</div>
              <div className="text-sm text-gray-600">Health Status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medication Suggestions */}
      {results.suggestedMedications.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-blue-600" />
              <CardTitle>Medications You May Need</CardTitle>
            </div>
            <CardDescription>
              Based on your health conditions, here are common medications you might take
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.suggestedMedications.map((med, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{med.name}</div>
                    <div className="text-sm text-gray-600">{med.genericName} • {med.condition}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(med.estimatedMonthlyCost)}/mo</div>
                    <Badge variant="outline" className="text-xs">Tier {med.tier}</Badge>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center font-bold">
                <span>Total estimated medications:</span>
                <span>{formatCurrency(results.suggestedMedications.reduce((sum, med) => sum + med.estimatedMonthlyCost, 0))}/mo</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Doctor Copays */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            <CardTitle>Your Annual Doctor Copays</CardTitle>
          </div>
          <CardDescription>
            Estimated based on your visit frequency patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Primary Care Visits</span>
              <span className="font-bold">{formatCurrency(results.copayAccumulation.primaryCare)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Specialist Visits</span>
              <span className="font-bold">{formatCurrency(results.copayAccumulation.specialist)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total Annual Copays</span>
              <span>{formatCurrency(results.copayAccumulation.totalAnnualCopays)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <CardTitle>Complete Cost Breakdown</CardTitle>
          </div>
          <CardDescription>Your estimated monthly Medicare costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.breakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{item.category}</span>
                <div className="text-right">
                  <div className="font-bold">{formatCurrency(item.amount)}</div>
                  {item.description && (
                    <div className="text-xs text-gray-500">{item.description}</div>
                  )}
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total Monthly</span>
              <span>{formatCurrency(results.totalMonthly.min)} - {formatCurrency(results.totalMonthly.max)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Cost Comparison */}
      {formData.currentInsurancePremium && (
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-green-600" />
              <CardTitle className="text-green-900">Compare to Current Costs</CardTitle>
            </div>
            <CardDescription>Potential savings with Medicare</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Your current monthly costs</span>
                <span className="font-bold">{formatCurrency(results.currentVsMedicare.currentAnnualTotal / 12)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Medicare range (monthly)</span>
                <span className="font-bold">{formatCurrency(results.totalMonthly.min)} - {formatCurrency(results.totalMonthly.max)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-bold text-lg text-green-700">
                <span>Potential annual savings</span>
                <span>{results.currentVsMedicare.savings > 0 ? '-' : '+'}{formatCurrency(Math.abs(results.currentVsMedicare.savings))}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personalized Recommendations */}
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-orange-600" />
            <CardTitle className="text-orange-900">Your Personalized Plan</CardTitle>
          </div>
          <CardDescription>Recommended Medicare options based on your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{rec}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lead Capture CTA */}
      <Card className="border-2 border-blue-300 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready for Your Perfect Medicare Plan?
          </h3>
          <p className="text-blue-100 mb-6">
            Get a free consultation to discuss your results and find the best plan for YOUR health needs.
          </p>

          <Dialog open={showLeadForm} onOpenChange={setShowLeadForm}>
            <DialogTrigger asChild>
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Meet Your MedGuy →
              </Button>
            </DialogTrigger>
            <LeadCaptureForm
              results={results}
              formData={formData}
              onClose={() => setShowLeadForm(false)}
            />
          </Dialog>

          <p className="text-blue-200 text-sm mt-4">
            ✓ Free consultation • ✓ Personalized recommendations • ✓ No pressure
          </p>
        </CardContent>
      </Card>

      {/* Reset Option */}
      <div className="text-center">
        <Button variant="outline" onClick={onReset} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Calculate Different Scenario
        </Button>
      </div>
    </motion.div>
  );
};

// Lead Capture Form Component
interface LeadCaptureFormProps {
  results: EnhancedCostEstimate;
  formData: EnhancedCostCalculatorInput;
  onClose: () => void;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ results, formData, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'cost-calculator',
          context: {
            age: formData.age,
            zipCode: formData.zipCode,
            healthStatus: formData.healthStatus,
            prescriptionCount: formData.prescriptionCount,
            estimatedMonthlyMin: results.totalMonthly.min,
            estimatedMonthlyMax: results.totalMonthly.max
          },
          message: 'Lead from Medicare Cost Calculator'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        // Trigger analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'lead_captured', {
            source: 'cost_calculator',
            estimated_value: results.totalMonthly.average
          });
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <DialogTitle className="text-xl">Thank You!</DialogTitle>
          <DialogDescription>
            We'll be in touch within 24 hours with your personalized Medicare consultation.
            Check your email for a detailed summary of your results.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Get Your Free Medicare Consultation</DialogTitle>
        <DialogDescription>
          Share your contact information and we'll provide personalized Medicare guidance based on your calculator results.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              required
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              required
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Get My Free Consultation'}
        </Button>
      </form>
    </DialogContent>
  );
};
```

### 4. Calculation Logic: `costCalculator.utils.ts`

```typescript
import { EnhancedCostCalculatorInput, EnhancedCostEstimate } from './costCalculator.types';

// Health status premium multipliers
const HEALTH_MULTIPLIERS = {
  excellent: { min: 0, max: 150 },
  good: { min: 50, max: 200 },
  fair: { min: 100, max: 300 },
  poor: { min: 150, max: 400 }
};

// Visit frequency mappings
const VISIT_FREQUENCIES = {
  rarely: 1,      // <2 visits/year
  occasionally: 4, // 3-5 visits/year
  frequently: 8,   // 6-10 visits/year
  'very-frequently': 15 // 10+ visits/year
};

// Copay rates
const COPAY_RATES = {
  primaryCare: 30,    // $30 per visit
  specialist: 60      // $60 per visit
};

// Prescription cost estimates by tier
const PRESCRIPTION_COSTS = {
  1: 10,  // Generic
  2: 25,  // Preferred brand
  3: 85   // Non-preferred/specialty
};

// Medicare Part B premium (2024)
const PART_B_PREMIUM = 174.70;

// Health condition to medication mapping
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
  const prescriptionCostPerDrug = 45; // Average
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
      // Add 1-2 medications per condition (not all)
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
    max: Math.round((basePremium + partBPremium + totalPrescriptionCost.max / 12) * 1.2), // Add 20% buffer
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

// Generate personalized recommendations
const generateRecommendations = (input: EnhancedCostCalculatorInput, costs: any): string[] => {
  const recommendations = [];

  // Plan type recommendations
  if (input.healthConditions.length > 0) {
    recommendations.push('Medicare Advantage plan for comprehensive coverage including dental/vision');
  } else {
    recommendations.push('Consider Medicare Advantage for additional benefits at similar cost');
  }

  // Pharmacy recommendations
  if (input.prescriptionCount > 3) {
    recommendations.push('Part D plan with comprehensive formulary covering your medications');
  }

  // Doctor network recommendations
  if (input.doctorVisitFrequency === 'very-frequently' || input.specialistVisitFrequency === 'very-frequently') {
    recommendations.push('Zero copay doctor visits to reduce out-of-pocket costs');
  }

  // Savings recommendations
  if (input.currentInsurancePremium && input.currentInsurancePremium > costs.average) {
    recommendations.push('Potential monthly savings of $' + (input.currentInsurancePremium - costs.average));
  }

  return recommendations;
};

// Validation helpers
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

### 5. TypeScript Types: `costCalculator.types.ts`

```typescript
export interface EnhancedCostCalculatorInput {
  age: number;                      // 55-100
  zipCode: string;                  // 5 digits, Nassau/Suffolk
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  prescriptionCount: number;        // 0-20+

  // NEW: Health Conditions (for medication suggestions)
  healthConditions: string[];       // ['diabetes', 'high-blood-pressure', 'cholesterol', 'heart-disease', 'arthritis', 'asthma', 'depression']

  // NEW: Doctor Visit Frequency (for copay calculations)
  doctorVisitFrequency: 'rarely' | 'occasionally' | 'frequently' | 'very-frequently';  // <2/year, 3-5/year, 6-10/year, 10+/year
  specialistVisitFrequency: 'rarely' | 'occasionally' | 'frequently' | 'very-frequently';

  // NEW: Current Healthcare Costs (optional)
  currentInsurancePremium?: number;
  currentDoctorCopays?: number;
  currentPrescriptionCosts?: number;
}

export interface EnhancedCostEstimate {
  monthlyPremium: {
    min: number;
    max: number;
    average: number;
  };
  partBPremium: number;             // Fixed: $174.70 (2024)
  prescriptionCosts: {
    min: number;
    max: number;
  };
  copayAccumulation: {
    primaryCare: number;            // Annual based on visit frequency
    specialist: number;             // Annual based on visit frequency
    totalAnnualCopays: number;
  };
  suggestedMedications: Array<{     // NEW: Based on health conditions
    name: string;
    genericName: string;
    estimatedMonthlyCost: number;
    condition: string;
    tier: number;
  }>;
  currentVsMedicare: {              // NEW: Comparison with current costs
    currentAnnualTotal: number;
    medicareAnnualTotal: number;
    savings: number;
  };
  totalMonthly: {
    min: number;
    max: number;
  };
  totalAnnual: {
    min: number;
    max: number;
  };
  breakdown: Array<{
    category: string;
    amount: number;
    description: string;
  }>;
  recommendations: string[];
}

// Form step types
export type CalculatorStep = 'form' | 'loading' | 'results';

// Health conditions for checkboxes
export interface HealthCondition {
  id: string;
  label: string;
  icon: string;
}

// Visit frequency options
export interface VisitFrequency {
  value: 'rarely' | 'occasionally' | 'frequently' | 'very-frequently';
  label: string;
  visits: number;
}

// Lead capture form data
export interface LeadFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

// API response types
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Analytics event types
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

### 6. Validation Logic: `costCalculator.validation.ts`

```typescript
import { z } from 'zod';

// Main form validation schema
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

  // Optional fields
  currentInsurancePremium: z.number().optional(),
  currentDoctorCopays: z.number().optional(),
  currentPrescriptionCosts: z.number().optional()
});

// Lead capture form validation
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

// ZIP code validation for Nassau/Suffolk counties
export const validateNassauSuffolkZip = (zipCode: string): boolean => {
  const zip = parseInt(zipCode);
  return (
    (zip >= 11500 && zip <= 11599) || // Nassau County
    (zip >= 11700 && zip <= 11799) || // Suffolk County
    (zip >= 11900 && zip <= 11999)    // Suffolk County
  );
};

// Get county name from ZIP code
export const getCountyFromZip = (zipCode: string): string => {
  const zip = parseInt(zipCode);
  if (zip >= 11500 && zip <= 11599) return 'Nassau';
  if (zip >= 11700 && zip <= 11999) return 'Suffolk';
  return 'Long Island';
};

// Form validation helpers
export const validateAge = (age: number): boolean => {
  return age >= 55 && age <= 100;
};

export const validatePrescriptionCount = (count: number): boolean => {
  return count >= 0 && count <= 50;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 100;
};

// Real-time validation helpers
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

// Form completion checker
export const isFormStepComplete = (step: number, data: any): boolean => {
  switch (step) {
    case 1:
      return !!(data.age && validateAge(data.age));
    case 2:
      return !!(data.zipCode && validateNassauSuffolkZip(data.zipCode));
    case 3:
      return !!(data.healthStatus && data.healthConditions);
    case 4:
      return !!(data.doctorVisitFrequency && data.specialistVisitFrequency && data.prescriptionCount !== undefined);
    default:
      return false;
  }
};

// Error message formatter
export const formatValidationErrors = (errors: any): string[] => {
  const messages: string[] = [];

  if (errors.age) messages.push(`Age: ${errors.age.message}`);
  if (errors.zipCode) messages.push(`ZIP Code: ${errors.zipCode.message}`);
  if (errors.healthStatus) messages.push(`Health Status: ${errors.healthStatus.message}`);
  if (errors.prescriptionCount) messages.push(`Prescriptions: ${errors.prescriptionCount.message}`);
  if (errors.doctorVisitFrequency) messages.push(`Doctor Visits: ${errors.doctorVisitFrequency.message}`);
  if (errors.specialistVisitFrequency) messages.push(`Specialist Visits: ${errors.specialistVisitFrequency.message}`);

  return messages;
};
```

### 7. Analytics Tracking: `costCalculator.analytics.ts`

```typescript
import { CalculatorEvent } from './costCalculator.types';

// Google Analytics 4 tracking functions
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

// Facebook Pixel tracking (if implemented)
export const trackFacebookPixel = (event: string, data: any): void => {
  if (typeof fbq !== 'undefined') {
    fbq('track', event, data);
  }
};

// Error tracking
export const trackCalculatorError = (error: string, step: number): void => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'calculator_error', {
      tool_name: 'cost_calculator',
      error_message: error,
      step: step
    } as CalculatorEvent);
  }
};

// Performance tracking
export const trackCalculationTime = (startTime: number, endTime: number): void => {
  const duration = endTime - startTime;
  if (typeof gtag !== 'undefined') {
    gtag('event', 'calculation_performance', {
      tool_name: 'cost_calculator',
      duration_ms: duration
    } as CalculatorEvent);
  }
};

// A/B testing tracking
export const trackABTestVariant = (variant: string): void => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'ab_test_variant', {
      tool_name: 'cost_calculator',
      variant: variant
    } as CalculatorEvent);
  }
};

// User engagement tracking
export const trackSectionView = (section: string): void => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'section_view', {
      tool_name: 'cost_calculator',
      section: section
    } as CalculatorEvent);
  }
};

// Mobile vs desktop tracking
export const trackDeviceType = (): void => {
  const isMobile = window.innerWidth < 768;
  if (typeof gtag !== 'undefined') {
    gtag('event', 'device_type', {
      tool_name: 'cost_calculator',
      device_type: isMobile ? 'mobile' : 'desktop'
    } as CalculatorEvent);
  }
};
```

### 8. Custom Hook: `hooks/useCostCalculator.ts`

```typescript
import { useState, useCallback } from 'react';
import { EnhancedCostCalculatorInput, EnhancedCostEstimate } from '../costCalculator.types';
import { calculateMedicareCosts } from '../costCalculator.utils';
import { trackCalculatorStart, trackCalculatorCompletion, trackCalculationTime } from '../costCalculator.analytics';

export const useCostCalculator = () => {
  const [results, setResults] = useState<EnhancedCostEstimate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateCosts = useCallback(async (input: EnhancedCostCalculatorInput): Promise<EnhancedCostEstimate> => {
    const startTime = Date.now();

    try {
      setIsLoading(true);
      setError(null);

      // Track calculator start
      trackCalculatorStart();

      // Simulate API delay for UX (can be removed if using real API)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Perform calculation
      const calculationResults = calculateMedicareCosts(input);

      // Track completion
      trackCalculatorCompletion(calculationResults, input);
      trackCalculationTime(startTime, Date.now());

      setResults(calculationResults);
      return calculationResults;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Calculation failed';
      setError(errorMessage);

      // Track error
      if (typeof gtag !== 'undefined') {
        gtag('event', 'calculator_error', {
          tool_name: 'cost_calculator',
          error_message: errorMessage
        });
      }

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

### 9. Form Progress Hook: `hooks/useFormProgress.ts`

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

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  const isStepCompleted = useCallback((step: number) => {
    return completedSteps.has(step);
  }, [completedSteps]);

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
    goToStep,
    isStepCompleted,
    canProceedToStep,
    getProgressPercentage,
    reset
  };
};
```

### 10. Loading Component: `ui/CalculatorLoading.tsx`

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

        {/* Animated progress bar */}
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

      {/* Loading messages */}
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

## 🎯 IMPLEMENTATION REQUIREMENTS

### Dependencies to Install
```bash
npm install framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-progress
npm install @hookform/resolvers zod react-hook-form
```

### Files to Create
1. `src/components/tools/CostCalculator/CostCalculator.tsx`
2. `src/components/tools/CostCalculator/CostCalculatorForm.tsx`
3. `src/components/tools/CostCalculator/CostCalculatorResults.tsx`
4. `src/components/tools/CostCalculator/costCalculator.utils.ts`
5. `src/components/tools/CostCalculator/costCalculator.types.ts`
6. `src/components/tools/CostCalculator/costCalculator.validation.ts`
7. `src/components/tools/CostCalculator/costCalculator.analytics.ts`
8. `src/components/tools/CostCalculator/hooks/useCostCalculator.ts`
9. `src/components/tools/CostCalculator/hooks/useFormProgress.ts`
10. `src/components/tools/CostCalculator/ui/CalculatorLoading.tsx`

### API Endpoint Needed
```typescript
// POST /api/contact
// Handle lead capture from calculator
```

### Styling Requirements
- Ensure all components use Tailwind CSS classes
- Maintain consistent spacing with the existing design system
- Use the specified color palette and typography
- Implement responsive design for mobile/tablet/desktop

### Testing Requirements
- Unit tests for calculation logic
- Form validation tests
- Component rendering tests
- API integration tests

This comprehensive prompt provides everything needed to build the Enhanced Medicare Cost Calculator component with all advanced features, proper TypeScript typing, validation, analytics, and a polished user experience! 🚀💰
