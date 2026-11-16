import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    try {
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, pageUrl }),
      });

      if (response.ok) {
        toast({
          title: "You're on the list!",
          description: "Thanks for subscribing. Watch your inbox for helpful tips.",
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (err) {
      toast({
        title: "Subscription failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white shadow-none border border-rule rounded-2xl overflow-hidden">
          <CardContent className="p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content Side */}
              <div className="space-y-6 lg:space-y-8">
                {/* Icon */}
                <div className="flex justify-center lg:justify-start">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E6EEFB] rounded-2xl flex items-center justify-center">
                    <Mail className="h-8 w-8 sm:h-10 sm:w-10 text-brandblue" />
                  </div>
                </div>

                {/* Heading */}
                <div className="text-center lg:text-left space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink text-balance">
                    Medicare Tips That Save You Money
                  </h2>
                  <p className="text-lg sm:text-xl text-mute leading-relaxed text-pretty">
                    Twice a month we send plain-English Medicare tips, enrollment deadlines, and ways to lower your costs. No jargon, no spam.
                  </p>
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
                    You can unsubscribe at any time.
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-ink">
                    <div className="w-2 h-2 bg-brandblue rounded-full"></div>
                    <span>Medicare enrollment deadlines and reminders</span>
                  </div>
                  <div className="flex items-center space-x-3 text-ink">
                    <div className="w-2 h-2 bg-brandblue rounded-full"></div>
                    <span>Money-saving tips for prescription drugs</span>
                  </div>
                  <div className="flex items-center space-x-3 text-ink">
                    <div className="w-2 h-2 bg-brandblue rounded-full"></div>
                    <span>Updates on Medicare policy changes</span>
                  </div>
                  <div className="flex items-center space-x-3 text-ink">
                    <div className="w-2 h-2 bg-brandblue rounded-full"></div>
                    <span>Exclusive healthcare resources and guides</span>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="space-y-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newsletter-first-name" className="text-base font-medium text-ink">
                        First Name *
                      </Label>
                      <Input
                        id="newsletter-first-name"
                        type="text"
                        placeholder="Enter your first name"
                        className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newsletter-last-name" className="text-base font-medium text-ink">
                        Last Name *
                      </Label>
                      <Input
                        id="newsletter-last-name"
                        type="text"
                        placeholder="Enter your last name"
                        className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newsletter-email" className="text-base font-medium text-ink">
                      Email Address *
                    </Label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      placeholder="Enter your email address"
                      className="text-base py-3 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="dark" size="lg" className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing…' : 'Subscribe'}
                  </Button>
                </form>

                {/* Privacy Notice */}
                <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-brandblue mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-mute leading-relaxed">
                    We do not share your data with anybody, and only use it for its intended purpose. 
                    Your privacy is our priority.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSection; 