import { ShieldCheck, FileText, Moon, Sparkles } from "lucide-react";

const INDICATORS = [
  { icon: Sparkles, title: "Beneficiary-Focused Giving", text: "Giving pathways centered on dignity and human impact." },
  { icon: FileText, title: "Transparent Reporting", text: "Clear allocation policies and documented accountability." },
  { icon: Moon, title: "Islamic Giving Pathways", text: "Zakat, Sadaqah, Sadaqah Jariyah, and Waqf." },
  { icon: ShieldCheck, title: "Major Giving From $2,000+", text: "Structured philanthropic contributions with guidance." },
];

export default function TrustIndicators() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INDICATORS.map((it) => (
            <div key={it.title} className="flex flex-col items-start gap-3 rounded-xl border border-border bg-background/50 p-6 transition-colors hover:border-accent/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{it.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}