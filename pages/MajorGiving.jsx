import { useState } from "react";
import { Link } from "react-router-dom";
import { Droplets, GraduationCap, Stethoscope, LifeBuoy, Users, Landmark, Send, Heart } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";

const RANGES = ["$2,000–$10,000", "$10,000–$50,000", "$50,000–$100,000", "$100,000–$500,000", "$500,000+"];
const AREAS = [
  { icon: Droplets, label: "Water" },
  { icon: GraduationCap, label: "Education" },
  { icon: Stethoscope, label: "Healthcare" },
  { icon: LifeBuoy, label: "Emergency Response" },
  { icon: Users, label: "Livelihoods" },
  { icon: Landmark, label: "Waqf" },
];

export default function MajorGiving() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", organization: "", range: "", area: "", contact_method: "Email", message: "" });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please complete the required fields.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await base44.entities.SupportEnquiry.create({
        name: form.name,
        email: form.email,
        subject: `Major Giving Enquiry — ${form.range || "Range not specified"}`,
        message: `Organization: ${form.organization || "—"}\nEstimated range: ${form.range || "—"}\nArea of interest: ${form.area || "—"}\nPreferred contact: ${form.contact_method}\n\n${form.message}`,
        category: "major_giving",
        status: "new",
      });
      toast({ title: "Thank you. Our philanthropy team will be in touch.", description: "We've received your enquiry." });
      setForm({ name: "", email: "", organization: "", range: "", area: "", contact_method: "Email", message: "" });
    } catch (err) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Major Giving"
        title="Turn Generosity Into Lasting Change."
        subtitle="For donors seeking to make a significant, structured contribution — with dedicated guidance, reporting expectations, and donor privacy."
      />

      {/* Ranges */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Giving Levels" title="Choose Your Level of Impact" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {RANGES.map((r, i) => (
              <div key={r} className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-accent/50 hover:shadow-md">
                <div className="font-heading text-2xl font-semibold text-primary">{r}</div>
                <div className="mt-2 text-xs text-muted-foreground">Level {i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Giving Areas" title="Where Your Contribution Can Go" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a) => (
              <div key={a.label} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <a.icon className="h-5 w-5" />
                </div>
                <span className="font-heading text-lg font-semibold">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Speak With Our Philanthropy Team" title="Start a Conversation" />
          <form onSubmit={submit} className="mt-12 space-y-5 rounded-2xl border border-border bg-card p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="mg-name">Full Name *</Label>
                <Input id="mg-name" value={form.name} onChange={(e) => set("name", e.target.value)} className="mt-1.5" required />
              </div>
              <div>
                <Label htmlFor="mg-email">Email *</Label>
                <Input id="mg-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="mt-1.5" required />
              </div>
            </div>
            <div>
              <Label htmlFor="mg-org">Organization (optional)</Label>
              <Input id="mg-org" value={form.organization} onChange={(e) => set("organization", e.target.value)} className="mt-1.5" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label>Estimated Giving Range</Label>
                <Select value={form.range} onValueChange={(v) => set("range", v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select range" /></SelectTrigger>
                  <SelectContent>
                    {RANGES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Area of Interest</Label>
                <Select value={form.area} onValueChange={(v) => set("area", v)}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select area" /></SelectTrigger>
                  <SelectContent>
                    {AREAS.map((a) => <SelectItem key={a.label} value={a.label}>{a.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Preferred Contact Method</Label>
              <Select value={form.contact_method} onValueChange={(v) => set("contact_method", v)}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Phone (if provided)">Phone (if provided)</SelectItem>
                  <SelectItem value="Website chat">Website chat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mg-msg">Message *</Label>
              <Textarea id="mg-msg" value={form.message} onChange={(e) => set("message", e.target.value)} rows={5} className="mt-1.5" required />
            </div>
            <Button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground hover:bg-forest">
              {submitting ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Speak With Our Philanthropy Team</>}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">Prefer to give directly?</p>
            <Button asChild variant="outline" className="mt-3 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/donate"><Heart className="mr-2 h-4 w-4" /> Donate Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}