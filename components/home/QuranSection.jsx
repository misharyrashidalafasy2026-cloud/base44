import SectionHeading from "@/components/SectionHeading";
import GeometricPattern from "@/components/GeometricPattern";
import { QURAN_VERSES } from "@/lib/siteConfig";

export default function QuranSection() {
  return (
    <section className="relative overflow-hidden bg-forest text-ivory">
      <GeometricPattern className="absolute inset-0 h-full w-full text-accent" opacity={0.06} />
      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Qur'an & Giving</div>
          <h2 className="font-heading text-3xl font-medium leading-tight text-ivory sm:text-4xl">
            The Spirit of Generosity
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ivory/70">
            Selected verses on charity and giving, from an authoritative translation.
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {QURAN_VERSES.map((v) => (
            <figure
              key={v.ref}
              className="rounded-2xl border border-ivory/15 bg-ivory/5 p-7 backdrop-blur-sm"
            >
              <blockquote className="font-heading text-lg italic leading-relaxed text-ivory/90">
                “{v.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-accent">{v.ref}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-ivory/50">
          Translation referenced for educational purposes. This does not replace personalized guidance from a qualified scholar.
        </p>
      </div>
    </section>
  );
}