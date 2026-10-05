"use client";

import { useActionState } from "react";
import { supportAction, type FormState } from "@/server/actions";
import { FormField } from "./FormField";

const initial: FormState = { ok: false };

export function SupportForm({ requestId, remainingDollars }: { requestId: string; remainingDollars: number }) {
  const [state, action, pending] = useActionState(supportAction, initial);
  const e = state.errors ?? {};

  if (state.ok) return <p className="rounded-2xl bg-success-soft p-4 font-semibold text-success" role="status">{state.message}</p>;

  return (
    <form action={action} className="space-y-4" noValidate>
      <input type="hidden" name="requestId" value={requestId} />
      <FormField label="Your name" name="donorName" errors={e.donorName}><input id="donorName" name="donorName" className="input" required /></FormField>
      <FormField label="Amount (USD)" name="amount" errors={e.amount}><input id="amount" name="amount" type="number" min={1} max={remainingDollars} step={1} defaultValue={Math.min(25, remainingDollars)} className="input" required /></FormField>
      <FormField label="Message (optional)" name="message" errors={e.message}><textarea id="message" name="message" rows={3} className="input" /></FormField>
      {state.message && <p className="text-sm text-red-700" role="alert">{state.message}</p>}
      <button className="btn-primary w-full disabled:opacity-60" disabled={pending}>{pending ? "Processing…" : "Give support"}</button>
      <p className="text-xs text-muted">Payment processing is not yet connected. Support actions are recorded as pledges.</p>
    </form>
  );
}
