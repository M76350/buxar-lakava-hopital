export interface LocationSection {
  heading: string;
  body: string;
  image?: string;
}

export interface LocationFAQ {
  q: string;
  a: string;
}

export interface LocationPageData {
  slug: string;
  h1: string;
  title: string;
  description: string;
  keywords: string;
  heroImage?: string;
  intro: string;
  sections: LocationSection[];
  faqs: LocationFAQ[];
  nearbyAreas: string[];
  mapEmbedQuery: string;
  cityLabel: string;
}
