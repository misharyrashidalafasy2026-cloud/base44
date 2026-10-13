import { Link } from "react-router-dom";
import { ArrowRight, Scale, HandHeart, Infinity, Landmark, LifeBuoy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const PATHWAYS = [
  { icon: Scale, title: "Zakat", text: "Fulfill your obligatory charity with confidence through dedicated, accountable pathways.", path: "/zakat" },
  { icon: HandHeart, title: "Sadaqah", text: "Give freely to support emergency relief, food, water, healthcare, and education.", path: "/sadaqah" },
  { icon: Infinity, title: "Sadaqah Jariyah", text: "Support lasting initiatives — water infrastructure, schools, and community facilities.", path: "/sadaqah-jariyah" },
  { icon: Landmark, title: "Waqf", text: "Build a legacy of enduring benefit through sustainable endowment projects.", path: "/waqf" },
  { icon: LifeBuoy, title: "Emergency Relief", text: "Respond to urgent humanitarian needs with dignity-focused assistance.", path: "/sadaqah" },
  { icon: Users, title: "Community Development", text: "Support livelihoods, education, and long-term community resilience.", path: "/projects" },
];

export default function GivingPathways() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Make a Meaningful Difference"
          title="Choose a Giving Pathway"
          subtitle="Select a giving pathway that reflects your values and helps support dignified, accountable, and meaningful charitable work."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PATHWAYS.map((p) => (
            <div
              key={p.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-accent/15 group-hover:text-accent">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-2xl font-semibold text-foreground">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              <div className="mt-6 flex items-center gap-3">
                <Button asChild variant="ghost" size="sm" className="px-0 text-accent hover:bg-transparent hover:text-gold-dark">
                  <Link to={p.path}>Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/donate">Donate</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}