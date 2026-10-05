import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs } from "@/data/content";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <section className="py-16">
      <div className="container-page max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="card p-6">
              <summary className="cursor-pointer font-extrabold">{f.q}</summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
