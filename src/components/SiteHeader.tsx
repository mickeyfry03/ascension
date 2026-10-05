import Link from "next/link";
import { getSessionUser } from "@/server/auth";
import { signOutAction } from "@/server/actions";

const links = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/needs", label: "Browse needs" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export async function SiteHeader() {
  const user = await getSessionUser();
  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="container-page flex min-h-[72px] flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2">
        <Link href="/" className="inline-flex items-center gap-2.5 text-lg font-extrabold tracking-tight" aria-label="Ascension home">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-sand text-white">A</span>
          Ascension
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-semibold text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink">{l.label}</Link>
          ))}
          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-ink">Dashboard</Link>
              {user.role === "ADMIN" && <Link href="/admin" className="hover:text-ink">Admin</Link>}
              <form action={signOutAction}><button className="hover:text-ink">Sign out</button></form>
            </>
          ) : (
            <Link href="/login" className="hover:text-ink">Sign in</Link>
          )}
          <Link href="/request" className="btn-primary !px-5 !py-2 text-white">Get help</Link>
        </nav>
      </div>
    </header>
  );
}
