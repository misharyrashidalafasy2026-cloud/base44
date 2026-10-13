import { useState } from "react";
import { Mail, Send, AlertTriangle, ShieldAlert, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";
import { SITE } from "@/lib/siteConfig";
import NotARobot from "@/components/NotARobot";

const REPORT_TYPES = [
  { value: "misconduct", label: "Misconduct" },
  { value: "misrepresentation", label: "Misrepresentation" },
  { value: "fraudulent_payment", label: "Pressure to pay outside the website / Fraudulent payment requests" },
  { value: "false_promises", label: "False promises" },
  { value: "unauthorized_fundraising", label: "Unauthorized fundraising" },
  { value: "suspicious_behavior", label: "Suspicious behavior" },
];

export default function Contact() {
  const { toast } = useToast();
  const [contact, setContact] = useState({ name: "", email: "", subject: "", message: "" });
  const [report, setReport] = useState({ reporter_name: "", reporter_email: "", agent_name: "", agent_id: "", report_type: "", description: "" });
  const [submittingC, setSubmittingC] = useState(false);
  const [submittingR, setSubmittingR] = useState(false);
  const [notRobotC, setNotRobotC] = useState(false);
  const [notRobotR, setNotRobotR] = useState(false);

  const submitContact = async (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.message) {
      toast({ title: "Please complete the required fields.", variant: "destructive" });
      return;
    }
    if (!notRobotC) {
      toast({ title: "Please verify you're not a robot.", variant: "destructive" });
      return;
    }
    setSubmittingC(true);
    try {
      await base44.entities.SupportEnquiry.create({
        ...contact,
        category: "general",
        status: "new",
      });
      toast({ title: "Thank you for reaching out.", description: "Our support team will respond to your enquiry." });
      setContact({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setSubmittingC(false);
    }
  };

  const submitReport = async (e) => {
    e.preventDefault();
    if (!report.reporter_name || !report.reporter_email || !report.report_type || !report.description) {
      toast({ title: "Please complete the required fields.", variant: "destructive" });
      return;
    }
    if (!notRobotR) {
      toast({ title: "Please verify you're not a robot.", variant: "destructive" });
      return;
    }
    setSubmittingR(true);
    try {
      await base44.entities.AgentReport.create({ ...report, status: "submitted" });
      toast({ title: "Report submitted.", description: "We take all reports seriously and will review this promptly." });
      setReport({ reporter_name: "", reporter_email: "", agent_name: "", agent_id: "", report_type: "", description: "" });
    } catch (err) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setSubmittingR(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're Here to Help."
        subtitle="Reach our support team with any question about donations, verification, or our charitable programs. We respond with care and confidentiality."
      />

      {/* Contact info */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-7">
              <Mail className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-heading text-lg font-semibold">Foundation Support</h3>
              <p className="mt-1 text-sm text-muted-foreground">Donation assistance & general enquiries</p>
              <a href={`mailto:${SITE.supportEmail}`} className="mt-2 block text-sm font-medium text-primary hover:underline">{SITE.supportEmail}</a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7">
              <Mail className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-heading text-lg font-semibold">Mishary Rashid Alafasy Contact</h3>
              <p className="mt-1 text-sm text-muted-foreground">Email contact only</p>
              <a href={`mailto:${SITE.alafasyEmail}`} className="mt-2 block text-sm font-medium text-primary hover:underline">{SITE.alafasyEmail}</a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7">
              <MapPin className="h-6 w-6 text-accent" />
              <h3 className="mt-4 font-heading text-lg font-semibold">Location</h3>
              <p className="mt-1 text-sm text-muted-foreground">{SITE.location}</p>
              <p className="mt-2 text-xs text-muted-foreground">Official address details will be published once verified.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <Tabs defaultValue="enquiry" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="enquiry">General Enquiry</TabsTrigger>
              <TabsTrigger value="report" className="text-destructive">Report an Agent</TabsTrigger>
            </TabsList>

            {/* Enquiry */}
            <TabsContent value="enquiry">
              <SectionHeading eyebrow="Send a Message" title="How Can We Help?" />
              <form onSubmit={submitContact} className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-name">Full Name *</Label>
                    <Input id="c-name" value={contact.name} onChange={(e) => setContact((f) => ({ ...f, name: e.target.value }))} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="c-email">Email *</Label>
                    <Input id="c-email" type="email" value={contact.email} onChange={(e) => setContact((f) => ({ ...f, email: e.target.value }))} className="mt-1.5" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="c-subject">Subject</Label>
                  <Input id="c-subject" value={contact.subject} onChange={(e) => setContact((f) => ({ ...f, subject: e.target.value }))} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="c-msg">Message *</Label>
                  <Textarea id="c-msg" value={contact.message} onChange={(e) => setContact((f) => ({ ...f, message: e.target.value }))} rows={5} className="mt-1.5" required />
                </div>
                <NotARobot checked={notRobotC} onChange={setNotRobotC} />
                <Button type="submit" disabled={submittingC || !notRobotC} className="w-full bg-primary text-primary-foreground hover:bg-forest">
                  {submittingC ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Enquiry</>}
                </Button>
              </form>
            </TabsContent>

            {/* Report */}
            <TabsContent value="report">
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-300/50 bg-red-50/70 p-5 text-sm text-red-900/80">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <div>
                  <p className="font-semibold text-red-800">Never pay an agent directly.</p>
                  <p className="mt-1">All contributions must be made through the official Baitul-Ehsan Relief Fund website and approved cryptocurrency payment process. Agents must never request private wallet transfers, cash, seed phrases, passwords, or private keys.</p>
                </div>
              </div>
              <SectionHeading eyebrow="Report an Agent" title="Help Us Protect Donors" />
              <form onSubmit={submitReport} className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="r-name">Your Name *</Label>
                    <Input id="r-name" value={report.reporter_name} onChange={(e) => setReport((f) => ({ ...f, reporter_name: e.target.value }))} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="r-email">Your Email *</Label>
                    <Input id="r-email" type="email" value={report.reporter_email} onChange={(e) => setReport((f) => ({ ...f, reporter_email: e.target.value }))} className="mt-1.5" required />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="r-agent">Agent Name (if known)</Label>
                    <Input id="r-agent" value={report.agent_name} onChange={(e) => setReport((f) => ({ ...f, agent_name: e.target.value }))} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="r-id">Agent ID (if known)</Label>
                    <Input id="r-id" value={report.agent_id} onChange={(e) => setReport((f) => ({ ...f, agent_id: e.target.value }))} className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label>Report Type *</Label>
                  <Select value={report.report_type} onValueChange={(v) => setReport((f) => ({ ...f, report_type: v }))}>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select type of report" /></SelectTrigger>
                    <SelectContent>
                      {REPORT_TYPES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="r-desc">Description *</Label>
                  <Textarea id="r-desc" value={report.description} onChange={(e) => setReport((f) => ({ ...f, description: e.target.value }))} rows={5} className="mt-1.5" required />
                </div>
                <NotARobot checked={notRobotR} onChange={setNotRobotR} />
                <Button type="submit" disabled={submittingR || !notRobotR} className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  {submittingR ? "Submitting..." : <><AlertTriangle className="mr-2 h-4 w-4" /> Submit Report</>}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}