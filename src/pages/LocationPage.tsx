import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, Phone, ChevronRight } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AppointmentDialog from "@/components/AppointmentDialog";
import { locationsBySlug, locations } from "@/content/locations/_index";

const SITE = "https://adhunik-lakva-polio-hospital-gitana.vercel.app";

const LocationPage = () => {
  const { slug = "" } = useParams();
  const data = locationsBySlug[slug];
  const [open, setOpen] = useState(false);

  if (!data) return <Navigate to="/locations" replace />;

  const canonical = `${SITE}/locations/${data.slug}`;
  const others = locations.filter((l) => l.slug !== data.slug).slice(0, 4);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      name: "Aadhunik Lakva Polio Hospital",
      url: canonical,
      areaServed: data.cityLabel,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Geetanagar Basahi",
        addressLocality: "Buxar",
        addressRegion: "Bihar",
        addressCountry: "IN",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
        { "@type": "ListItem", position: 3, name: data.h1, item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.keywords} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/locations" className="hover:text-primary">Locations</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{data.cityLabel}</span>
          </nav>

          {/* Hero */}
          <header className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">{data.h1}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{data.intro}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button onClick={() => setOpen(true)} className="gradient-primary text-white">
                Book Appointment
              </Button>
              <Button variant="outline" asChild>
                <a href="tel:+919110142755"><Phone className="w-4 h-4 mr-2" />Call 9110142755</a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.mapEmbedQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="w-4 h-4 mr-2" />Get Directions
                </a>
              </Button>
            </div>
          </header>

          {/* Sections */}
          <div className="grid lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2 space-y-8">
              {data.sections.map((s, i) => (
                <section key={i} className="bg-card border rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-semibold mb-3 text-foreground">{s.heading}</h2>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                </section>
              ))}

              {/* FAQs */}
              <section className="bg-card border rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Frequently asked questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {data.faqs.map((f, i) => (
                    <AccordionItem key={i} value={`f${i}`}>
                      <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                      <AccordionContent>{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-card border rounded-xl overflow-hidden">
                <iframe
                  title={`Map to ${data.h1}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(data.mapEmbedQuery)}&output=embed`}
                  width="100%"
                  height="260"
                  loading="lazy"
                  style={{ border: 0 }}
                />
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-semibold mb-3 text-foreground">Areas we serve near {data.cityLabel}</h3>
                <ul className="flex flex-wrap gap-2">
                  {data.nearbyAreas.map((a) => (
                    <li key={a} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">{a}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-semibold mb-3 text-foreground">Other locations</h3>
                <ul className="space-y-2">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link to={`/locations/${o.slug}`} className="text-sm text-primary hover:underline">
                        {o.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <AppointmentDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default LocationPage;
