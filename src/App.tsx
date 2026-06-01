import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CostCalculatorPage from "./pages/tools/CostCalculatorPage";
import ThankYou from "./pages/ThankYou";
import MedicareStarterKit from "./pages/MedicareStarterKit";
import ThankYouMedicareKit from "./pages/ThankYouMedicareKit";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import Accessibility from "./pages/legal/Accessibility";
import LegalDocuments from "./pages/legal/LegalDocuments";
import CookiePolicy from "./pages/legal/CookiePolicy";
import ConsentToContact from "./pages/legal/ConsentToContact";
import HipaaCompliance from "./pages/legal/HipaaCompliance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/longisland" element={<Index />} />
          <Route path="/statenisland" element={<Index />} />
          <Route path="/tools/cost-calculator" element={<CostCalculatorPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/medicarestarterkit" element={<MedicareStarterKit />} />
          <Route path="/thank-you-medicare-kit" element={<ThankYouMedicareKit />} />
          <Route path="/legal" element={<LegalDocuments />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/consent-to-contact" element={<ConsentToContact />} />
          <Route path="/hipaa-compliance" element={<HipaaCompliance />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
