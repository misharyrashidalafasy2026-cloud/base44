import { Link } from "react-router-dom";
import { Heart, Droplets, GraduationCap, Stethoscope, Users, Sprout, Landmark } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";

const INITIATIVES = [
  { icon: Droplets, title: "Water Infrastructure", text: "Wells, water systems, and sustainable access to clean water." },
  { icon: GraduationCap, title: "Schools", text: "Educational facilities that serve communities for generations." },
  { icon: Stethoscope, title: "Healthcare Facilities", text: "Clinics and medical infrastructure providing ongoing care." },
  { icon: Users, title: "Community Centers", text: "Spaces that bring communities together and deliver services." },
  { icon: Sprout, title: "Agricultural Projects", text: "Sustainable farming initiatives supporting livelihoods." },
  { icon: Landmark, title: "Waqf Projects", text: "Endowment initiatives generating ongoing benefit." },
];

export default function SadaqahJariyah() {
  return (
    <>
      <PageHero
        eyebrow="Sadaqah Jariyah"
        title="Give Something That Continues."
        subtitle="Sadaqah Jariyah is ongoing charity — a contribution whose benefit continues to flow long after it is given, supporting communities for years to come."
        arabic="صدقة جارية"
      />
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INITIATIVES.map((c) => (
              <div key={c.title} className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
            We do not guarantee specific spiritual rewards. Sadaqah Jariyah is offered as an opportunity to support
            lasting, sustainable initiatives with ongoing community benefit.
          </p>
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-forest">
              <Link to="/donate"><Heart className="mr-2 h-5 w-5" /> Give Sadaqah Jariyah</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}