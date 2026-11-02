import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: {
    absolute: "German, French & Spoken English Institute in Sonipat | Fluency Nest",
  },
  description:
    "Fluency Nest is Sonipat's premier German language institute — offline centre coming soon in Sonipat! Certified Goethe & Telc exam coaching (A1–C2), French & Spoken English classes, and live interactive online batches nationwide.",
  keywords: [
    "German Language Institute in Sonipat",
    "French Language Institute in Sonipat",
    "Spoken English & Public Speaking Institute in Sonipat",
    "german language course in sonipat",
    "german language course sonipat",
    "sonipat german language institute",
    "german language institute in sonipat",
    "german language institute sonipat",
    "french language institute in sonipat",
    "spoken english institute in sonipat",
    "public speaking institute in sonipat",
    "german classes in sonipat",
    "french classes in sonipat",
    "spoken english classes sonipat",
    "foreign language classes near me Sonipat",
    "Goethe exam preparation Sonipat",
    "Fluency Nest Sonipat",
    "offline classes in sonipat coming soon",
    "language school Haryana",
  ],
  alternates: {
    canonical: "https://www.fluencynest.in",
  },
  openGraph: {
    title: "German, French & Spoken English Institute in Sonipat | Fluency Nest",
    description:
      "Premier language institute in Sonipat for German, French, and Spoken English & Public Speaking. Offline centre coming soon in Sonipat & live online batches active nationwide.",
    url: "https://www.fluencynest.in",
    siteName: "Fluency Nest",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fluency Nest — German, French & Spoken English Institute in Sonipat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "German, French & Spoken English Institute in Sonipat | Fluency Nest",
    description:
      "Premier language institute in Sonipat for German, French, and Spoken English & Public Speaking. Live online batches active nationwide & Sonipat offline centre coming soon.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <HomePage />;
}
