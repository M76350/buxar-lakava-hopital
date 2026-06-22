import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import Services from "@/components/Services";
import DoctorsGallery from "@/components/DoctorsGallery";
import Testimonials from "@/components/Testimonials";
import HospitalMap from "@/components/HospitalMap";
import NearestLocations from "@/components/NearestLocations";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import GSAPWrapper from "@/components/GSAPWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Clock, Shield, Users, Activity } from "lucide-react";
import heroHospital from "@/assets/hero-hospital.jpg";
import serviceCardiology from "@/assets/service-cardiology.jpg";
import serviceNeurology from "@/assets/service-neurology.jpg";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const heroSlides = [
    {
      image: heroHospital,
      title: language === "en" ? "Excellence in Healthcare" : "स्वास्थ्य सेवा में उत्कृष्टता",
      subtitle: language === "en" ? "Trusted Medical Care" : "विश्वसनीय चिकित्सा देखभाल",
      description: language === "en" 
        ? "We have been serving the Buxar community for over 25 years with specialized care in polio treatment and rehabilitation."
        : "हम 25 से अधिक वर्षों से बक्सर समुदाय को पोलियो उपचार और पुनर्वास में विशेष देखभाल प्रदान कर रहे हैं।",
    },
    {
      image: serviceCardiology,
      title: language === "en" ? "Advanced Treatment Facilities" : "उन्नत उपचार सुविधाएं",
      subtitle: language === "en" ? "Modern Healthcare" : "आधुनिक स्वास्थ्य सेवा",
      description: language === "en"
        ? "State-of-the-art equipment and experienced medical professionals dedicated to your recovery."
        : "आपकी रिकवरी के लिए समर्पित अत्याधुनिक उपकरण और अनुभवी चिकित्सा पेशेवर।",
    },
    {
      image: serviceNeurology,
      title: language === "en" ? "Patient-Centered Care" : "रोगी-केंद्रित देखभाल",
      subtitle: language === "en" ? "Your Health, Our Priority" : "आपका स्वास्थ्य, हमारी प्राथमिकता",
      description: language === "en"
        ? "Compassionate care tailored to each patient's unique needs and circumstances."
        : "प्रत्येक रोगी की अनूठी जरूरतों और परिस्थितियों के अनुरूप दयालु देखभाल।",
    },
  ];

  const features = [
    {
      icon: Award,
      title: language === "en" ? "Excellence in Care" : "देखभाल में उत्कृष्टता",
      description: language === "en" ? "Award-winning medical services" : "पुरस्कार विजेता चिकित्सा सेवाएं",
    },
    {
      icon: Heart,
      title: language === "en" ? "Compassionate" : "दयालु",
      description: language === "en" ? "Treating patients like family" : "मरीजों को परिवार की तरह मानना",
    },
    {
      icon: Clock,
      title: language === "en" ? "24/7 Emergency" : "24/7 आपातकाल",
      description: language === "en" ? "Round-the-clock emergency care" : "चौबीसों घंटे आपातकालीन देखभाल",
    },
    {
      icon: Shield,
      title: language === "en" ? "Safety First" : "सुरक्षा पहले",
      description: language === "en" ? "Highest safety standards" : "उच्चतम सुरक्षा मानक",
    },
    {
      icon: Users,
      title: language === "en" ? "Expert Team" : "विशेषज्ञ टीम",
      description: language === "en" ? "Highly qualified professionals" : "उच्च योग्य पेशेवर",
    },
    {
      icon: Activity,
      title: language === "en" ? "Modern Equipment" : "आधुनिक उपकरण",
      description: language === "en" ? "Latest medical technology" : "नवीनतम चिकित्सा प्रौद्योगिकी",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Section 1: Hero Slider */}
        <HeroSlider slides={heroSlides} />

        {/* Section 2: Features */}
        <section className="py-14 sm:py-20 bg-background overflow-hidden">
          <div className="container mx-auto">
            <GSAPWrapper animation="fadeUp" className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-foreground mb-3 sm:mb-4 text-balance">
                {language === "en" ? "Why Choose Us" : "हमें क्यों चुनें"}
              </h2>
              <p className="text-sm sm:text-lg font-body text-muted-foreground max-w-2xl mx-auto">
                {language === "en" 
                  ? "Experience excellence in healthcare with our dedicated team of professionals"
                  : "हमारी समर्पित पेशेवर टीम के साथ स्वास्थ्य सेवा में उत्कृष्टता का अनुभव करें"}
              </p>
            </GSAPWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <GSAPWrapper 
                  key={index} 
                  animation={index % 2 === 0 ? "fadeLeft" : "fadeRight"}
                  delay={index * 0.1}
                >
                  <Card className="hover-lift border border-border/40 shadow-[var(--shadow-soft)] h-full bg-card">
                    <CardContent className="p-5 sm:p-6 text-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center shadow-[var(--shadow-glow)]">
                        <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm font-body text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </GSAPWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Services */}
        <Services />

        {/* Section 4: Doctors Gallery */}
        <DoctorsGallery />

        {/* Section 5: Testimonials */}
        <Testimonials />

        {/* Section 6: Hospital Map */}
        <HospitalMap />

        {/* Section 7: Nearest Locations */}
        <NearestLocations />

        {/* Section 8: CTA */}
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
};

export default Index;
