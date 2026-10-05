import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = { title: "About" };

const values = [
  { t: "Verified first", d: "Nothing is shown to supporters until our team has reviewed it." },
  { t: "Direct and specific", d: "Each gift supports a particular need, not a general fund." },
  { t: "Dignity always", d: "People are treated with respect and share only what is necessary." },
];

export default function AboutPage() {
  return (
    <section className="py-16">
      <div className="container-page">
        <SectionHeading eyebrow="About & trust" title="Trust is the foundation of giving." intro="Ascension exists to make it easy for neighbors to help neighbors, with the confidence that every need is real." />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.t} className="card p-7"><h3 className="text-xl font-extrabold">{v.t}</h3><p className="mt-2 text-muted">{v.d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}
