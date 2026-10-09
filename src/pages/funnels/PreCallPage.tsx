import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Mail } from "lucide-react";
import SEO from "@/components/SEO";
import WistiaPlayer from "@/components/funnels/WistiaPlayer";
import { FunnelFooter, FunnelHeader } from "@/components/funnels/FunnelChrome";
import { PRECALLS, type PrecallId } from "@/funnels/config";

type PreCallPageProps = {
  variant: PrecallId;
};

export default function PreCallPage({ variant }: PreCallPageProps) {
  const location = useLocation();
  const page = PRECALLS[variant];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const source = params.get("src") || `precall-${variant}`;
    const win = window as Window & {
      gtag?: (...args: unknown[]) => void;
      fbq?: (...args: unknown[]) => void;
      __GOOGLE_ADS_CONVERSION_ID?: string;
    };

    if (win.gtag) {
      win.gtag("event", "conversion", {
        send_to: win.__GOOGLE_ADS_CONVERSION_ID || undefined,
        value: 1,
        source,
      });
      win.gtag("event", "generate_lead", { source, value: 1 });
    }
    if (win.fbq) {
      win.fbq("track", "Lead", { source });
    }
  }, [location.search, variant]);

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO title={page.seoTitle} description={page.seoDescription} />
      <FunnelHeader showBook={false} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col">
          <p className="order-1 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">{page.kicker}</p>
          <div className="order-2 mt-4 flex items-start gap-3">
            <CheckCircle2 className="h-8 w-8 text-blue-700 flex-shrink-0 mt-1" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{page.headline}</h1>
          </div>
          <div className="order-3 sm:order-4 mt-6">
            <WistiaPlayer mediaId={page.wistiaId} title={page.kicker} />
          </div>
          <p className="order-4 sm:order-3 mt-5 text-lg text-gray-700 leading-relaxed">{page.subhead}</p>
        </div>

        <section className="mt-8 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">Have these nearby</h2>
          <ul className="mt-4 space-y-3">
            {page.checklist.map((item) => (
              <li key={item} className="flex gap-3 text-gray-800 leading-relaxed">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-700 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-gray-700 leading-relaxed">
            There is no charge for the consultation, and you do not have to change coverage or decide on the call.
            Check your confirmation for the time and how we will connect. Need another time? Use the rescheduling link,
            or email us.
          </p>
          <a
            href="mailto:help@yourmedguy.com"
            className="mt-6 inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email help@yourmedguy.com
          </a>
        </section>

        <p className="mt-8 text-sm text-gray-500">
          Keep your Medicare number out of text messages and regular email.{" "}
          <Link to="/" className="text-blue-700 underline">Return to YourMedGuy</Link>
        </p>
      </main>
      <FunnelFooter />
    </div>
  );
}
