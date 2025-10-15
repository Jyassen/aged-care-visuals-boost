import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { MapPin, Stethoscope, Users, Pill, Calculator, Check } from 'lucide-react';
import { CostCalculatorInput } from '@/types/medicare.types';
import { validateZipCode } from './costCalculator.utils';

interface CostCalculatorFormProps {
  onCalculate: (input: CostCalculatorInput) => void;
}

type DoctorVisits = 'minimal' | 'moderate' | 'frequent';

export default function CostCalculatorForm({ onCalculate }: CostCalculatorFormProps) {
  const [zipCode, setZipCode] = useState('');
  const [healthStatus, setHealthStatus] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');
  const [doctorVisits, setDoctorVisits] = useState<DoctorVisits>('moderate');
  const [prescriptionCount, setPrescriptionCount] = useState('0');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate ZIP code
    if (!zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}$/.test(zipCode)) {
      newErrors.zipCode = 'Please enter a valid 5-digit ZIP code';
    } else if (!validateZipCode(zipCode)) {
      newErrors.zipCode = 'Please enter a valid New York State ZIP code';
    }

    // Validate prescription count
    const prescCount = parseInt(prescriptionCount);
    if (isNaN(prescCount) || prescCount < 0) {
      newErrors.prescriptionCount = 'Please enter a valid number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsCalculating(true);

    // Convert doctor visits to age equivalent for backend compatibility
    const age = 65; // Default, no longer displayed to user

    // Simulate calculation delay for better UX
    setTimeout(() => {
      onCalculate({
        age,
        zipCode,
        healthStatus,
        prescriptionCount: prescCount,
      });
      setIsCalculating(false);
    }, 800);
  };

  const doctorOptions = [
    {
      id: 'minimal',
      icon: Stethoscope,
      title: 'Just My PCP',
      description: 'Primary care doctor only',
      visits: '1-2 visits/year',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      id: 'moderate',
      icon: Users,
      title: '1-2 Specialists',
      description: 'PCP + a specialist or two',
      visits: '4-8 visits/year',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      id: 'frequent',
      icon: Users,
      title: '3+ Specialists',
      description: 'PCP + multiple specialists',
      visits: '10+ visits/year',
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ZIP Code - Modern Card Style */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card className="p-6 border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <Label htmlFor="zipCode" className="text-lg font-semibold text-gray-900">
                    Your ZIP Code *
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">New York State only</p>
                </div>
                <Input
                  id="zipCode"
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="Enter 5-digit ZIP"
                  maxLength={5}
                  className="text-lg h-12"
                />
                {errors.zipCode && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    ⚠️ {errors.zipCode}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Health Status - Modern Card Style */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="p-6 border-2 border-gray-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Stethoscope className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <Label htmlFor="healthStatus" className="text-lg font-semibold text-gray-900">
                    Overall Health Status *
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">How would you describe your health?</p>
                </div>
                <Select value={healthStatus} onValueChange={(value: any) => setHealthStatus(value)}>
                  <SelectTrigger id="healthStatus" className="text-lg h-12">
                    <SelectValue placeholder="Select your health status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Very healthy - Once a year visit</SelectItem>
                    <SelectItem value="good">Pretty healthy - 2-3 routine visits per year</SelectItem>
                    <SelectItem value="fair">Managing some conditions - 4-6 visits per year</SelectItem>
                    <SelectItem value="poor">Managing multiple conditions - 8+ visits per year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Doctor Visits - Interactive Button Grid */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="p-6 border-2 border-gray-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <Label className="text-lg font-semibold text-gray-900">
                    Who do you see regularly? *
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">Select your typical healthcare team</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {doctorOptions.map((option, index) => {
                  const Icon = option.icon;
                  const isSelected = doctorVisits === option.id;

                  return (
                    <motion.button
                      key={option.id}
                      type="button"
                      onClick={() => setDoctorVisits(option.id as DoctorVisits)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`
                        relative p-6 rounded-xl border-2 transition-all duration-300
                        ${isSelected
                          ? `border-transparent bg-gradient-to-br ${option.gradient} text-white shadow-lg scale-105`
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                        }
                      `}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 bg-white rounded-full p-1"
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </motion.div>
                      )}
                      
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className={`p-3 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-gray-100'}`}>
                          <Icon className={`h-8 w-8 ${isSelected ? 'text-white' : 'text-gray-700'}`} />
                        </div>
                        <div>
                          <h3 className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {option.title}
                          </h3>
                          <p className={`text-sm mt-1 ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                            {option.description}
                          </p>
                          <p className={`text-xs mt-2 font-medium ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                            {option.visits}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Prescriptions - Modern Card Style */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="p-6 border-2 border-gray-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Pill className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <Label htmlFor="prescriptionCount" className="text-lg font-semibold text-gray-900">
                    Number of Regular Prescriptions *
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">How many medications do you take regularly?</p>
                </div>
                <Select value={prescriptionCount} onValueChange={(value) => setPrescriptionCount(value)}>
                  <SelectTrigger id="prescriptionCount" className="text-lg h-12">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.prescriptionCount && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    ⚠️ {errors.prescriptionCount}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Submit Button - Animated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            type="submit"
            disabled={isCalculating}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isCalculating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="flex items-center gap-3"
              >
                <Calculator className="h-6 w-6" />
                <span>Calculating...</span>
              </motion.div>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <Calculator className="h-6 w-6" />
                Calculate My Costs
              </span>
            )}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-sm text-gray-600"
        >
          🔒 Your information is confidential and never shared • No obligation
        </motion.p>
      </form>
    </div>
  );
}
