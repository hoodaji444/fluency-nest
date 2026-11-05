import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import "@/app/tokens.css";
import "@/app/globals.css";
import { SITE_CONFIG, FAQ_ITEMS } from "@/lib/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeadPopup from "@/components/LeadPopup";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: `${SITE_CONFIG.name} — German, French & Spoken English Institute in Sonipat`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "German Language Institute in Sonipat",
    "French Language Institute in Sonipat",
    "Spoken English & Public Speaking Institute in Sonipat",
    "German language course online India",
    "learn German online and offline",
    "German classes near me Sonipat",
    "German A1 A2 B1 B2 C1 C2",
    "online German classes India",
    "German institute in Sonipat",
    "Goethe exam preparation Sonipat",
    "French classes in Sonipat",
    "DELF exam prep Sonipat",
    "TEF Canada French Sonipat",
    "Spoken English institute Sonipat",
    "public speaking course Sonipat",
    "Fluency Nest Sonipat",
    "offline classes in sonipat coming soon",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — German, French & Spoken English Institute in Sonipat`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — Language Institute in Sonipat`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — German, French & Spoken English Institute in Sonipat`,
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
      <head>
        {/* Fontshare & Google Fonts Preconnects */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Editorial Serif Display: Sentient (Fontshare) */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=sentient@400,500,700&display=swap"
          rel="stylesheet"
        />
        {/* Google Fonts: Source Serif 4 (Display Fallback) & Hanken Grotesk (Body) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: "var(--font-body)",
              borderRadius: "var(--radius-card, 4px)",
              padding: "12px 18px",
              fontSize: "var(--text-sm, 0.875rem)",
              color: "var(--color-ink)",
              backgroundColor: "var(--color-paper)",
              border: "1px solid var(--color-rule)",
              boxShadow: "var(--shadow-card)",
            },
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["EducationalOrganization", "LanguageSchool", "LocalBusiness"],
                  "@id": `${SITE_CONFIG.siteUrl}/#organization`,
                  "name": SITE_CONFIG.name,
                  "alternateName": "Fluency Nest German, French & English Language Institute",
                  "url": SITE_CONFIG.siteUrl,
                  "logo": `${SITE_CONFIG.siteUrl}/logo.png`,
                  "image": `${SITE_CONFIG.siteUrl}/og-image.png`,
                  "description": SITE_CONFIG.description,
                  "telephone": SITE_CONFIG.phone,
                  "email": SITE_CONFIG.email,
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": SITE_CONFIG.address.full,
                    "addressLocality": SITE_CONFIG.address.city,
                    "addressRegion": SITE_CONFIG.address.state,
                    "postalCode": SITE_CONFIG.address.pin,
                    "addressCountry": "IN",
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 28.993082,
                    "longitude": 77.015076,
                  },
                  "sameAs": [
                    SITE_CONFIG.social.instagram,
                    SITE_CONFIG.social.facebook,
                  ],
                  "priceRange": "₹₹",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "bestRating": "5",
                    "worstRating": "1",
                    "ratingCount": "48",
                    "reviewCount": "48"
                  },
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
                },
                {
                  "@type": "FAQPage",
                  "@id": `${SITE_CONFIG.siteUrl}/#faq`,
                  "mainEntity": FAQ_ITEMS.map((item) => ({
                    "@type": "Question",
                    "name": item.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": item.answer,
                    },
                  })),
                },
                {
                  "@type": "Course",
                  "@id": `${SITE_CONFIG.siteUrl}/#course-german-a1`,
                  "name": "German A1 Language Course (Beginner to CEFR A1)",
                  "description": "Start German language from absolute zero. Learn foundational vocabulary, everyday conversations, pronunciation, and Goethe-Zertifikat / Telc A1 preparation.",
                  "provider": {
                    "@type": "EducationalOrganization",
                    "name": SITE_CONFIG.name,
                    "sameAs": SITE_CONFIG.siteUrl,
                  },
                  "educationalLevel": "Beginner (CEFR A1)",
                  "courseWorkload": "PT60H",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "48"
                  },
                  "hasCourseInstance": [
                    {
                      "@type": "CourseInstance",
                      "courseMode": "ONLINE",
                      "courseWorkload": "PT60H",
                      "instructor": {
                        "@type": "Person",
                        "name": "Certified Goethe & Telc Language Mentor"
                      }
                    },
                    {
                      "@type": "CourseInstance",
                      "courseMode": "OFFLINE",
                      "courseWorkload": "PT60H",
                      "location": {
                        "@type": "Place",
                        "name": "Fluency Nest Sonipat Offline Centre (Coming Soon)",
                        "address": {
                          "@type": "PostalAddress",
                          "streetAddress": SITE_CONFIG.address.full,
                          "addressLocality": "Sonipat",
                          "addressRegion": "Haryana",
                          "postalCode": "131001",
                          "addressCountry": "IN"
                        }
                      }
                    }
                  ],
                },
                {
                  "@type": "Course",
                  "@id": `${SITE_CONFIG.siteUrl}/#course-german-b1`,
                  "name": "German B1 Course (Intermediate & Visa/Study Preparation)",
                  "description": "Independent communication, professional vocabulary, and targeted preparation for Goethe-Zertifikat B1 / Telc Deutsch B1 exams.",
                  "provider": {
                    "@type": "EducationalOrganization",
                    "name": SITE_CONFIG.name,
                    "sameAs": SITE_CONFIG.siteUrl,
                  },
                  "educationalLevel": "Intermediate (CEFR B1)",
                  "courseWorkload": "PT80H",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "48"
                  },
                  "hasCourseInstance": [
                    {
                      "@type": "CourseInstance",
                      "courseMode": "ONLINE",
                      "courseWorkload": "PT80H",
                      "instructor": {
                        "@type": "Person",
                        "name": "Certified Language Mentor"
                      }
                    },
                    {
                      "@type": "CourseInstance",
                      "courseMode": "OFFLINE",
                      "courseWorkload": "PT80H",
                      "location": {
                        "@type": "Place",
                        "name": "Fluency Nest Sonipat Offline Centre (Coming Soon)",
                        "address": {
                          "@type": "PostalAddress",
                          "streetAddress": SITE_CONFIG.address.full,
                          "addressLocality": "Sonipat",
                          "addressRegion": "Haryana",
                          "postalCode": "131001",
                          "addressCountry": "IN"
                        }
                      }
                    }
                  ],
                },
                {
                  "@type": "Course",
                  "@id": `${SITE_CONFIG.siteUrl}/#course-french-a1`,
                  "name": "French A1 Language Course (Beginner & DELF A1)",
                  "description": "Foundational French training covering phonetics, daily conversations, basic grammar, and DELF A1 exam preparation.",
                  "provider": {
                    "@type": "EducationalOrganization",
                    "name": SITE_CONFIG.name,
                    "sameAs": SITE_CONFIG.siteUrl,
                  },
                  "educationalLevel": "Beginner (CEFR A1)",
                  "courseWorkload": "PT60H",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "48"
                  },
                  "hasCourseInstance": [
                    {
                      "@type": "CourseInstance",
                      "courseMode": "ONLINE",
                      "courseWorkload": "PT60H",
                      "instructor": {
                        "@type": "Person",
                        "name": "Certified French Language Mentor"
                      }
                    },
                    {
                      "@type": "CourseInstance",
                      "courseMode": "OFFLINE",
                      "courseWorkload": "PT60H",
                      "location": {
                        "@type": "Place",
                        "name": "Fluency Nest Sonipat Offline Centre (Coming Soon)",
                        "address": {
                          "@type": "PostalAddress",
                          "streetAddress": SITE_CONFIG.address.full,
                          "addressLocality": "Sonipat",
                          "addressRegion": "Haryana",
                          "postalCode": "131001",
                          "addressCountry": "IN"
                        }
                      }
                    }
                  ],
                },
                {
                  "@type": "Course",
                  "@id": `${SITE_CONFIG.siteUrl}/#course-english-speaking`,
                  "name": "Spoken English & Corporate Communication Course",
                  "description": "Master English fluency without hesitation. Covers conversational ease, professional email drafting, interview skills, and IELTS foundation.",
                  "provider": {
                    "@type": "EducationalOrganization",
                    "name": SITE_CONFIG.name,
                    "sameAs": SITE_CONFIG.siteUrl,
                  },
                  "educationalLevel": "Foundational to Advanced",
                  "courseWorkload": "PT50H",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "48"
                  },
                  "hasCourseInstance": [
                    {
                      "@type": "CourseInstance",
                      "courseMode": "ONLINE",
                      "courseWorkload": "PT50H",
                      "instructor": {
                        "@type": "Person",
                        "name": "Executive Communication Trainer"
                      }
                    },
                    {
                      "@type": "CourseInstance",
                      "courseMode": "OFFLINE",
                      "courseWorkload": "PT50H",
                      "location": {
                        "@type": "Place",
                        "name": "Fluency Nest Sonipat Offline Centre (Coming Soon)",
                        "address": {
                          "@type": "PostalAddress",
                          "streetAddress": SITE_CONFIG.address.full,
                          "addressLocality": "Sonipat",
                          "addressRegion": "Haryana",
                          "postalCode": "131001",
                          "addressCountry": "IN"
                        }
                      }
                    }
                  ],
                },
              ],
            }),
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <LeadPopup />
      </body>
    </html>
  );
}
