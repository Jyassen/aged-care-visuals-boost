import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

export default function MedicareStarterKit() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !disclaimerAgreed) {
      setError('Please fill out all fields and agree to the disclaimer.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/medicare-starter-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, disclaimerAgreed, pageUrl: window.location.href }),
      });
      if (response.ok) {
        navigate('/thank-you-medicare-kit');
      } else {
        setError('Failed to send. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Bundle Image */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Hero Copy */}
            <div className="py-12 px-4 lg:px-8 lg:pl-16 flex items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Finally... A Simple Way to Make Sense of Medicare</h1>
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  Get your NY Medicare Starter Kit — the same insider guides our advisors use to help New Yorkers avoid costly mistakes and find the right plan
                </p>
              </div>
            </div>
            {/* Right: Bundle Image */}
            <div className="flex items-center justify-center py-8 lg:py-0">
              <img
                src="/images/Stacked Bundle.png"
                alt="NY Medicare Starter Kit Bundle"
                className="max-w-sm w-full"
              />
            </div>
          </div>
        </section>

        {/* Two-Column Content Section */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-start">
            {/* Left Column: What's Inside + Form */}
            <div className="py-16 px-4 lg:px-8 lg:pl-16 space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Here's What You Get (Instantly):</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    <span className="text-base leading-relaxed"><strong className="text-amber-600">The 10 Questions One-Pager:</strong> The exact questions to ask before signing anything — so you never wonder if you're getting the whole story</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    <span className="text-base leading-relaxed"><strong className="text-amber-600">Medicare VIP Contacts:</strong> Direct lines to New York resources most people don't know exist (but should)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                    <span className="text-base leading-relaxed"><strong className="text-amber-600">Myths vs Reality Guide:</strong> The truth about common Medicare misconceptions that cost New Yorkers thousands every year</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-6 text-base leading-relaxed italic">
                  No sales pitch. No obligation. Just the straight facts you need to make a confident decision about your Medicare coverage.
                </p>
              </div>

              {/* Form */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Get Your Starter Kit Now</h3>
                <p className="text-sm text-gray-600 mb-6">Enter your details below and we'll send it straight to your inbox (takes less than 60 seconds)</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="disclaimer"
                      checked={disclaimerAgreed}
                      onCheckedChange={setDisclaimerAgreed}
                      required
                      className="mt-1"
                    />
                    <label htmlFor="disclaimer" className="text-xs leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Yes, send me the starter kit. I understand I'll also receive helpful Medicare tips (unsubscribe anytime). These are general Medicare information and resources publicly available. For personalized information, plan options, and coverage information, please speak with one of our Licensed Medicare brokers.
                    </label>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-lg py-6" disabled={loading}>
                    <Mail className="w-5 h-5 mr-2" />
                    {loading ? 'Sending...' : 'Send Me the Kit'}
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  🔒 Your privacy matters. We'll never sell or share your information.
                </p>
              </div>
            </div>

            {/* Right Column: Image Carousel */}
            <div className="bg-gray-50 relative overflow-hidden" style={{ height: '100%' }}>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Fade(),
                  Autoplay({
                    delay: 4000,
                  }),
                ]}
                className="w-full h-full"
              >
                <CarouselContent className="h-full">
                  <CarouselItem className="h-full">
                    <img
                      src="/images/medium-shot-senior-couple-with-coffee.jpg"
                      alt="Senior couple enjoying coffee together"
                      className="w-full h-full object-cover object-top"
                    />
                  </CarouselItem>
                  <CarouselItem className="h-full">
                    <img
                      src="/images/old-couple-country-side.jpg"
                      alt="Elderly couple in the countryside"
                      className="w-full h-full object-cover object-top"
                    />
                  </CarouselItem>
                  <CarouselItem className="h-full">
                    <img
                      src="/images/senior-couple-walking-hand-by-hand.jpg"
                      alt="Senior couple walking hand in hand"
                      className="w-full h-full object-cover object-top"
                    />
                  </CarouselItem>
                  <CarouselItem className="h-full">
                    <img
                      src="/images/smiley-senior-man-holding-notebook.jpg"
                      alt="Smiling senior man with notebook"
                      className="w-full h-full object-cover object-top"
                    />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
