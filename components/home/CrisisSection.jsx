import { Link } from "react-router-dom";
import { Heart, Users, Home, UtensilsCrossed } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { CRISIS_IMAGES } from "@/lib/siteConfig";

const HELP_AREAS = [
  { icon: Users, label: "Families Supported", desc: "Whole households receiving food, shelter, and essential aid." },
  { icon: Home, label: "Shelter & Safety", desc: "Safe housing for those displaced by war and disaster." },
  { icon: UtensilsCrossed, label: "Food & Water", desc: "Daily meals and clean water for individuals facing famine." },
];

export default function CrisisSection() {
  return (
    <section className="bg-forest text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why We Give"
          title="The Reality We Respond To"
          subtitle="Behind every statistic is a family, a child, a person whose life has been upended by war, famine, and displacement. This is why your giving matters."
          light
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CRISIS_IMAGES.map((img) => (
            <div key={img.title} className="group overflow-hidden rounded-2xl border border-ivory/10 bg-forest-light/30">
              <div className="relative h-56 overflow-hidden">
                <Image src={img.url} alt={img.title} fittingType="fill" className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-heading text-lg font-semibold text-ivory">{img.title}</h3>
                </div>
              </div>
              <p className="p-4 text-sm leading-relaxed text-ivory/70">{img.caption}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-accent/20 bg-accent/5 p-8">
          <h3 className="font-heading text-2xl font-semibold text-ivory">Your Donations Help Real Families & Individuals</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ivory/70">
            Every contribution goes toward tangible, life-sustaining support — food for a family
            facing famine, shelter for those displaced by war, clean water for communities in drought,
            and medical care for individuals who have lost everything. We are committed to helping
            as many families and individuals as possible, with dignity at the center of every response.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {HELP_AREAS.map((area) => (
              <div key={area.label} className="rounded-xl border border-ivory/10 bg-forest/40 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <area.icon className="h-5 w-5" />
                </div>
                <h4 className="mt-3 font-heading text-base font-semibold text-ivory">{area.label}</h4>
                <p className="mt-1 text-xs leading-relaxed text-ivory/60">{area.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-gold-dark">
              <Link to="/donate"><Heart className="mr-2 h-5 w-5" /> Help a Family Today</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}