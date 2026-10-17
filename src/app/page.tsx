import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Best German, French & English Classes in Sonipat | Fluency Nest Institute (SCO-10)",
  description:
    "Haryana's premier language institute at SCO-10, Eldeco County, Murthal, Sonipat. Certified Goethe, Telc & DELF exam prep (A1–C2), air-conditioned smart classrooms, and live online batches nationwide.",
  keywords: [
    "German classes in Sonipat",
    "German language institute Sonipat",
    "French classes in Sonipat",
    "Spoken English institute Sonipat",
    "SCO 10 Eldeco County Murthal Sonipat",
    "German coaching DCRUST Murthal",
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
