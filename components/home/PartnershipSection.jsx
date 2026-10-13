import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { SITE, ALAFASY_IMAGES } from "@/lib/siteConfig";

export default function PartnershipSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          {/* Image — 60% */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={ALAFASY_IMAGES.primary}
                alt="Mishary Rashid Alafasy, Principal Partner of Baitul-Ehsan Relief Fund"
                fittingType="fill"
                className="aspect-[4/3] w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
            </div>
          </div>

          {/* Editorial — 40% */}
          <div className="lg:col-span-2">
            <div className="eyebrow mb-3">Principal Partnership</div>
            <h2 className="font-heading text-3xl font-medium leading-tight text-foreground sm:text-4xl">
              Together for Greater Impact
            </h2>
            <p className="mt-2 text-base font-medium text-accent">
              A Shared Commitment to Faith, Generosity and Human Dignity
            </p>
            <div className="mt-4 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              {SITE.partnership}
            </div>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              We are honored to partner with Mishary Rashid Alafasy in advancing charitable initiatives that
              promote generosity, compassion, dignity, and meaningful community impact.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Donations are made to Baitul-Ehsan Relief Fund — not to Mishary Rashid Alafasy personally.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/partnership">Learn About the Partnership <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-forest">
                <Link to="/donate"><Heart className="mr-2 h-4 w-4" /> Support the Mission</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}