import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import AppointmentDialog from "./AppointmentDialog";
import DRLogo from "@/assets/DR_logo.jpg";
import { gsap } from "gsap";

interface NavChild {
  label: string;
  path: string;
}
interface NavItem {
  label: string;
  path: string;
  children?: NavChild[];
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDrop, setMobileOpenDrop] = useState<string | null>(null);
  const location = useLocation();
  const { language, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" });
      const links = navRef.current?.querySelectorAll(".nav-link");
      if (links) gsap.fromTo(links, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.2 });
    });
    return () => ctx.revert();
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setOpenDropdown(null);
    setIsOpen(false);
    setMobileOpenDrop(null);
  }, [location.pathname]);

  const navItems: NavItem[] = [
    { label: t("home"), path: "/" },
    {
      label: language === "en" ? "About" : "हमारे बारे में",
      path: "/about",
      children: [
        { label: language === "en" ? "About Hospital" : "अस्पताल के बारे में", path: "/about" },
        { label: language === "en" ? "Our Doctors" : "हमारे डॉक्टर", path: "/doctors" },
        { label: language === "en" ? "Gallery" : "गैलरी", path: "/gallery" },
      ],
    },
    {
      label: language === "en" ? "Services" : "सेवाएं",
      path: "/services",
      children: [
        { label: language === "en" ? "All Services" : "सभी सेवाएं", path: "/services" },
        { label: language === "en" ? "Polio Treatment" : "पोलियो उपचार", path: "/services" },
        { label: language === "en" ? "Paralysis Care" : "लकवा देखभाल", path: "/services" },
        { label: language === "en" ? "Physiotherapy" : "फिजियोथेरेपी", path: "/services" },
      ],
    },
    {
      label: language === "en" ? "Contact" : "संपर्क",
      path: "/contact",
      children: [
        { label: language === "en" ? "Contact Us" : "संपर्क करें", path: "/contact" },
        { label: language === "en" ? "Book Appointment" : "अपॉइंटमेंट बुक करें", path: "/contact" },
      ],
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link ref={logoRef} to="/" className="flex items-center group" aria-label="Aadhunik Lakva Polio Hospital home">
            <div className="w-52 h-14 overflow-hidden bg-gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform rounded">
              <img src={DRLogo} alt="Aadhunik Lakva Polio Hospital Geetanagar Basahi Buxar" className="w-full h-full object-cover" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`nav-link inline-flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors hover:text-primary hover:bg-primary/5 ${
                    isActive(item.path) ? "text-primary font-semibold" : "text-foreground/80 font-medium"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4 opacity-70" />}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 min-w-[220px] animate-fade-in">
                    <div className="bg-card border border-border shadow-xl rounded-lg overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block px-4 py-2.5 text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button className="ml-2 gradient-primary text-white hover:opacity-90" onClick={() => setAppointmentOpen(true)}>
              {t("bookAppointment")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-border/40">
                  <div className="flex items-center">
                    <Link
                      to={item.path}
                      onClick={() => !item.children && setIsOpen(false)}
                      className={`flex-1 px-4 py-3 text-sm font-medium ${
                        isActive(item.path) ? "text-primary" : "text-foreground/80"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        onClick={() => setMobileOpenDrop(mobileOpenDrop === item.label ? null : item.label)}
                        className="p-3"
                        aria-label="Expand"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${mobileOpenDrop === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>
                  {item.children && mobileOpenDrop === item.label && (
                    <div className="bg-muted/40 animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          onClick={() => setIsOpen(false)}
                          className="block pl-8 pr-4 py-2 text-sm text-foreground/70 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full mt-3 gap-2"
              >
                {theme === "dark" ? <><Sun className="w-4 h-4" /> Light Mode</> : <><Moon className="w-4 h-4" /> Dark Mode</>}
              </Button>
              <Button
                className="gradient-primary text-white w-full mt-2"
                onClick={() => {
                  setAppointmentOpen(true);
                  setIsOpen(false);
                }}
              >
                {t("bookAppointment")}
              </Button>
            </div>
          </div>
        )}
      </div>

      <AppointmentDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} />
    </nav>
  );
};

export default Navbar;
