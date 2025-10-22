import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";
import ComplianceSection from "@/components/ComplianceSection";
import Footer from "@/components/Footer";
import type { SiteRegion } from "@/types/site.types";
import { useLocation } from "react-router-dom";
import SEO from "@/components/SEO";

const Index = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  let region: SiteRegion = 'nyc';
  if (path.startsWith('/longisland')) {
    region = 'longisland';
  } else if (path.startsWith('/statenisland')) {
    region = 'statenisland';
  } else {
    region = 'nyc';
  }

  const seoTitleMap: Record<SiteRegion, string> = {
    nyc: 'Medicare Help in New York City | YourMedGuy',
    longisland: 'Medicare Help in Long Island | YourMedGuy',
    statenisland: 'Medicare Help in Staten Island | YourMedGuy',
  };

  const seoDescMap: Record<SiteRegion, string> = {
    nyc: 'Local Medicare help across NYC. Licensed agents. No obligation. Book a 15-minute review to check your doctors, prescriptions, and costs.',
    longisland: 'Local Medicare help in Long Island (Nassau & Suffolk). Licensed agents. No obligation. Book a 15-minute review to check your doctors, prescriptions, and costs.',
    statenisland: 'Local Medicare help in Staten Island. Licensed agents. No obligation. Book a 15-minute review to check your doctors, prescriptions, and costs.',
  };

  const canonicalBase = 'https://yourmedguy.com';
  const canonicalPath = region === 'nyc' ? '/' : `/${region}`;
  const canonical = `${canonicalBase}${canonicalPath}`;
  return (
    <div className="min-h-screen">
      <SEO title={seoTitleMap[region]} description={seoDescMap[region]} canonical={canonical} />
      <Header />
      <HeroSection region={region} />
      <ServicesSection region={region} />
      <BenefitsSection region={region} />
      <HowItWorksSection />
      <PartnersSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
      <ComplianceSection />
      <Footer region={region} />
    </div>
  );
};

export default Index;
