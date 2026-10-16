import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Fluency Nest — German, French & English Language Institute | Online & Offline",
  description:
    "Est. 2024. Premier German (A1–C2), French & English language education with live online classes nationwide. If you prefer offline classes, join us in-person at SCO-10, Eldeco County, Murthal, Sonipat, Haryana — 131001.",
};

export default function Page() {
  return <HomePage />;
}
