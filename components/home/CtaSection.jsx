import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GeometricPattern from "@/components/GeometricPattern";
import { SITE } from "@/lib/siteConfig";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <GeometricPattern className="absolute inset-0 h-full w-full text-accent" opacity={0.08} />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="hero-serif text-3xl sm:text-4xl md:text-5xl">
          Give With Purpose.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
          Transform generosity into dignified, measurable, and lasting impact. Your contribution supports
          communities with compassion and accountability.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-gold-dark">
            <Link to="/donate"><Heart className="mr-2 h-5 w-5" /> Donate Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/major-giving">Major Giving <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-primary-foreground/60">
          Cryptocurrency donations only · Minimum ${SITE.minimumContribution.toLocaleString()} USD
        </p>
      </div>
    </section>
  );
}