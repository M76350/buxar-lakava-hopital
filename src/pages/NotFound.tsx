import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | Aadhunik Lakva Polio Hospital, Buxar</title>
        <meta name="description" content="The page you are looking for does not exist. Return to Aadhunik Lakva Polio Hospital home." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
        <div className="max-w-xl text-center animate-fade-in">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
            <h1 className="relative text-[8rem] md:text-[10rem] font-bold leading-none gradient-primary bg-clip-text text-transparent">
              404
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Sorry, the page you were looking for could not be found at
            <span className="font-mono text-foreground mx-1">{location.pathname}</span>.
            It may have been moved or removed. Let&apos;s get you back to caring hands.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="gradient-primary text-white">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services">
                <Search className="w-4 h-4 mr-2" />
                Browse Services
              </Link>
            </Button>
            <Button size="lg" variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
