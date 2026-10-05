import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgressBar } from "@/components/ProgressBar";
import { SupportForm } from "@/components/SupportForm";
import { formatCurrency } from "@/lib/format";
import { CATEGORY_LABELS } from "@/lib/types";
import { getVerifiedNeed } from "@/server/services/requests";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const need = await getVerifiedNeed((await params).id);
  return { title: need?.title ?? "Need not found" };
}

export default async function NeedPage({ params }: { params: Promise<{ id: string }> }) {
  const need = await getVerifiedNeed((await params).id);
  if (!need) notFound();
  const remaining = Math.max(0, need.amountCents - need.raisedCents);

  return (
    <section className="py-16">
      <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <Link href="/needs" className="text-sm font-bold text-brand-deep">← All verified needs</Link>
          <div className="mt-4 flex gap-2 text-xs font-extrabold">
            <span className="rounded-full bg-brand-soft px-3 py-1 text-brand-deep">{CATEGORY_LABELS[need.category]}</span>
            <span className="rounded-full bg-success-soft px-3 py-1 text-success">✓ Verified</span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight">{need.title}</h1>
          <p className="mt-2 font-semibold text-muted">{need.requesterName} · {need.location}</p>
          <p className="mt-6 whitespace-pre-line text-lg text-muted">{need.story}</p>
        </div>
        <aside className="card h-fit space-y-4 p-6">
          <p className="text-3xl font-extrabold">{formatCurrency(need.raisedCents)} <span className="text-base font-medium text-muted">of {formatCurrency(need.amountCents)}</span></p>
          <ProgressBar raisedCents={need.raisedCents} amountCents={need.amountCents} />
          {remaining > 0 ? <SupportForm requestId={need.id} remainingDollars={remaining / 100} /> : <p className="font-semibold text-success">Fully funded. Thank you to everyone who gave!</p>}
        </aside>
      </div>
    </section>
  );
}
