import type { Metadata } from "next";
import JoinPageClient from "@/components/JoinPageClient";

export const metadata: Metadata = {
  title: "Join Key Connections",
  description:
    "Experience, Empathy and Professionalism — build your real estate career at Key Connections Real Estate. Apply to join the team.",
};

export default function JoinPage() {
  return <JoinPageClient />;
}
