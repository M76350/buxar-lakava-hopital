import { useState } from "react";
import { FaHeart, FaBrain, FaBone, FaBaby, FaEye, FaHeartbeat, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import GSAPWrapper from "@/components/GSAPWrapper";
import cardiologyImg from "@/assets/service-cardiology.jpg";
import neurologyImg from "@/assets/service-neurology.jpg";
import orthopedicsImg from "@/assets/service-orthopedics.jpg";

const Services = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const services = [
    {
      id: "cardiology",
      icon: FaHeart,
      titleKey: "cardiology",
      descKey: "cardiologyDesc",
      image: cardiologyImg,
      color: "from-red-500 to-pink-500",
      extraInfo: language === "en" 
        ? "Our cardiology department offers comprehensive heart care including ECG, echocardiography, stress testing, and cardiac rehabilitation. Our experienced cardiologists provide personalized treatment plans for heart conditions."
        : "हमारा हृदय रोग विभाग ईसीजी, इकोकार्डियोग्राफी, स्ट्रेस टेस्टिंग और कार्डियक रिहैबिलिटेशन सहित व्यापक हृदय देखभाल प्रदान करता है।",
    },
    {
      id: "neurology",
      icon: FaBrain,
      titleKey: "neurology",
      descKey: "neurologyDesc",
      image: neurologyImg,
      color: "from-purple-500 to-indigo-500",
      extraInfo: language === "en"
        ? "Specialized care for brain, spine, and nervous system disorders. We offer EEG, EMG, nerve conduction studies, and treatment for stroke, epilepsy, and movement disorders."
        : "मस्तिष्क, रीढ़ और तंत्रिका तंत्र विकारों के लिए विशेष देखभाल। हम ईईजी, ईएमजी, और स्ट्रोक, मिर्गी के उपचार प्रदान करते हैं।",
    },
    {
      id: "orthopedics",
      icon: FaBone,
      titleKey: "orthopedics",
      descKey: "orthopedicsDesc",
      image: orthopedicsImg,
      color: "from-blue-500 to-cyan-500",
      extraInfo: language === "en"
        ? "Complete bone and joint care including fracture treatment, joint replacement, sports injuries, and physiotherapy. Our orthopedic specialists use modern techniques for faster recovery."
        : "फ्रैक्चर उपचार, जोड़ प्रतिस्थापन, खेल चोटों और फिजियोथेरेपी सहित पूर्ण हड्डी और जोड़ों की देखभाल।",
    },
    {
      id: "pediatrics",
      icon: FaBaby,
      titleKey: "pediatrics",
      descKey: "pediatricsDesc",
      image: null,
      color: "from-green-500 to-emerald-500",
      extraInfo: language === "en"
        ? "Dedicated child healthcare with vaccination, growth monitoring, and treatment for childhood illnesses. Our pediatricians ensure your child's healthy development."
        : "टीकाकरण, विकास निगरानी और बचपन की बीमारियों के उपचार के साथ समर्पित बाल स्वास्थ्य देखभाल।",
    },
    {
      id: "ophthalmology",
      icon: FaEye,
      titleKey: "ophthalmology",
      descKey: "ophthalmologyDesc",
      image: null,
      color: "from-amber-500 to-orange-500",
      extraInfo: language === "en"
        ? "Comprehensive eye care including vision testing, cataract surgery, glaucoma treatment, and diabetic eye screening. Advanced equipment for accurate diagnosis."
        : "दृष्टि परीक्षण, मोतियाबिंद सर्जरी, ग्लूकोमा उपचार और मधुमेह नेत्र जांच सहित व्यापक नेत्र देखभाल।",
    },
    {
      id: "emergency-care",
      icon: FaHeartbeat,
      titleKey: "emergencyCare",
      descKey: "emergencyCareDesc",
      image: null,
      color: "from-rose-500 to-red-500",
      extraInfo: language === "en"
        ? "24/7 emergency services with fully equipped ambulance, trauma care, and immediate medical attention. Our emergency team is always ready to handle critical situations."
        : "पूरी तरह से सुसज्जित एम्बुलेंस, ट्रॉमा केयर और तत्काल चिकित्सा सहायता के साथ 24/7 आपातकालीन सेवाएं।",
    },
  ];

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section className="py-14 sm:py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto">
        <GSAPWrapper animation="fadeUp" className="text-center mb-10 sm:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            {t("ourServices")}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-3 sm:mb-4 text-balance">
            {t("servicesTitle")}
          </h2>
          <p className="text-sm sm:text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            {t("servicesDescription")}
          </p>
        </GSAPWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, index) => (
            <GSAPWrapper 
              key={service.id}
              animation={index % 2 === 0 ? "fadeLeft" : "fadeRight"}
              delay={index * 0.1}
            >
              <Card
                className={`group hover-lift border-0 shadow-lg bg-card overflow-hidden cursor-pointer transition-all duration-500 ${
                  expandedCard === service.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => toggleCard(service.id)}
              >
                <CardContent className="p-0">
                  {service.image ? (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={t(service.titleKey)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80 group-hover:opacity-70 transition-opacity`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center icon-flip">
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`h-48 bg-gradient-to-br ${service.color} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform icon-flip">
                        <service.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                        {t(service.titleKey)}
                      </h3>
                      <span className="text-primary transition-transform duration-300">
                        {expandedCard === service.id ? (
                          <FaChevronUp className="w-5 h-5" />
                        ) : (
                          <FaChevronDown className="w-5 h-5" />
                        )}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                      {t(service.descKey)}
                    </p>
                    
                    {/* Expandable Content */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      expandedCard === service.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-4 border-t border-primary/20">
                        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">
                          {service.extraInfo}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/services');
                      }}
                      variant="outline"
                      className="w-full bg-primary/5 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      {t("learnMore") || "Learn More"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </GSAPWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
