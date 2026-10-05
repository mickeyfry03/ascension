import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { formatCurrency } from "@/lib/format";
import { CATEGORY_LABELS } from "@/lib/types";
import { requireAdmin } from "@/server/auth";
import { reviewAction } from "@/server/actions";
import { listReviewQueue } from "@/server/services/requests";

export const metadata: Metadata = { title: "Admin review" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) {
    return (
      <section className="py-16"><div className="container-page">
        <SectionHeading title="Admin review" />
        <p className="text-muted">Admin access required. <Link href="/login" className="font-bold text-brand-deep">Sign in</Link> with an admin account.</p>
      </div></section>
    );
  }
  const queue = await listReviewQueue();
  return (
    <section className="py-16">
      <div className="container-page">
        <SectionHeading eyebrow="Admin" title="Verification queue" intro={`${queue.length} request(s) awaiting review.`} />
        <ul className="space-y-5">
          {queue.map((r) => (
            <li key={r.id} className="card space-y-3 p-6">
              <div className="flex flex-wrap justify-between gap-2">
                <h3 className="text-lg font-extrabold">{r.title}</h3>
                <span className="text-sm font-bold text-muted">{CATEGORY_LABELS[r.category]} · {formatCurrency(r.amountCents)} · {r.status.replace("_", " ")}</span>
              </div>
              <p className="text-sm text-muted">{r.story}</p>
              <p className="text-sm font-semibold">{r.requesterName} ({r.requesterEmail}) · {r.location}</p>
              <form action={reviewAction} className="flex flex-wrap items-center gap-3">
                <input type="hidden" name="requestId" value={r.id} />
                <input name="notes" placeholder="Reviewer notes (optional)" className="input flex-1" aria-label="Reviewer notes" />
                <button name="decision" value="IN_REVIEW" className="btn-ghost !py-2">Mark in review</button>
                <button name="decision" value="VERIFIED" className="btn-primary !py-2">Verify</button>
                <button name="decision" value="REJECTED" className="btn-ghost !py-2">Reject</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
