import { progressPercent } from "@/lib/format";

export function ProgressBar({ raisedCents, amountCents }: { raisedCents: number; amountCents: number }) {
  const pct = progressPercent(raisedCents, amountCents);
  return (
    <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Funding progress" className="h-3 w-full overflow-hidden rounded-full bg-brand/10">
      <span className="block h-full rounded-full bg-gradient-to-r from-brand to-brand-sand" style={{ width: `${pct}%` }} />
    </div>
  );
}
