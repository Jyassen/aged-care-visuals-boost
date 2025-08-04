import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Heart, Phone, Mail, Clock } from "lucide-react";

interface CaptureFormProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
}

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zipCode: string;
  ageRange: string;
  bestTimeToCall: string;
  careType: string;
  message: string;
};

const CaptureForm = ({ 
  trigger, 
  title = "Get Your Free Consultation",
  description = "Let us help you find the perfect Medicare plan for your needs"
}: CaptureFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    zipCode: "",
    ageRange: "",
    bestTimeToCall: "",
    careType: "",
    message: ""
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Make actual API call to send email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          bestTime: formData.bestTimeToCall,
          message: `Age Range: ${formData.ageRange}\nZip Code: ${formData.zipCode}\nCare Type: ${formData.careType}\n\nMessage: ${formData.message}`
        }),
      });

      if (response.ok) {
        toast({
          title: "Thank you for your interest!",
          description: "We'll contact you within 24 hours to discuss your Medicare needs.",
        });
        
        setIsOpen(false);
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          zipCode: "",
          ageRange: "",
          bestTimeToCall: "",
          careType: "",
          message: ""
        });
      } else {
        throw new Error('Failed to send form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly at 347-305-2260.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <Heart className="h-8 w-8 text-blue-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900">{title}</DialogTitle>
          <p className="text-gray-600">{description}</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                className="border-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
                className="border-gray-300"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                className="pl-10 border-gray-300"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 border-gray-300"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                required
                className="border-gray-300"
                placeholder="12345"
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ageRange">Age Range</Label>
              <Select value={formData.ageRange} onValueChange={(value) => handleInputChange('ageRange', value)}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="64">Turning 65 Soon</SelectItem>
                  <SelectItem value="65-70">65-70</SelectItem>
                  <SelectItem value="71-75">71-75</SelectItem>
                  <SelectItem value="76+">76+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bestTimeToCall">Best Time to Call</Label>
            <Select value={formData.bestTimeToCall} onValueChange={(value) => handleInputChange('bestTimeToCall', value)}>
              <SelectTrigger className="border-gray-300">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
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
          
          <div className="space-y-2">
            <Label htmlFor="careType">Medicare Interest</Label>
            <Select value={formData.careType} onValueChange={(value) => handleInputChange('careType', value)}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Select interest area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medicare-advantage">Medicare Advantage</SelectItem>
                <SelectItem value="supplement">Medicare Supplement</SelectItem>
                <SelectItem value="part-d">Part D Prescription</SelectItem>
                <SelectItem value="dental-vision">Dental & Vision</SelectItem>
                <SelectItem value="general">General Medicare Help</SelectItem>
                <SelectItem value="not-sure">Not Sure Yet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Tell us about your needs (optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Share any specific Medicare questions, health conditions, or timeline..."
              className="min-h-[80px] border-gray-300"
            />
          </div>
          
          <div className="pt-4 space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Meet Your MedGuy"}
            </Button>
            
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              By submitting your contact information, you consent to receive communications from YourMedGuy. 
              We respect your privacy and will never share your information with third parties.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CaptureForm;