import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Fluency Nest — German Language Institute in Sonipat, Haryana",
  description:
    "Learn German, French & English at Fluency Nest in Sonipat, Haryana. Structured A1–B2 German courses with expert guidance. Online & offline classes available. Enquire now.",
};

export default function Page() {
  return <HomePage />;
}
