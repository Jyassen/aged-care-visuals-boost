/**
 * Lead Capture Form Component
 * Universal form for capturing leads from all interactive tools
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface LeadCaptureFormProps {
  /** Source identifier (e.g., 'cost-calculator', 'medication-tool') */
  source: string;
  /** Optional tool-specific context data */
  context?: any;
  /** Optional callback on successful submission */
  onSuccess?: () => void;
}

/**
 * Universal lead capture form for all interactive tools
 * Submits to /api/contact with source tracking
 */
export default function LeadCaptureForm({ source, context, onSuccess }: LeadCaptureFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    bestTimeToCall: '',
  });
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          ...formData,
          source: source,
          context: JSON.stringify(context),
          message: `Lead from ${source} tool`,
        }),
      });
      
      if (response.ok) {
        toast({
          title: "Thank you!",
          description: "We'll contact you within 24 hours to discuss your Medicare options.",
        });
        
        // Track conversion with Google Analytics if available
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            source: source,
            value: 1,
          });
        }
        
        // Navigate to thank you page for conversion tracking
        navigate(`/thank-you?src=${encodeURIComponent(source)}`);

        // Call success callback if provided
        if (onSuccess) onSuccess();
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us at 888-355-1085",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="p-8 bg-white">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Schedule Your Consultation
        </h3>
        <p className="text-gray-600">
          Let's discuss your results and find the perfect plan for you
        </p>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields - 2 column grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              required
            />
          </div>
        </div>
        
        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>
        
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
          <p className="text-xs text-gray-500">Optional, but recommended for confirmation</p>
        </div>
        
        {/* Best Time to Call */}
        <div className="space-y-2">
          <Label htmlFor="bestTimeToCall">Best Time to Call</Label>
          <Select 
            value={formData.bestTimeToCall} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, bestTimeToCall: value }))}
          >
            <SelectTrigger id="bestTimeToCall">
              <SelectValue placeholder="Select preferred time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
              <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
              <SelectItem value="anytime">Anytime</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-bold text-lg py-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Schedule My Consultation'}
        </Button>
        
        {/* Disclaimer - CMS/HIPAA aligned */}
        <p className="text-[10px] text-gray-500 text-center leading-relaxed">
          By submitting, you agree to be contacted by a licensed insurance agent from YourMedGuy about Medicare plan options by phone, email, or text. Consent is not a condition of purchase. YourMedGuy is not affiliated with or endorsed by the U.S. government or the federal Medicare program.
        </p>
      </form>
    </Card>
  );
}

