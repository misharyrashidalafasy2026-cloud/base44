import GeometricPattern from "@/components/GeometricPattern";
import { cn } from "@/lib/utils";

export default function PageHero({ eyebrow, title, subtitle, arabic, className }) {
  return (
    <section className={cn("relative overflow-hidden bg-forest text-ivory", className)}>
      <GeometricPattern className="absolute inset-0 h-full w-full text-accent" opacity={0.07} />
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest/95 to-forest-light/30" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        {arabic && (
          <div className="mb-4 font-arabic text-2xl text-accent" dir="rtl">{arabic}</div>
        )}
        {eyebrow && <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</div>}
        <h1 className="hero-serif max-w-3xl text-4xl sm:text-5xl md:text-[3.25rem]">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ivory/80">{subtitle}</p>}
      </div>
    </section>
  );
}