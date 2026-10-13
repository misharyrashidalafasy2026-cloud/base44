import { Link } from "react-router-dom";
import { Target, Eye, Heart, ShieldCheck, MapPin, HandHeart, FileBarChart, Scale } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { ALAFASY_IMAGES, SITE } from "@/lib/siteConfig";

const VALUES = [
  { icon: Heart, title: "Dignity", text: "Every person is treated with respect. We prioritize dignity over shock in all we do." },
  { icon: ShieldCheck, title: "Transparency", text: "Clear allocation policies, documented reporting, and honest communication." },
  { icon: Scale, title: "Accountability", text: "Responsible stewardship of every contribution, with verifiable records." },
  { icon: HandHeart, title: "Compassion", text: "Giving rooted in faith, sincerity, and genuine concern for human wellbeing." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="An Islamic Philanthropic Institution"
        subtitle="Baitul-Ehsan Relief Fund exists to transform generosity into dignified, measurable, responsible, and sustainable impact — rooted in faith and accountability."
        arabic={SITE.nameArabic}
      />

      {/* Mission & Vision */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-heading text-3xl font-semibold">Our Mission</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                To facilitate responsible Islamic philanthropy — Zakat, Sadaqah, Sadaqah Jariyah, and Waqf —
                that supports communities with dignity, fulfills charitable obligations faithfully, and
                creates lasting, accountable humanitarian impact.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-center rounded-xl bg-accent/15 text-accent">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="mt-5 font-heading text-3xl font-semibold">Our Vision</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                A world where generosity flows through trusted, transparent pathways — empowering communities
                toward dignity, opportunity, and self-reliance, and giving donors confidence in every contribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What Guides Us" title="Our Values" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How We Work" title="A Trusted Pathway for Your Giving" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: MapPin, title: "Where We Work", text: "Across communities in need — representing humanitarian needs in Africa, the Middle East, Asia, and beyond, rather than a single region." },
              { icon: FileBarChart, title: "How We Measure", text: "Through verified organizational data. We do not present external humanitarian statistics as our own achievements." },
              { icon: ShieldCheck, title: "How We Account", text: "Through documented allocation policies, reporting, and governance — with clear separation between programs and operations." },
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
        </div>
      </section>

      {/* Principal partnership */}
      <section className="bg-forest text-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image src={ALAFASY_IMAGES.secondary} alt="Mishary Rashid Alafasy" fittingType="fill" className="aspect-[4/3] w-full" />
            </div>
            <div>
              <div className="eyebrow mb-3 text-accent">Principal Partnership</div>
              <h2 className="font-heading text-3xl font-medium sm:text-4xl">Baitul-Ehsan Relief Fund × Mishary Rashid Alafasy</h2>
              <p className="mt-5 leading-relaxed text-ivory/80">
                Baitul-Ehsan Relief Fund is honored to partner with Mishary Rashid Alafasy in advancing charitable
                initiatives rooted in faith, generosity, human dignity, and meaningful community impact.
              </p>
              <p className="mt-4 text-sm text-ivory/60">
                As Principal Partner and a central public face of the project, he is closely associated with the
                mission — without holding executive, financial, or religious-authority roles.
              </p>
              <Button asChild variant="outline" className="mt-7 border-ivory/30 text-ivory hover:bg-ivory/10">
                <Link to="/partnership">Learn About the Partnership</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}