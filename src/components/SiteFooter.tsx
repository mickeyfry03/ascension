import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-white/40 py-10">
      <div className="container-page flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <p>© {new Date().getFullYear()} Ascension. Verified giving, direct impact.</p>
        <nav className="flex gap-5 font-semibold" aria-label="Footer">
          <Link href="/needs">Give help</Link>
          <Link href="/request">Get help</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </footer>
  );
}
