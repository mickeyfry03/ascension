import type { Metadata } from "next";
import Link from "next/link";
import { NeedCard } from "@/components/NeedCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/lib/types";
import { listVerifiedNeeds } from "@/server/services/requests";

export const metadata: Metadata = { title: "Verified needs" };
export const dynamic = "force-dynamic";

export default async function NeedsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const active = CATEGORIES.find((c) => c === category) as Category | undefined;
  const needs = await listVerifiedNeeds(active);

  return (
    <section className="py-16">
      <div className="container-page">
        <SectionHeading eyebrow="Verified needs" title="Give help where it counts" intro="Every request below has been reviewed and verified by our team." />
        <nav aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
          <Link href="/needs" className={active ? "btn-ghost !py-2" : "btn-primary !py-2"}>All</Link>
          {CATEGORIES.map((c) => (
            <Link key={c} href={`/needs?category=${c}`} className={active === c ? "btn-primary !py-2" : "btn-ghost !py-2"}>{CATEGORY_LABELS[c]}</Link>
          ))}
        </nav>
        {needs.length === 0 ? (
          <p className="text-muted">No verified needs in this category right now. Please check back soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{needs.map((n) => <NeedCard key={n.id} need={n} />)}</div>
        )}
      </div>
    </section>
  );
}
