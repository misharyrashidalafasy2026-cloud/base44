import Hero from "@/components/home/Hero";
import TrustIndicators from "@/components/home/TrustIndicators";
import GivingPathways from "@/components/home/GivingPathways";
import ImpactSection from "@/components/home/ImpactSection";
import PartnershipSection from "@/components/home/PartnershipSection";
import QuranSection from "@/components/home/QuranSection";
import CtaSection from "@/components/home/CtaSection";
import CrisisSection from "@/components/home/CrisisSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import SectionHeading from "@/components/SectionHeading";
import { Users, HeartHandshake } from "lucide-react";

function DonorPhilosophy() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="A Win-Win for Both Parties"
          title="Responsible Philanthropy, Shared Value"
          subtitle="We believe responsible philanthropy should create meaningful value for everyone involved."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-heading text-2xl font-semibold">For Communities</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Dignity and opportunity — support focused on essential needs, long-term resilience,
              and human wellbeing rather than dependency.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-heading text-2xl font-semibold">For Donors</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Transparency, accountability, and confidence — clear reporting, documented policies,
              and a giving experience rooted in trust.
            </p>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          We do not promise financial returns or guaranteed spiritual rewards. We commit to responsible,
          accountable, and dignified charitable work.
        </p>
      </div>
    </section>
  );
}

function HumanStoriesPlaceholder() {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Behind Every Contribution"
          title="A Human Story"
          subtitle="Every contribution carries a human story. Stories from our community will appear here as verified experiences become available."
        />
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
          <p className="font-heading text-xl text-foreground/70">
            Stories from our community will appear here as verified experiences become available.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            We do not fabricate testimonials, quotes, or photographs. All stories are consent-based and verified.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <GivingPathways />
      <ImpactSection />
      <CrisisSection />
      <PartnershipSection />
      <QuranSection />
      <DonorPhilosophy />
      <TestimonialSection />
      <CtaSection />
    </>
  );
}