import { useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Phone } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export default function ThankYou() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const source = params.get('src') || 'unknown';

    // Google Ads/Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: (window as any).__GOOGLE_ADS_CONVERSION_ID || undefined,
        event_callback: () => {},
        value: 1,
        source,
      });
      (window as any).gtag('event', 'generate_lead', { source, value: 1 });
    }

    // Meta/Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', { source });
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header hideBookButton />

      <main className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800">
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-10 md:p-12 text-center bg-white/95 backdrop-blur-sm">
              <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-9 h-9 text-blue-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-3">Thank You</h1>
              <p className="text-black/80 text-lg mb-6">
                We received your request. A licensed Medicare specialist will reach out within 24 hours to review your options.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-left mb-8">
                <div className="p-4 rounded-lg bg-blue-50">
                  <p className="font-semibold text-blue-700">What happens next</p>
                  <p className="text-sm text-black mt-1">We’ll verify your doctors and medications and compare plans in your ZIP code.</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50">
                  <p className="font-semibold text-blue-700">No pressure, no cost</p>
                  <p className="text-sm text-black mt-1">Our advisory services are free. Choose a plan only if it’s right for you.</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50">
                  <p className="font-semibold text-blue-700">Need help sooner?</p>
                  <p className="text-sm text-black mt-1">Call us now and we’ll prioritize your consultation.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <a href="tel:888-355-1085" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" /> Call 888-355-1085
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">Return to Home</Link>
                </Button>
              </div>

              <div className="mt-10">
                <p className="text-lg font-bold text-blue-700 mb-1">
                  Avoid these common Medicare mistakes
                </p>
                <p className="text-sm text-black/80 mb-2">
                  This quick guide busts the biggest myths in plain English — no email required.
                </p>
                <a
                  href="/guides/YourMedGuy-Medicare-Myths-vs-Reality.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-700 hover:text-blue-800 font-semibold underline"
                  aria-label="Download the free Medicare Myths vs Reality PDF"
                >
                  Download the free Medicare Myths vs Reality guide (PDF)
                </a>
              </div>

              <p className="text-xs text-black/60 mt-8">
                Important: We do not offer every plan available in your area. Any information we provide is limited to the plans we do offer. Please contact Medicare.gov or 1-800-MEDICARE (TTY: 1-877-486-2048), 24/7, for information on all your options.
              </p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}


