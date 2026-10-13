import { Link } from "react-router-dom";
import { Heart, Droplets, Utensils, Stethoscope, GraduationCap, Users, LifeBuoy } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { icon: LifeBuoy, title: "Emergency Relief", text: "Urgent assistance for families affected by crisis and displacement." },
  { icon: Utensils, title: "Food", text: "Nutritious food support for families facing food insecurity." },
  { icon: Droplets, title: "Water", text: "Clean, safe water access for communities in need." },
  { icon: Stethoscope, title: "Healthcare", text: "Medical assistance and access to essential healthcare." },
  { icon: GraduationCap, title: "Education", text: "Supporting learning and opportunity for children and youth." },
  { icon: Users, title: "Community Development", text: "Long-term initiatives building resilient communities." },
];

export default function Sadaqah() {
  return (
    <>
      <PageHero
        eyebrow="Sadaqah"
        title="Give Freely. Give With Purpose."
        subtitle="Sadaqah is a voluntary act of charity — an expression of compassion that supports families and communities across a range of vital areas."
        arabic="صدقة"
      />
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <div key={c.title} className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-forest">
              <Link to="/donate"><Heart className="mr-2 h-5 w-5" /> Give Sadaqah</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}