import { ExternalLink, Info } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { HUMANITARIAN_CONTEXT } from "@/lib/siteConfig";

export default function ImpactSection() {
  return (
    <section className="relative overflow-hidden bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="See What Your Giving Makes Possible"
          title="The Global Humanitarian Context"
          subtitle="These figures represent the scale of humanitarian need worldwide, drawn from reputable international organizations. They are external context — not Baitul-Ehsan Relief Fund achievements."
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
            <strong>External Humanitarian Context.</strong> The statistics above are sourced from UNICEF and UNHCR
            and reflect global or regional humanitarian need. They are not Baitul-Ehsan Relief Fund's own results.
            Verified organizational impact data will appear here as program data becomes available.
          </p>
        </div>
      </div>
    </section>
  );
}