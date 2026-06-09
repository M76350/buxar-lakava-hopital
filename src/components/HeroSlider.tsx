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
    <section className="relative h-screen w-full overflow-hidden">
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
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white animate-fade-in">
          <p className="text-sm md:text-base mb-3 text-white/85 uppercase tracking-wider">
            {slides[currentIndex].subtitle}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Aadhunik Lakva Polio Hospital
            <span className="block text-xl md:text-2xl lg:text-3xl font-medium mt-2 text-white/95">
              Geetanagar Basahi, Buxar &middot; Near Kochas, Rohtas Border
            </span>
          </h1>
          <p className="text-base md:text-lg mb-3 text-white/90 max-w-2xl">
            {slides[currentIndex].title} &mdash; {slides[currentIndex].description}
          </p>
          <p className="text-sm md:text-base mb-8 text-white/80 max-w-2xl flex items-center gap-2">
            <svg className="w-4 h-4 inline" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
            Geetanagar Basahi, Buxar, Bihar 802101 &middot; Dr Vishesh Kumar &middot; +91 9110142755
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="gradient-primary text-white hover:opacity-90 transition-opacity text-lg px-8 py-6"
              onClick={() => setAppointmentOpen(true)}
            >
              {t("bookAppointment")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-6"
              onClick={() => navigate('/services')}
            >
              {t("learnMore")}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={prevSlide}
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        onClick={nextSlide}
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      <AppointmentDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} />
    </section>
  );
};

export default HeroSlider;
