import { useState, useEffect } from "react";
import { Newspaper, Video, Calendar, User } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { base44 } from "@/api/base44Client";

const CATEGORY_LABELS = {
  update: "Update",
  announcement: "Announcement",
  emergency: "Emergency Alert",
  report: "Field Report",
};

function VideoEmbed({ url }) {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
  if (ytMatch) {
    return (
      <div className="aspect-video overflow-hidden rounded-xl">
        <iframe
          src={`https://www.youtube.com/embed/${ytMatch[1]}`}
          title="News video"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return (
      <div className="aspect-video overflow-hidden rounded-xl">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoMatch[1]}`}
          title="News video"
          className="h-full w-full"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className="aspect-video overflow-hidden rounded-xl bg-forest">
      <video src={url} controls className="h-full w-full" />
    </div>
  );
}

export default function News() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.NewsUpdate.filter({ status: "published" }, { sort: "-created_date", limit: 50 })
      .then((page) => setUpdates(page.items || []))
      .catch(() => setUpdates([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Latest News & Updates"
        subtitle="Stay informed about our latest initiatives, emergency responses, field reports, and organizational announcements."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-primary" />
            </div>
          ) : updates.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
              <Newspaper className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="mt-4 font-heading text-xl text-foreground/70">No news updates yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">Check back soon for the latest news and announcements.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {updates.map((n) => (
                <article key={n.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                  {n.image_url && (
                    <div className="h-64 overflow-hidden">
                      <Image src={n.image_url} alt={n.title} fittingType="fill" className="h-full w-full" />
                    </div>
                  )}
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="outline" className="capitalize">{CATEGORY_LABELS[n.category] || n.category}</Badge>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" /> {new Date(n.created_date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                      </div>
                      {n.author_name && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <User className="h-3.5 w-3.5" /> {n.author_name}
                        </div>
                      )}
                    </div>
                    <h2 className="mt-3 font-heading text-2xl font-semibold">{n.title}</h2>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{n.content}</p>
                    {n.video_url && (
                      <div className="mt-5">
                        <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground"><Video className="h-4 w-4 text-accent" /> Video</div>
                        <VideoEmbed url={n.video_url} />
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}