import { useState } from "react";
import { Play, X, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Image } from "@/components/ui/image";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { TESTIMONIALS } from "@/lib/siteConfig";

export default function TestimonialSection() {
  const [active, setActive] = useState(null);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Stories From Those We Serve"
          subtitle="Real voices, real lives. Hear from families and individuals whose lives have been touched by your generosity."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <button
                onClick={() => setActive(t)}
                className="group relative h-52 overflow-hidden"
                aria-label={`Play ${t.name}'s testimonial`}
              >
                <Image src={t.thumbnail} alt={`${t.name} testimonial`} fittingType="fill" className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/90 text-accent-foreground shadow-lg transition-transform group-hover:scale-110">
                    <Play className="ml-1 h-7 w-7" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                  <div className="font-heading text-lg font-semibold text-ivory">{t.name}</div>
                  <div className="text-xs text-ivory/70">{t.role}</div>
                </div>
              </button>
              <div className="flex flex-1 flex-col p-5">
                <Quote className="h-6 w-6 text-accent/40" />
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
          Testimonial videos are being prepared. Thumbnails shown are representative — full video stories will be available as consented content is verified.
        </p>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-3xl border-border bg-card p-0 overflow-hidden">
          {active && (
            <div>
              <div className="relative aspect-video bg-forest">
                <Image src={active.thumbnail} alt={`${active.name} testimonial`} fittingType="fill" className="h-full w-full" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-forest/60 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/90 text-accent-foreground">
                    <Play className="ml-1 h-7 w-7" fill="currentColor" />
                  </div>
                  <p className="px-6 text-sm text-ivory/80">Video testimonial coming soon</p>
                </div>
                <DialogClose className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-forest/60 text-ivory hover:bg-forest/80">
                  <X className="h-4 w-4" />
                </DialogClose>
              </div>
              <div className="p-6">
                <div className="font-heading text-xl font-semibold">{active.name}</div>
                <div className="text-sm text-muted-foreground">{active.role}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">"{active.quote}"</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}