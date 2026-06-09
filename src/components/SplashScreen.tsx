import { useEffect, useState } from "react";
import DRLogo from "@/assets/DR_logo.jpg";

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), 2200);
    const hideTimer = setTimeout(() => setVisible(false), 2900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-secondary transition-opacity duration-700 ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-label="Loading Aadhunik Lakva Polio Hospital"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-white/30 blur-2xl animate-ping" />
        <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-white/40 shadow-2xl animate-scale-in">
          <img src={DRLogo} alt="Aadhunik Lakva Polio Hospital logo" className="w-full h-full object-cover" />
        </div>
      </div>
      <h1 className="mt-6 text-2xl md:text-3xl font-bold text-white text-center px-4 animate-fade-in">
        Aadhunik Lakva Polio Hospital
      </h1>
      <p className="mt-2 text-white/85 text-sm md:text-base animate-fade-in">
        Geetanagar Basahi, Buxar &middot; Dr Vishesh Kumar
      </p>
      <div className="mt-8 flex gap-2">
        <span className="w-3 h-3 rounded-full bg-white animate-bounce" />
        <span className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: "0.15s" }} />
        <span className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: "0.3s" }} />
      </div>
    </div>
  );
};

export default SplashScreen;
