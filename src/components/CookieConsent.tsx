import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const COOKIE_KEY = "alh_cookie_consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function setLongCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; max-age=${ONE_YEAR_SECONDS}; path=/; SameSite=Lax`;
}

function hasConsent() {
  if (typeof window === "undefined") return true;
  if (localStorage.getItem(COOKIE_KEY)) return true;
  return document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE_KEY}=`));
}

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!hasConsent()) setShow(true);
      else {
        // Re-stamp 1-year storage so returning visitors stay remembered
        setLongCookie(COOKIE_KEY, "accepted");
        localStorage.setItem(COOKIE_KEY, "accepted");
      }
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  const accept = () => {
    setLongCookie(COOKIE_KEY, "accepted");
    localStorage.setItem(COOKIE_KEY, "accepted");
    localStorage.setItem("alh_visited_at", new Date().toISOString());
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[9990] animate-fade-in">
      <div className="bg-card border border-border shadow-2xl rounded-xl p-5 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-foreground text-base">We use necessary cookies</h2>
            <p className="text-sm text-muted-foreground mt-1">
              We use essential cookies to remember your preferences and improve your experience on
              Aadhunik Lakva Polio Hospital. Your data stays on your device for up to 1 year.
            </p>
          </div>
          <button
            onClick={() => setShow(false)}
            aria-label="Dismiss"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2 justify-end">
          <Button size="sm" onClick={accept} className="gradient-primary text-white">
            Accept &amp; Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
