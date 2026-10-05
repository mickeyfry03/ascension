"use client";

import { useActionState } from "react";
import { submitRequestAction, type FormState } from "@/server/actions";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/types";
import { FormField } from "./FormField";

const initial: FormState = { ok: false };

export function RequestForm() {
  const [state, action, pending] = useActionState(submitRequestAction, initial);
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <div className="card p-8 text-center" role="status">
        <h2 className="text-2xl font-extrabold">Request received</h2>
        <p className="mt-3 text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="card space-y-5 p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Your name" name="name" errors={e.name}><input id="name" name="name" className="input" autoComplete="name" required /></FormField>
        <FormField label="Email" name="email" errors={e.email}><input id="email" name="email" type="email" className="input" autoComplete="email" required /></FormField>
      </div>
      <FormField label="Request title" name="title" errors={e.title}><input id="title" name="title" className="input" placeholder="e.g. Help with this month's rent" required /></FormField>
      <div className="grid gap-5 sm:grid-cols-3">
        <FormField label="Category" name="category" errors={e.category}>
          <select id="category" name="category" className="input" defaultValue="HOUSING">
            {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
          </select>
        </FormField>
        <FormField label="City / region" name="location" errors={e.location}><input id="location" name="location" className="input" required /></FormField>
        <FormField label="Amount needed (USD)" name="amount" errors={e.amount}><input id="amount" name="amount" type="number" min={10} step={1} className="input" required /></FormField>
      </div>
      <FormField label="Your story" name="story" errors={e.story}><textarea id="story" name="story" rows={5} className="input" placeholder="Tell supporters what happened and exactly what the funds will cover." required /></FormField>
      <p className="text-sm text-muted">Our team verifies every request before it is shown to supporters. We may contact you for documentation.</p>
      <button className="btn-primary w-full disabled:opacity-60" disabled={pending}>{pending ? "Submitting…" : "Submit for verification"}</button>
    </form>
  );
}
