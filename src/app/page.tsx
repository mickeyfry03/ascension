import Link from "next/link";
import { NeedCard } from "@/components/NeedCard";
import { SectionHeading } from "@/components/SectionHeading";
import { steps } from "@/data/content";
import { formatCurrency } from "@/lib/format";
import { listVerifiedNeeds } from "@/server/services/requests";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const needs = await listVerifiedNeeds();
  const featured = needs.slice(0, 3);
  const raised = needs.reduce((sum, n) => sum + n.raisedCents, 0);
  const goal = needs.reduce((sum, n) => sum + n.amountCents, 0);

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-deep">Verified giving, direct impact</p>
            <h1 className="max-w-xl text-5xl font-extrabold leading-[0.98] sm:text-6xl">Helping people rise with direct support from people who care.</h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Ascension is a verified giving platform connecting people who need help with people who want to make a direct difference.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/request" className="btn-primary">Get help</Link>
              <Link href="/needs" className="btn-secondary">Give help</Link>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-bold text-muted">
              <li>• Verified requests</li><li>• Transparent support</li><li>• Direct impact</li>
            </ul>
          </div>
          <div className="card bg-gradient-to-b from-white to-[#fff4ee] p-7">
            <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-extrabold text-success">Community impact</span>
            <p className="mt-6 text-5xl font-extrabold tracking-tighter">{formatCurrency(raised)}</p>
            <p className="text-muted">pledged directly across {needs.length} verified needs</p>
            <div className="my-6 h-3 overflow-hidden rounded-full bg-brand/10">
              <span className="block h-full rounded-full bg-gradient-to-r from-brand to-brand-sand" style={{ width: `${goal ? Math.round((raised / goal) * 100) : 0}%` }} />
            </div>
            <p className="text-sm text-muted">Every request is reviewed by a real person before it is shown.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white/40 py-4 text-center font-bold text-muted">
        <div className="container-page">Every request is verified · Every gift goes to a specific need · Every outcome is visible</div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <SectionHeading center eyebrow="How it works" title="Simple, transparent, human." />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="card p-7">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft font-extrabold text-brand-deep">{i + 1}</span>
                <h3 className="text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/30 py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Verified needs" title="People you can help today" intro="Each of these requests has been reviewed by our team." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((n) => <NeedCard key={n.id} need={n} />)}
          </div>
          <div className="mt-8 text-center"><Link href="/needs" className="btn-primary">Browse all verified needs</Link></div>
        </div>
      </section>
    </>
  );
}
