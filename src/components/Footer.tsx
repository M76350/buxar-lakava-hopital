import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();

  const cycleLang = () => {
    const langs: ("en" | "hi" | "bho")[] = ["en", "hi", "bho"];
    const next = langs[(langs.indexOf(language) + 1) % langs.length];
    setLanguage(next);
  };
  const langLabel = language === "en" ? "हिंदी" : language === "hi" ? "भोजपुरी" : "English";
  
  return (
    <footer className="bg-gradient-to-br from-primary to-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight">
                  {language === "en" ? "Aadhunik Lakava" : "आधुनिक लकवा"}
                </span>
                <span className="text-sm text-white/90 leading-tight">
                  {language === "en" ? "Polio Hospital" : "पोलियो अस्पताल"}
                </span>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              {language === "en" 
                ? "Your trusted healthcare partner in Buxar, providing specialized polio and paralysis treatment with compassion."
                : "बक्सर में आपका विश्वसनीय स्वास्थ्य साथी, करुणा के साथ विशेष पोलियो और लकवा उपचार प्रदान करता है।"}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors text-sm">{t("about")}</Link></li>
              <li><Link to="/services" className="text-white/80 hover:text-white transition-colors text-sm">{t("services")}</Link></li>
              <li><Link to="/doctors" className="text-white/80 hover:text-white transition-colors text-sm">{t("doctors")}</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors text-sm">{t("contact")}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("ourServices")}</h3>
            <ul className="space-y-2">
              <li className="text-white/80 text-sm">
                {language === "en" ? "Polio Treatment" : "पोलियो उपचार"}
              </li>
              <li className="text-white/80 text-sm">
                {language === "en" ? "Paralysis Care" : "लकवा देखभाल"}
              </li>
              <li className="text-white/80 text-sm">
                {language === "en" ? "Physiotherapy" : "फिजियोथेरेपी"}
              </li>
              <li className="text-white/80 text-sm">
                {language === "en" ? "Orthopedics" : "आर्थोपेडिक्स"}
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  {language === "en" 
                    ? "Geeta Nagar Basahi, Buxar, Bihar"
                    : "गीता नगर बसाही, बक्सर, बिहार"}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-white/80 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-white/80 text-sm">info@aadhunikpolihospital.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} {t("hospitalName")} - {t("hospitalLocation")}. {t("allRightsReserved")}.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-xs">Language:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={cycleLang}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2"
            >
              <Languages className="w-4 h-4" />
              {langLabel}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
