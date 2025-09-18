import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Scoring from "@/pages/Scoring";
import ScrollToTop from "@/pages/ScrollToTop";
import Terms from "@/pages/Terms";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={<Index />}
          />
          <Route
            path="/scoring"
            element={<Scoring />}
          />
          <Route
            path="/solicitar-credito"
            element={<NotFound />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route
            path="*"
            element={<NotFound />}
          />
          <Route
            path="/privacy"
            element={<Privacy />}
          />
          <Route
            path="/terms"
            element={<Terms />}
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
