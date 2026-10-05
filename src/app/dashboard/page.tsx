import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { formatCurrency } from "@/lib/format";
import { getSessionUser } from "@/server/auth";
import { listRequestsFor } from "@/server/services/requests";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) {
    return (
      <section className="py-16"><div className="container-page">
        <SectionHeading title="Your dashboard" />
        <p className="text-muted">Please <Link href="/login" className="font-bold text-brand-deep">sign in</Link> to see your requests.</p>
      </div></section>
    );
  }
  const requests = await listRequestsFor(user.email);
  return (
    <section className="py-16">
      <div className="container-page">
        <SectionHeading eyebrow="Dashboard" title={`Welcome, ${user.name}`} />
        {requests.length === 0 ? (
          <p className="text-muted">You have no requests yet. <Link href="/request" className="font-bold text-brand-deep">Submit one</Link>.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((r) => (
              <li key={r.id} className="card flex flex-wrap items-center justify-between gap-3 p-5">
                <div><p className="font-extrabold">{r.title}</p><p className="text-sm text-muted">{formatCurrency(r.raisedCents)} of {formatCurrency(r.amountCents)}</p></div>
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand-deep">{r.status.replace("_", " ")}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
