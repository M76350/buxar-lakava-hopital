import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import { lazy, Suspense } from "react";
import CustomCursor from "@/components/CustomCursor";
import SplashScreen from "@/components/SplashScreen";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Contact = lazy(() => import("./pages/Contact"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LocationsIndex = lazy(() => import("./pages/LocationsIndex"));
const LocationPage = lazy(() => import("./pages/LocationPage"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" richColors closeButton />
          <CustomCursor />
          <SplashScreen />
          <BrowserRouter>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:serviceId" element={<ServiceDetail />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/locations" element={<LocationsIndex />} />
                <Route path="/locations/:slug" element={<LocationPage />} />
                <Route path="/admin-settings" element={<AdminSettings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <CookieConsent />
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
