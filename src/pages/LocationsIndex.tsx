import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { locations } from "@/content/locations/_index";

const SITE = "https://adhunik-lakva-polio-hospital-gitana.vercel.app";

const LocationsIndex = () => {
  return (
    <>
      <Helmet>
        <title>Our Locations | Paralysis & Polio Hospital Near Buxar, Kochas, Rohtas</title>
        <meta
          name="description"
          content="Aadhunik Lakva Polio Hospital serves Buxar, Kochas, Rohtas border, Dehuan and surrounding villages. Find the right location page for your area."
        />
        <link rel="canonical" href={`${SITE}/locations`} />
      </Helmet>

      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Areas We Serve</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dedicated landing pages for every area we treat — Buxar, Kochas, Rohtas, Dehuan and more.
            </p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to={`/locations/${loc.slug}`}
                className="group bg-card border rounded-xl p-6 hover:shadow-lg hover:border-primary/40 transition-all"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-semibold leading-snug flex-1 group-hover:text-primary transition-colors">
                    {loc.h1}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{loc.description}</p>
                <span className="inline-flex items-center text-sm text-primary font-medium">
                  Read more <ChevronRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LocationsIndex;
