import { FileText, ShieldCheck, Scale, Landmark, BarChart3, Lock, Mail } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { SITE } from "@/lib/siteConfig";

const PROGRAMS = ["Food", "Water", "Healthcare", "Education", "Family Support", "Emergency Relief", "Livelihoods", "Community Development", "Waqf", "Sadaqah Jariyah"];
const OPERATIONS = ["Compliance", "Administration", "Technology", "Donor Services", "Financial Administration", "Monitoring", "Reporting", "Governance", "Payment Processing"];

export default function Transparency() {
  return (
    <>
      <PageHero
        eyebrow="Transparency Center"
        title="Know Where Your Giving Goes."
        subtitle="We are committed to honest, documented accountability. We publish only authentic information and never fabricate audits, registrations, or impact figures."
      />

      {/* Allocation */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Fund Allocation" title="Where Your Contribution Goes" />
          <div className="mt-8 flex justify-center">
            <Badge variant="outline" className="border-amber-300 bg-amber-50 px-4 py-1.5 text-amber-800">
              PROPOSED ALLOCATION TARGET
            </Badge>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted-foreground">
            The 90% figure is a proposed target only — not a verified claim. It will be confirmed and published
            once supported by formal accounting records. We never state that "90% of every dollar goes directly
            into the hands of beneficiaries."
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-2xl font-semibold">Programs & Beneficiary Support</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {PROGRAMS.map((p) => (
                  <span key={p} className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-foreground/80">{p}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-2xl font-semibold">Essential Operations</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {OPERATIONS.map((p) => (
                  <span key={p} className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-foreground/80">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Reports & Documents" title="Accountability Records" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: FileText, title: "Financial Reports" },
              { icon: FileText, title: "Annual Reports" },
              { icon: Scale, title: "Zakat Policy" },
              { icon: BarChart3, title: "Fund Allocation" },
              { icon: FileText, title: "Project Reports" },
              { icon: Landmark, title: "Governance" },
              { icon: ShieldCheck, title: "Audit Information" },
              { icon: FileText, title: "Registration Information" },
              { icon: BarChart3, title: "Impact Reports" },
              { icon: FileText, title: "Donation Policy" },
            ].map((d) => (
              <div key={d.title} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <d.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{d.title}</div>
                  <div className="text-xs text-muted-foreground">Content to be provided</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-start gap-3 rounded-xl border border-amber-300/40 bg-amber-50/60 p-5 text-sm text-amber-900/80">
            <Lock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p>
              We never fabricate audits, registration numbers, certifications, accreditations, or financial figures.
              Documents are published only when authentic and verified.
            </p>
          </div>
        </div>
      </section>

      {/* Trust center */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Trust Center" title="Verified Information" />
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {[
              ["Registration", "Official registration information will be published here once verified."],
              ["Governance", "Governance structure and leadership documented as information is confirmed."],
              ["Financial Reports", "Published as verified accounting records become available."],
              ["Zakat Policy", "Zakat is held and distributed separately, per its religious rules."],
              ["Donation Policy", "Cryptocurrency only. Minimum contribution $2,000 USD."],
              ["Privacy", "We protect donor information and never request private keys or seed phrases."],
              ["Location", SITE.location],
              ["Contact", SITE.supportEmail],
            ].map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">{k}</span>
                </div>
                <span className="text-right text-sm text-muted-foreground">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}