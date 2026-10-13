import { ExternalLink, Info } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CrisisSection from "@/components/home/CrisisSection";
import { HUMANITARIAN_CONTEXT } from "@/lib/siteConfig";

export default function Impact() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="See What Your Giving Makes Possible."
        subtitle="We report only verified organizational data. Global humanitarian context is drawn from reputable international organizations and clearly labeled as external — never as our own achievements."
      />

      {/* Verified org data placeholder */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Baitul-Ehsan Verified Impact" title="Our Program Results" />
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
            <p className="font-heading text-xl text-foreground/70">
              Impact statistics will appear here as verified program data becomes available.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              We do not invent beneficiary numbers, project results, or donation totals. Every figure we publish
              is sourced from our verified records and clearly labeled.
            </p>
          </div>
        </div>
      </section>

      {/* External context */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="External Humanitarian Context"
            title="The Scale of Global Need"
            subtitle="These figures are sourced from UNICEF and UNHCR. They describe global and regional humanitarian need — not Baitul-Ehsan Relief Fund's results."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HUMANITARIAN_CONTEXT.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
              >
                <div className="font-heading text-4xl font-semibold text-primary sm:text-5xl">{item.stat}</div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">{item.label}</p>
                <div className="mt-4 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 font-medium text-accent">
                    <ExternalLink className="h-3 w-3" /> {item.source}
                  </div>
                  <div>Scope: {item.scope}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-10 flex items-start gap-3 rounded-xl border border-amber-300/40 bg-amber-50/60 p-5 text-sm text-amber-900/80">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p>
              <strong>Important distinction.</strong> External humanitarian statistics describe the scale of need
              in the world. They are not Baitul-Ehsan Relief Fund's achievements. We will never present them as such.
            </p>
          </div>
        </div>
      </section>

      <CrisisSection />
    </>
  );
}