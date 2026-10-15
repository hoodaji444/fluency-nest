import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Fluency Nest — German Language Institute in Sonipat, Haryana",
  description:
    "Teaching since 2024. Proven online language training, now expanding with our dedicated offline institute in Sonipat, Haryana. Learn German (A1–C2), French & English. Enquire now.",
};

export default function Page() {
  return <HomePage />;
}
