import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { steps } from "@/data/content";

export const metadata: Metadata = { title: "How it works" };

export default function HowItWorksPage() {
  return (
    <section className="py-16">
      <div className="container-page">
        <SectionHeading eyebrow="How it works" title="From need to verified support" intro="A clear path for people asking for help and people giving it." />
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="card p-7">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft font-extrabold text-brand-deep">{i + 1}</span>
              <h3 className="text-xl font-extrabold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/request" className="btn-primary">Get help</Link>
          <Link href="/needs" className="btn-secondary">Give help</Link>
        </div>
      </div>
    </section>
  );
}
