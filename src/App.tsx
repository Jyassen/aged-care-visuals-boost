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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
