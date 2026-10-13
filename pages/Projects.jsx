import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Tag, CalendarClock } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { base44 } from "@/api/base44Client";

const STATUS_STYLE = {
  planned: "bg-amber-100 text-amber-800 border-amber-200",
  active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Project.list("-created_date", 50)
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Featured Projects"
        subtitle="Each project has defined goals, a beneficiary methodology, status, and reporting availability. Projects marked as demo are development content — not verified achievements."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-primary" />
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
              <p className="font-heading text-xl text-foreground/70">Project listings will appear here as verified programs become available.</p>
              <p className="mt-2 text-sm text-muted-foreground">Content to be provided.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => {
                const pct = p.funding_goal ? Math.min(Math.round((p.amount_raised / p.funding_goal) * 100), 100) : 0;
                return (
                  <div key={p.id} className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative h-44 overflow-hidden">
                      {p.image_url ? (
                        <Image src={p.image_url} alt={p.name} fittingType="fill" className="h-full w-full" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-forest to-forest-light">
                          <GeometricBg />
                        </div>
                      )}
                      <div className="absolute left-3 top-3">
                        {p.is_demo && <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800">DEMO DATA</Badge>}
                      </div>
                      <div className="absolute right-3 top-3">
                        <Badge variant="outline" className={STATUS_STYLE[p.status] || "bg-secondary"}>{p.status}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Tag className="h-3.5 w-3.5" /> {p.category}
                      </div>
                      <h3 className="mt-2 font-heading text-xl font-semibold">{p.name}</h3>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {p.location}
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{p.description}</p>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>${(p.amount_raised || 0).toLocaleString()} raised</span>
                          <span>{pct}% of ${p.funding_goal.toLocaleString()}</span>
                        </div>
                        <Progress value={pct} className="mt-1.5 h-2" />
                      </div>
                      {p.completion_target && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarClock className="h-3.5 w-3.5" /> Target: {p.completion_target}
                        </div>
                      )}
                      <Button asChild className="mt-5 bg-primary text-primary-foreground hover:bg-forest" size="sm">
                        <Link to="/donate"><Heart className="mr-1.5 h-4 w-4" /> Support This Project</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function GeometricBg() {
  return (
    <svg className="absolute inset-0 h-full w-full text-accent" style={{ opacity: 0.1 }} aria-hidden="true">
      <defs>
        <pattern id="proj-geom" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#proj-geom)" />
    </svg>
  );
}