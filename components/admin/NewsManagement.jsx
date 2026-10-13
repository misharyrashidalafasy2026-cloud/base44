import { useState } from "react";
import { Newspaper, Trash2, Upload, Loader2, Video, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";

const CATEGORIES = [
  { value: "update", label: "Update" },
  { value: "announcement", label: "Announcement" },
  { value: "emergency", label: "Emergency Alert" },
  { value: "report", label: "Field Report" },
];

export default function NewsManagement({ news, onRefresh }) {
  const { toast } = useToast();
  const [form, setForm] = useState({ title: "", content: "", category: "update", video_url: "", author_name: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image must be under 5MB.", variant: "destructive" });
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast({ title: "Title and content are required.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      let image_url = "";
      if (imageFile) {
        const { file_url } = await base44.integrations.Core.UploadPublicFile({ file: imageFile });
        image_url = file_url;
      }
      await base44.entities.NewsUpdate.create({
        ...form,
        image_url,
        status: "published",
      });
      toast({ title: "News update published." });
      setForm({ title: "", content: "", category: "update", video_url: "", author_name: "" });
      setImageFile(null);
      setImagePreview("");
      onRefresh();
    } catch (err) {
      toast({ title: "Failed to publish update.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this news update?")) return;
    try {
      await base44.entities.NewsUpdate.delete(id);
      toast({ title: "News update deleted." });
      onRefresh();
    } catch {
      toast({ title: "Delete failed.", variant: "destructive" });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 lg:col-span-1">
        <h3 className="flex items-center gap-2 font-heading text-lg font-semibold"><Newspaper className="h-5 w-5" /> Publish News Update</h3>
        <p className="mt-1 text-xs text-muted-foreground">Share news, announcements, or field reports with your community.</p>
        <div className="mt-4 space-y-3">
          <div><Label htmlFor="n-title">Title *</Label><Input id="n-title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="mt-1" /></div>
          <div>
            <Label htmlFor="n-cat">Category</Label>
            <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
              <SelectTrigger id="n-cat" className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label htmlFor="n-content">Content *</Label><Textarea id="n-content" value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} className="mt-1 min-h-[120px]" /></div>
          <div>
            <Label htmlFor="n-img">Image (stored publicly — anyone with the link can open them)</Label>
            <div className="mt-1 flex items-center gap-3">
              <label className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-secondary/30">
                {imagePreview ? <img src={imagePreview} alt="preview" className="h-full w-full object-cover" /> : <Upload className="h-5 w-5 text-muted-foreground" />}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
              <div className="text-xs text-muted-foreground">Click to upload an image (max 5MB)</div>
            </div>
          </div>
          <div><Label htmlFor="n-video"><span className="flex items-center gap-1"><Video className="h-3.5 w-3.5" /> Video URL (optional)</span></Label><Input id="n-video" value={form.video_url} onChange={(e) => setForm((f) => ({ ...f, video_url: e.target.value }))} placeholder="YouTube, Vimeo, or MP4 link" className="mt-1" /></div>
          <div><Label htmlFor="n-author">Author / Source</Label><Input id="n-author" value={form.author_name} onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))} className="mt-1" /></div>
          <Button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground hover:bg-forest">
            {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...</> : "Publish Update"}
          </Button>
        </div>
      </form>

      <div className="space-y-3 lg:col-span-2">
        {news.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
            <Newspaper className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">No news updates yet.</p>
          </div>
        )}
        {news.map((n) => (
          <div key={n.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex gap-4 p-4">
              {n.image_url && (
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image src={n.image_url} alt={n.title} fittingType="fill" className="h-full w-full" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">{n.category}</Badge>
                      {n.video_url && <Badge variant="outline" className="border-accent/40 text-accent"><Video className="mr-1 h-3 w-3" /> Video</Badge>}
                    </div>
                    <h4 className="mt-1.5 font-heading text-base font-semibold">{n.title}</h4>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => remove(n.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{n.content}</p>
                <div className="mt-1.5 text-xs text-muted-foreground">{new Date(n.created_date).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}