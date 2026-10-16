import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Fluency Nest — German, French & English Language Institute | Online & Offline",
  description:
    "Est. 2024. Premier German (A1–C2), French & English language education with live online classes nationwide, plus dedicated offline classroom batches if you prefer in-person learning.",
};

export default function Page() {
  return <HomePage />;
}
