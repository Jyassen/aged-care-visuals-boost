import { useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

/** The three-guide starter kit (kit page) and the single NY + NJ guide (exit-intent popup). */
const KIT_GUIDES = [
  { href: '/guides/YourMedGuy-10-Questions-2027.pdf', title: '10 Questions to Ask', blurb: 'Before you choose a plan' },
  { href: '/guides/YourMedGuy-Medicare-VIP-Contacts-NY-2027.pdf', title: 'Medicare VIP Contacts', blurb: 'New York help lines and programs' },
  { href: '/guides/YourMedGuy-Medicare-Myths-vs-Reality-2027.pdf', title: 'Myths vs Reality', blurb: 'Six costly myths, 2027 numbers' },
];

const STRESS_FREE_GUIDE = [
  {
    href: '/guides/YourMedGuy-Stress-Free-Medicare-Guide-2027.pdf',
    title: 'The Stress-Free Medicare Guide',
    blurb: 'Medicare in New York and New Jersey in plain English, with the 2027 costs and deadlines',
  },
];

export default function ThankYouMedicareKit() {
  const location = useLocation();
  const isGuideOnly = new URLSearchParams(location.search).get('src') === 'exit-intent';
  const guides = isGuideOnly ? STRESS_FREE_GUIDE : KIT_GUIDES;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const source = params.get('src') || 'medicare-starter-kit';

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', { source, value: 1 });
    }

    // Deliberately no Meta pixel event here: a kit download is low-intent and must not
    // feed the ads' Lead signal. The only pixel Lead on the booking path is on /precall.
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
              <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-3">Thank You!</h1>
              <p className="text-black/80 text-lg mb-6">
                {isGuideOnly
                  ? 'Your Stress-Free Medicare Guide has been sent to your email. Check your inbox (and spam folder) for instant access, or download it right here.'
                  : 'Your NY Medicare Starter Kit has been sent to your email. Check your inbox (and spam folder) for instant access, or download the guides right here.'}
              </p>
              <div className={`grid gap-3 text-left mb-8 ${isGuideOnly ? 'sm:max-w-md sm:mx-auto' : 'sm:grid-cols-3'}`}>
                {guides.map((g) => (
                  <a
                    key={g.href}
                    href={g.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <p className="font-semibold text-blue-700">{g.title} (PDF)</p>
                    <p className="text-sm text-black mt-1">{g.blurb}</p>
                  </a>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-left mb-8">
                <div className="p-4 rounded-lg bg-blue-50">
                  <p className="font-semibold text-blue-700">What's next</p>
                  <p className="text-sm text-black mt-1">
                    {isGuideOnly
                      ? 'Read the guide and use it to prepare for your Medicare decisions.'
                      : 'Review the guides and use them to prepare for your Medicare decisions.'}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50">
                  <p className="font-semibold text-blue-700">Need help?</p>
                  <p className="text-sm text-black mt-1">Our advisors are ready to answer your questions for free.</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50">
                  <p className="font-semibold text-blue-700">Explore more</p>
                  <p className="text-sm text-black mt-1">Try our Cost Calculator to see potential savings.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <a href="mailto:support@yourmedguy.com" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" /> Email support@yourmedguy.com
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">Return to Home</Link>
                </Button>
              </div>
              <div className="mb-8">
                <p className="text-lg font-bold text-blue-700 mb-1">Ready to find the right plan?</p>
                <p className="text-sm text-black/80 mb-2">
                  Use our free tool to compare Medicare plans in your area.
                </p>
                <Button asChild variant="link">
                  <Link to="/tools/cost-calculator">Try the Cost Calculator</Link>
                </Button>
              </div>
              <p className="text-xs text-black/60">
                Important: We do not offer every plan available in your area. Any information we provide is limited to the plans we do offer. Please contact Medicare.gov or 1-800-MEDICARE (TTY: 1-877-486-2048), 24/7, for information on all your options.
              </p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
