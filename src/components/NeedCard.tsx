import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { CATEGORY_LABELS, type HelpRequest } from "@/lib/types";
import { ProgressBar } from "./ProgressBar";

export function NeedCard({ need }: { need: HelpRequest }) {
  const funded = need.raisedCents >= need.amountCents;
  return (
    <article className="card flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between gap-2 text-xs font-extrabold">
        <span className="rounded-full bg-brand-soft px-3 py-1 text-brand-deep">{CATEGORY_LABELS[need.category]}</span>
        <span className="rounded-full bg-success-soft px-3 py-1 text-success">✓ Verified</span>
      </div>
      <h3 className="text-xl font-extrabold leading-snug">{need.title}</h3>
      <p className="line-clamp-3 text-sm text-muted">{need.story}</p>
      <p className="text-sm font-semibold text-muted">{need.requesterName} · {need.location}</p>
      <div className="mt-auto space-y-2">
        <ProgressBar raisedCents={need.raisedCents} amountCents={need.amountCents} />
        <p className="text-sm font-bold">{formatCurrency(need.raisedCents)} <span className="font-medium text-muted">of {formatCurrency(need.amountCents)}</span></p>
        <Link href={`/needs/${need.id}`} className="btn-ghost w-full">{funded ? "View story" : "Give help"}</Link>
      </div>
    </article>
  );
}
