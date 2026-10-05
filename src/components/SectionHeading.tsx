export function SectionHeading({ eyebrow, title, intro, center }: { eyebrow?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {eyebrow && <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-deep">{eyebrow}</p>}
      <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h2>
      {intro && <p className={`mt-3 max-w-2xl text-muted ${center ? "mx-auto" : ""}`}>{intro}</p>}
    </div>
  );
}
