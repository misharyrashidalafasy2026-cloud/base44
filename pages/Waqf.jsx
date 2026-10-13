import { Link } from "react-router-dom";
import { Heart, Landmark, FileText, ShieldCheck, BarChart3 } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

export default function Waqf() {
  return (
    <>
      <PageHero
        eyebrow="Waqf"
        title="Build a Legacy of Benefit."
        subtitle="Waqf is a perpetual endowment — a contribution dedicated to ongoing charitable benefit, generating impact for communities across generations."
        arabic="وقف"
      />
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How Waqf Works" title="A Lasting Endowment" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Landmark, title: "Project Details", text: "Each Waqf project has defined scope, purpose, and beneficiary methodology." },
              { icon: FileText, title: "Funding Requirements", text: "Clear funding goals and structured contribution pathways." },
              { icon: BarChart3, title: "Expected Impact", text: "Documented expected outcomes and reporting availability." },
              { icon: ShieldCheck, title: "Governance", text: "Waqf assets are managed with documented governance and accountability." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-dashed border-border bg-card/60 p-8 text-center">
            <p className="font-heading text-lg text-foreground/70">Waqf project opportunities will appear here as verified programs become available.</p>
            <p className="mt-2 text-sm text-muted-foreground">Content to be provided.</p>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            We do not promise financial returns or guaranteed spiritual outcomes. Waqf is offered as a structured
            pathway for enduring charitable benefit.
          </p>
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-forest">
              <Link to="/donate"><Heart className="mr-2 h-5 w-5" /> Contribute to Waqf</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}