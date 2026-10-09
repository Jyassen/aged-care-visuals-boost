import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import WistiaPlayer from "@/components/funnels/WistiaPlayer";
import FunnelForm from "@/components/funnels/FunnelForm";
import { FunnelFooter, FunnelHeader, FunnelMobileBar } from "@/components/funnels/FunnelChrome";
import {
  DISCLOSURE,
  HOW_STEPS,
  PROOF,
  REVIEW_CHECKS,
  type FunnelConfig,
} from "@/funnels/config";

type VslFunnelPageProps = {
  config: FunnelConfig;
};

export default function VslFunnelPage({ config }: VslFunnelPageProps) {
  return (
    <div id="top" className="min-h-screen bg-slate-50 text-gray-900 pb-24 sm:pb-0">
      <SEO title={config.seoTitle} description={config.seoDescription} canonical={`https://yourmedguy.com/${config.slug}`} />
      <FunnelHeader />

      <main>
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8 sm:pt-14 flex flex-col">
            <h1 className="order-2 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              {config.headline}{" "}
              <span className="text-blue-700">{config.headlineAccent}</span>
            </h1>
            <div className="order-3 sm:order-4 mt-6" id="vsl">
              {config.wistiaId ? (
                <WistiaPlayer mediaId={config.wistiaId} title={config.videoTitle} />
              ) : (
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">On the call</p>
                  <p className="mt-2 text-lg text-gray-800 leading-relaxed">
                    After you book, a short video on the confirmation page walks through what to have ready for a C-SNP or D-SNP conversation. You can book now without watching anything first.
                  </p>
                </div>
              )}
            </div>
            <p className="order-4 sm:order-3 mt-5 text-lg sm:text-xl text-gray-700 leading-relaxed">{config.subhead}</p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PROOF.map((item) => (
              <div key={item.value} className="rounded-xl bg-white border border-slate-200 px-4 py-3">
                <dt className="text-lg font-bold text-gray-900">{item.value}</dt>
                <dd className="text-sm text-gray-600">{item.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="book" className="max-w-xl mx-auto px-4 sm:px-6 pb-16">
          <div className="bg-white border-2 border-blue-100 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Get Your Consultation</h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Speak with a Medicare specialist today
              </p>
            </div>
            <FunnelForm source={config.source} topic={config.topic} precall={config.precall} />
          </div>
        </section>

        <section className="bg-gradient-to-br from-blue-700 to-blue-800 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{config.problemHeading}</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-5">
              {config.problems.map((problem, index) => (
                <article key={problem.title} className="rounded-2xl bg-white p-6 shadow-md">
                  <p className="text-blue-700 font-bold text-sm">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-xl font-semibold text-gray-900">{problem.title}</h3>
                  <p className="mt-3 text-gray-700 leading-relaxed">{problem.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How your free coverage review works</h2>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl">
              Same three steps on every review. You stay in the conversation, and you decide what happens next.
            </p>
            <div className="mt-8 grid md:grid-cols-3 gap-5">
              {HOW_STEPS.map((step) => (
                <article key={step.n} className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
                  <p className="text-blue-700 font-bold">{step.n}</p>
                  <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-gray-700 leading-relaxed">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Three details a headline cannot settle</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-5">
              {REVIEW_CHECKS.map((check) => (
                <article key={check.title} className="rounded-2xl bg-white border border-slate-200 p-6">
                  <h3 className="text-xl font-semibold">{check.title}</h3>
                  <p className="mt-3 text-gray-700 leading-relaxed">{check.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900">Questions people ask first</h2>
            <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
              {config.faqs.map((faq) => (
                <details key={faq.q} className="group py-4">
                  <summary className="cursor-pointer text-lg font-semibold text-gray-900 list-none flex justify-between gap-4">
                    {faq.q}
                    <span className="text-blue-700 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-700 text-white py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">Bring your questions. Let’s make the next step clear.</h2>
            <p className="mt-4 text-lg text-blue-100">
              The consultation is free. We compare the plans we offer in your area and tell you where that selection stops.
            </p>
            <a
              href="#book"
              className="inline-flex mt-8 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-lg px-8 py-4 rounded-lg"
            >
              Book Your Review
            </a>
          </div>
        </section>

        <section className="py-8">
          <p className="max-w-4xl mx-auto px-4 sm:px-6 text-xs text-gray-500 leading-relaxed text-center">
            {DISCLOSURE}{" "}
            <Link to="/privacy-policy" className="underline">Privacy Policy</Link>
          </p>
        </section>
      </main>

      <FunnelFooter />
      <FunnelMobileBar />
    </div>
  );
}
