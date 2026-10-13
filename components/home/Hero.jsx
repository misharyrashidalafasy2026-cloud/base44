import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import GeometricPattern from "@/components/GeometricPattern";
import { SITE } from "@/lib/siteConfig";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest text-ivory">
      <GeometricPattern className="absolute inset-0 h-full w-full text-accent" opacity={0.08} />
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest/95 to-forest-light/40" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            <span className="font-arabic text-sm" dir="rtl">{SITE.nameArabic}</span>
          </div>
          <h1 className="hero-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Your Wealth Can Become <span className="text-accent">Lasting Impact.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/80 sm:text-xl">
            Give with purpose. Support communities, fulfill your charitable obligations, and help create
            a future rooted in dignity, opportunity, and compassion.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-gold-dark">
              <Link to="/donate">
                <Heart className="mr-2 h-5 w-5" /> Donate Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-ivory/30 text-ivory hover:bg-ivory/10 hover:text-ivory">
              <Link to="/impact">
                Explore Our Impact <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-ivory/60">
            Cryptocurrency donations only · Minimum contribution ${SITE.minimumContribution.toLocaleString()} USD
          </p>
        </div>
      </div>
    </section>
  );
}