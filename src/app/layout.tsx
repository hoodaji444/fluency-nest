import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";
import { SITE_CONFIG } from "@/lib/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: `${SITE_CONFIG.name} — German, French & English Language Institute`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "German language course online India",
    "learn German online and offline",
    "German classes near me",
    "German A1 A2 B1 B2 C1 C2",
    "online German classes India",
    "German institute in Sonipat",
    "Goethe exam preparation",
    "study in Germany language course",
    "Fluency Nest",
    "French language course",
    "English fluency classes",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — German, French & English Language Institute`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Language Institute`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — German, French & English Language Institute`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "qsAiWV1qE-6oghitTWUH9AtGBCsypuntP5rn04a78xg",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1b2e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: "Inter, sans-serif",
              borderRadius: "12px",
              padding: "14px 20px",
              fontSize: "0.95rem",
              boxShadow: "0 8px 32px rgba(13,27,46,0.18)",
            },
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["EducationalOrganization", "LanguageSchool", "LocalBusiness"],
              "name": SITE_CONFIG.name,
              "alternateName": "Fluency Nest German Language Institute",
              "url": SITE_CONFIG.siteUrl,
              "logo": `${SITE_CONFIG.siteUrl}/logo.png`,
              "image": `${SITE_CONFIG.siteUrl}/og-image.png`,
              "description": SITE_CONFIG.description,
              "telephone": SITE_CONFIG.phone,
              "email": SITE_CONFIG.email,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": SITE_CONFIG.address.line1,
                "addressLocality": SITE_CONFIG.address.city,
                "addressRegion": SITE_CONFIG.address.state,
                "postalCode": SITE_CONFIG.address.pin,
                "addressCountry": "IN",
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.009771,
                "longitude": 77.077504,
              },
              "sameAs": [
                SITE_CONFIG.social.instagram,
                SITE_CONFIG.social.facebook,
              ],
              "priceRange": "₹₹",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  "opens": "09:00",
                  "closes": "19:00",
                },
              ],
            }),
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
