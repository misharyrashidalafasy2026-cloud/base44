import { Link } from "react-router-dom";
import { Heart, ShieldCheck, HandHeart, Users, Droplets, Moon, Megaphone, Scale, BarChart3, FileText, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { SITE, ALAFASY_IMAGES } from "@/lib/siteConfig";

const COLLAB_AREAS = [
  { icon: Megaphone, title: "Humanitarian Campaigns", text: "Raising awareness and support for communities in need." },
  { icon: Moon, title: "Ramadan Initiatives", text: "Encouraging purposeful giving during the month of Ramadan." },
  { icon: Scale, title: "Zakat Awareness", text: "Promoting confident, accountable Zakat giving." },
  { icon: Users, title: "Community Outreach", text: "Connecting with families and communities." },
  { icon: Heart, title: "Major Giving", text: "Supporting structured philanthropic contributions." },
  { icon: Droplets, title: "Sustainable Projects", text: "Water, education, and livelihood initiatives." },
];

const NOT_ROLES = ["Founder", "Co-Founder", "Chairman", "CEO", "Board Member", "Owner", "Financial Guarantor", "Official Religious Authority", "Executive Director"];

export default function Partnership() {
  return (
    <>
      <PageHero
        eyebrow={SITE.partnership}
        title="Faith. Generosity. Impact."
        subtitle="Baitul-Ehsan Relief Fund is honored to partner with Mishary Rashid Alafasy in advancing charitable initiatives rooted in faith, generosity, human dignity, and meaningful community impact."
      />

      {/* Hero image */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={ALAFASY_IMAGES.primary}
              alt="Mishary Rashid Alafasy, Principal Partner"
              fittingType="fill"
              className="aspect-[16/9] w-full"
            />
          </div>
        </div>
      </section>

      {/* About the partnership */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="About the Partnership" title="A Shared Commitment" />
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Baitul-Ehsan Relief Fund is honored to partner with Mishary Rashid Alafasy in advancing charitable
              initiatives that promote generosity, compassion, dignity, and meaningful community impact.
            </p>
            <p>
              As Principal Partner and a central public face of the project, Mishary Rashid Alafasy is closely
              associated with the mission and charitable initiatives of Baitul-Ehsan Relief Fund.
            </p>
            <p className="rounded-xl border border-accent/30 bg-accent/10 p-5 text-sm text-foreground">
              <strong>Important:</strong> Donations are made to Baitul-Ehsan Relief Fund — not to Mishary Rashid
              Alafasy personally. Whenever his image appears beside a donation CTA, contributions are directed to
              the organization and its charitable mission.
            </p>
          </div>
        </div>
      </section>

      {/* Authorized role */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Authorized Role" title="Mishary Rashid Alafasy's Role" />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-2xl font-semibold">Principal Partner</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A central public face of the project, closely associated with the mission and charitable
                initiatives — supporting awareness, outreach, and the advancement of the organization's purpose.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <HandHeart className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-2xl font-semibold">What This Role Is Not</h3>
              <p className="mt-3 text-xs text-muted-foreground">He is not described as any of the following unless separately documented and authorized:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {NOT_ROLES.map((r) => (
                  <span key={r} className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground line-through">{r}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "He does not control all financial decisions.",
              "He does not personally approve every project.",
              "He does not personally endorse every donation category.",
              "He does not personally guarantee donations or financial outcomes.",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of collaboration */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Areas of Collaboration" title="Working Together" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COLLAB_AREAS.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A partnership built around purpose */}
      <section className="bg-forest text-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 overflow-hidden rounded-2xl shadow-xl lg:order-1">
              <Image src={ALAFASY_IMAGES.secondary} alt="Mishary Rashid Alafasy" fittingType="fill" className="aspect-[4/3] w-full" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="eyebrow mb-3 text-accent">A Partnership Built Around Purpose</div>
              <h2 className="font-heading text-3xl font-medium sm:text-4xl">Faith in Action</h2>
              <p className="mt-5 leading-relaxed text-ivory/80">
                The partnership is centered on charitable purpose, beneficiaries, donor trust, accountability,
                and impact — rather than celebrity. We describe only verified partnership activities.
              </p>
              <p className="mt-4 text-sm text-ivory/60">
                We do not fabricate quotes, testimonials, endorsements, signatures, announcements, dates, or
                religious rulings attributed to Mishary Rashid Alafasy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & reporting */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Governance & Reporting" title="Accountable by Design" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: FileText, title: "Partnership Governance", text: "The partnership distinguishes between the organization's responsibilities and the partner's authorized public-facing role." },
              { icon: BarChart3, title: "Reporting", text: "Only verified partnership activities are described. Current initiatives are listed when information is confirmed." },
              { icon: ShieldCheck, title: "Public Announcements", text: "Public announcements are made only when authorized and documented." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-forest">
              <Link to="/donate"><Heart className="mr-2 h-5 w-5" /> Support the Mission</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}