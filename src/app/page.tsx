import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Sonipat German Language Institute | Fluency Nest (Eldeco County)",
  description:
    "Fluency Nest is Sonipat's premier German language institute located at Eldeco County, Murthal. Certified Goethe & Telc exam coaching (A1–C2), air-conditioned smart classrooms, and live online batches nationwide.",
  keywords: [
    "german language course in sonipat",
    "german language course sonipat",
    "sonipat german language institute",
    "german language institute in sonipat",
    "german language institute sonipat",
    "german institute in sonipat",
    "german classes in sonipat",
    "german coaching murthal",
    "Eldeco County Murthal Sonipat",
    "foreign language classes near me Sonipat",
    "Goethe exam preparation Sonipat",
    "Fluency Nest Sonipat",
    "language school Haryana",
  ],
  alternates: {
    canonical: "https://www.fluencynest.in",
  },
};

export default function Page() {
  return <HomePage />;
}
