import type { Metadata } from "next";
import { RequestForm } from "@/components/RequestForm";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Get help" };

export default function RequestPage() {
  return (
    <section className="py-16">
      <div className="container-page max-w-3xl">
        <SectionHeading eyebrow="Get help" title="Tell us what you need" intro="Share your situation. Once verified, your request is shown to supporters who want to help." />
        <RequestForm />
      </div>
    </section>
  );
}
