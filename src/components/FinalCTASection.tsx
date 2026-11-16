import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import SectionHeading from "@/components/SectionHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SiteRegion } from "@/types/site.types";

type FinalCTASectionProps = {
  region: SiteRegion;
};

/**
 * Closing booking block. This is the inline homepage form (POSTs to
 * /api/contact, redirects to /thank-you for conversion tracking) that used
 * to live in the hero. The #contact anchor lives here so nav links still work.
 */
const FinalCTASection = ({ region }: FinalCTASectionProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', bestTime: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [consent, setConsent] = useState(false);

  const serviceAreaMap: Record<SiteRegion, string> = {
    longisland: 'Serving Nassau and Suffolk County.',
    statenisland: 'Serving Staten Island.',
    nyc: 'Serving all five boroughs.',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setSubmitStatus('consent');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('');
    try {
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, message: '', pageUrl }),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', bestTime: '' });
        setConsent(false);
        navigate(`/thank-you?src=homepage-inline`);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "h-12 text-[15px] px-3.5 rounded-[10px] border-[#C6D0DF] bg-white text-ink focus-visible:ring-brandblue";

  return (
    <section id="contact" className="bg-white py-6 sm:py-10 lg:py-14 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ink text-white rounded-[22px] p-6 sm:p-10 lg:p-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-center">
          <div>
            <SectionHeading
              onDark
              kicker="Free 15-minute review"
              title="Check your 2027 plan before December 7."
              lede={`A licensed New York agent calls you at the time you choose. ${serviceAreaMap[region]}`}
            />
            <ul className="hidden lg:grid gap-2 text-[15px] text-[#B9C4D6] -mt-4">
              <li>Your doctors, checked for 2027 networks</li>
              <li>Your prescriptions, checked by tier</li>
              <li>Your total cost, side by side</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="bg-white text-ink rounded-2xl p-5 sm:p-6 space-y-3.5" noValidate>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">Book your free review</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="cta-firstName" className="text-[13px] font-semibold text-mute">First name</Label>
                <Input id="cta-firstName" name="firstName" type="text" autoComplete="given-name" className={inputClass} value={formData.firstName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cta-lastName" className="text-[13px] font-semibold text-mute">Last name</Label>
                <Input id="cta-lastName" name="lastName" type="text" autoComplete="family-name" className={inputClass} value={formData.lastName} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cta-email" className="text-[13px] font-semibold text-mute">Email</Label>
              <Input id="cta-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClass} value={formData.email} onChange={handleInputChange} required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cta-bestTime" className="text-[13px] font-semibold text-mute">Best time to call</Label>
              <Select value={formData.bestTime} onValueChange={(v) => setFormData(prev => ({ ...prev, bestTime: v }))}>
                <SelectTrigger id="cta-bestTime" className={inputClass}>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9am to 12pm)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12pm to 5pm)</SelectItem>
                  <SelectItem value="evening">Evening (5pm to 8pm)</SelectItem>
                  <SelectItem value="anytime">Anytime</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {submitStatus === 'error' && (
              <p className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                Something went wrong. Please try again or email support@yourmedguy.com.
              </p>
            )}

            <div className="flex items-start gap-2.5 pt-1">
              <Checkbox
                id="cta-consent"
                checked={consent}
                onCheckedChange={(v) => {
                  setConsent(v === true);
                  if (v === true && submitStatus === 'consent') setSubmitStatus('');
                }}
                className="mt-0.5"
              />
              <Label htmlFor="cta-consent" className="text-xs text-mute font-normal leading-relaxed cursor-pointer">
                By checking this box, I agree to be contacted by a licensed insurance agent from YourMedGuy about Medicare plan options by phone, email, or text message, including at the number provided using automated technology. Consent is not a condition of purchase, and message/data rates may apply.
              </Label>
            </div>
            {submitStatus === 'consent' && (
              <p className="text-sm font-medium text-red-700">Please agree to be contacted so an agent can reach you.</p>
            )}

            <Button type="submit" variant="amber" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Book my free review'}
            </Button>
            <p className="text-xs text-mute leading-relaxed">
              We do not offer every plan available in your area. Any information we provide is limited to the plans we do offer.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
