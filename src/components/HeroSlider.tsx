import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import AppointmentDialog from "./AppointmentDialog";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
}

const HeroSlider = ({ slides }: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide right to left
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background Images with Transition */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.image && (
            <img
              src={slide.image}
              alt={slide.title}
              loading={index === 0 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(214_67%_8%/0.85)] via-[hsl(214_67%_8%/0.6)] to-[hsl(214_67%_8%/0.2)]" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto h-full min-h-[100svh] flex items-center pt-24 pb-20 sm:pt-28 sm:pb-24">
        <div className="max-w-3xl text-white animate-fade-in">
          <p className="inline-block text-[11px] sm:text-xs md:text-sm mb-3 sm:mb-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 uppercase tracking-widest text-white/90">
            {slides[currentIndex].subtitle}
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-3 sm:mb-4 leading-[1.15] text-balance">
            Aadhunik Lakva Polio Hospital
            <span className="block text-base sm:text-xl md:text-2xl lg:text-3xl font-medium mt-2 text-white/90">
              Geetanagar Basahi, Buxar &middot; Near Kochas, Rohtas Border
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-3 text-white/90 max-w-2xl leading-relaxed">
            {slides[currentIndex].title} &mdash; {slides[currentIndex].description}
          </p>
          <p className="text-xs sm:text-sm md:text-base mb-6 sm:mb-8 text-white/75 max-w-2xl flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
            <span>Geetanagar Basahi, Buxar, Bihar 802101 &middot; Dr Vishesh Kumar &middot; +91 9110142755</span>
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Button
              size="lg"
              className="gradient-primary text-white hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
              onClick={() => setAppointmentOpen(true)}
            >
              {t("bookAppointment")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/25 hover:bg-white/20 backdrop-blur-sm text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
              onClick={() => navigate('/services')}
            >
              {t("learnMore")}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons - hidden on small screens */}
      <Button
        onClick={prevSlide}
        variant="outline"
        size="icon"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        onClick={nextSlide}
        variant="outline"
        size="icon"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <AppointmentDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} />
    </section>
  );
};

export default HeroSlider;
