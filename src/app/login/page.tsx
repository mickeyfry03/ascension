import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { isDevAuthEnabled } from "@/server/auth";
import { devSignInAction } from "@/server/actions";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <section className="py-16">
      <div className="container-page max-w-md">
        <SectionHeading title="Sign in" />
        {isDevAuthEnabled() ? (
          <form action={devSignInAction} className="card space-y-4 p-6">
            <p className="text-sm text-muted">Development sign-in (NODE_ENV=development only). Replace with Auth.js or Clerk (see README). Emails listed in ADMIN_EMAILS get admin access.</p>
            <label htmlFor="email" className="text-sm font-bold">Email</label>
            <input id="email" name="email" type="email" className="input" required />
            <button className="btn-primary w-full">Continue</button>
          </form>
        ) : (
          <p className="card p-6 text-muted">Sign-in is not configured yet. Connect an auth provider in <code>src/server/auth.ts</code>.</p>
        )}
      </div>
    </section>
  );
}
