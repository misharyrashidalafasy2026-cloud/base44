// Admin dashboard — manage donations, enquiries, agent reports, wallets, projects.
import { useState, useEffect } from "react";
import { LayoutDashboard, Heart, Mail, ShieldAlert, Wallet, FolderKanban, TrendingUp, Clock, CheckCircle2, RefreshCw, Handshake, Users, Newspaper } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { WALLETS, DONATION_STATUSES } from "@/lib/siteConfig";
import PartnerManagement from "@/components/admin/PartnerManagement";
import MembersManagement from "@/components/admin/MembersManagement";
import NewsManagement from "@/components/admin/NewsManagement";

const STATUS_KEYS = Object.keys(DONATION_STATUSES);

export default function Admin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [donations, setDonations] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [reports, setReports] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({ name: "", category: "", location: "", funding_goal: "", description: "", image_url: "" });
  const [partnerApps, setPartnerApps] = useState([]);
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);
  const [partnerFilter, setPartnerFilter] = useState("pending_review");
  const [partnerSearch, setPartnerSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [adminNote, setAdminNote] = useState("");

  const loadAll = async () => {
    setLoading(true);
    try {
      const [d, e, r, p, pa, u, nw] = await Promise.all([
        base44.entities.Donation.list("-created_date", 200),
        base44.entities.SupportEnquiry.list("-created_date", 100),
        base44.entities.AgentReport.list("-created_date", 100),
        base44.entities.Project.list("-created_date", 100),
        base44.entities.PartnerApplication.list("-created_date", 100),
        base44.entities.User.list("-created_date", 200),
        base44.entities.NewsUpdate.list("-created_date", 100),
      ]);
      setDonations(d); setEnquiries(e); setReports(r); setProjects(p); setPartnerApps(pa); setUsers(u); setNews(nw);
    } catch (err) {
      toast({ title: "Failed to load admin data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  if (user && user.role !== "admin") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <ShieldAlert className="h-12 w-12 text-destructive" />
        <h1 className="mt-4 font-heading text-2xl font-semibold">Administrator Access Required</h1>
        <p className="mt-2 text-sm text-muted-foreground">This area is restricted to authorized administrators.</p>
      </div>
    );
  }

  const totalAmount = donations.reduce((s, d) => s + (d.amount || 0), 0);
  const pendingVer = donations.filter((d) => ["submitted", "under_review", "processing"].includes(d.status)).length;
  const completed = donations.filter((d) => d.status === "completed").length;

  const updateStatus = async (id, status) => {
    try {
      await base44.entities.Donation.update(id, { status });
      toast({ title: "Donation status updated." });
      loadAll();
    } catch (err) {
      toast({ title: "Update failed.", variant: "destructive" });
    }
  };

  const addProject = async (e) => {
    e.preventDefault();
    if (!newProject.name || !newProject.category || !newProject.location) {
      toast({ title: "Please complete required fields.", variant: "destructive" });
      return;
    }
    try {
      await base44.entities.Project.create({
        ...newProject,
        funding_goal: parseFloat(newProject.funding_goal) || 0,
        amount_raised: 0,
        status: "planned",
        is_demo: true,
      });
      toast({ title: "Project added (marked as DEMO DATA)." });
      setNewProject({ name: "", category: "", location: "", funding_goal: "", description: "", image_url: "" });
      loadAll();
    } catch (err) {
      toast({ title: "Could not add project.", variant: "destructive" });
    }
  };

  const reviewApplication = async (app, decision) => {
    try {
      await base44.entities.PartnerApplication.update(app.id, {
        status: decision,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user?.email,
        admin_notes: adminNote || app.admin_notes || "",
      });
      try { await base44.entities.User.update(app.created_by_id, { partner_status: decision }); } catch {}
      try { await base44.functions.invoke("notifyPartnerDecision", { application_id: app.id, decision, organization_name: app.organization_legal_name, contact_email: app.work_email }); } catch {}
      toast({ title: `Application ${decision === "approved" ? "approved" : "rejected"}.` });
      setSelectedApp(null);
      setAdminNote("");
      loadAll();
    } catch (err) {
      toast({ title: "Failed to update application.", variant: "destructive" });
    }
  };

  return (
    <>
      <PageHero eyebrow="Administration" title="Admin Dashboard" subtitle="Manage donations, verify transactions, review enquiries and agent reports, and maintain projects and wallet information." />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <LayoutDashboard className="h-4 w-4" /> Signed in as {user?.email}
            </div>
            <Button variant="outline" size="sm" onClick={loadAll}><RefreshCw className="mr-2 h-4 w-4" /> Refresh</Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Stat icon={TrendingUp} label="Total Donations" value={donations.length} />
            <Stat icon={Heart} label="Total Amount" value={`$${totalAmount.toLocaleString()}`} />
            <Stat icon={Clock} label="Pending Verification" value={pendingVer} />
            <Stat icon={CheckCircle2} label="Completed" value={completed} />
          </div>

          <Tabs defaultValue="donations" className="mt-10">
            <TabsList className="flex-wrap">
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="enquiries">Enquiries ({enquiries.length})</TabsTrigger>
              <TabsTrigger value="reports">Agent Reports ({reports.length})</TabsTrigger>
              <TabsTrigger value="wallets">Wallets</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="partners">Partners ({partnerApps.filter((a) => a.status === "pending_review").length})</TabsTrigger>
              <TabsTrigger value="members">Members ({users.length})</TabsTrigger>
              <TabsTrigger value="news">News ({news.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="donations">
              <div className="overflow-hidden rounded-2xl border border-border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Donation ID</th>
                        <th className="px-4 py-3 font-medium">Donor</th>
                        <th className="px-4 py-3 font-medium">Amount</th>
                        <th className="px-4 py-3 font-medium">Crypto</th>
                        <th className="px-4 py-3 font-medium">Tx Hash</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {donations.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No donations yet.</td></tr>}
                      {donations.map((d) => (
                        <tr key={d.id} className="hover:bg-secondary/30">
                          <td className="px-4 py-3 font-mono text-xs">{d.donation_id}</td>
                          <td className="px-4 py-3">{d.donor_name}<div className="text-xs text-muted-foreground">{d.donor_email}</div></td>
                          <td className="px-4 py-3 font-semibold">${(d.amount || 0).toLocaleString()}</td>
                          <td className="px-4 py-3">{d.cryptocurrency}</td>
                          <td className="px-4 py-3 max-w-[160px] truncate font-mono text-xs" title={d.transaction_hash}>{d.transaction_hash || "—"}</td>
                          <td className="px-4 py-3"><span className={DONATION_STATUSES[d.status]?.color}>{DONATION_STATUSES[d.status]?.label || d.status}</span></td>
                          <td className="px-4 py-3">
                            <Select value={d.status} onValueChange={(v) => updateStatus(d.id, v)}>
                              <SelectTrigger className="h-8 w-[140px] text-xs"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {STATUS_KEYS.map((s) => <SelectItem key={s} value={s}>{DONATION_STATUSES[s].label}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="enquiries">
              <div className="space-y-4">
                {enquiries.length === 0 && <EmptyState icon={Mail} text="No enquiries yet." />}
                {enquiries.map((e) => (
                  <div key={e.id} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{e.name} <span className="text-xs text-muted-foreground">· {e.email}</span></div>
                      <Badge variant="outline">{e.category}</Badge>
                    </div>
                    {e.subject && <div className="mt-1 text-sm font-medium">{e.subject}</div>}
                    <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{e.message}</p>
                    <div className="mt-2 text-xs text-muted-foreground">{new Date(e.created_date).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="space-y-4">
                {reports.length === 0 && <EmptyState icon={ShieldAlert} text="No agent reports yet." />}
                {reports.map((r) => (
                  <div key={r.id} className="rounded-xl border border-red-200/60 bg-red-50/40 p-5">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{r.reporter_name} <span className="text-xs text-muted-foreground">· {r.reporter_email}</span></div>
                      <Badge variant="outline" className="border-red-300 text-red-700">{r.report_type}</Badge>
                    </div>
                    {r.agent_name && <div className="mt-1 text-sm">Agent: {r.agent_name} {r.agent_id && `(${r.agent_id})`}</div>}
                    <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{r.description}</p>
                    <div className="mt-2 text-xs text-muted-foreground">{new Date(r.created_date).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="wallets">
              <div className="mb-6 rounded-xl border border-amber-300/40 bg-amber-50/60 p-4 text-sm text-amber-900/80">
                Wallet addresses are pending production verification. Full admin-editable wallet management with audit logging will be available once verification is complete. Never alter a wallet address silently.
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {WALLETS.map((w) => (
                  <div key={w.asset} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg text-white" style={{ backgroundColor: w.color }}>
                        <span className="text-xs font-bold">{w.symbol}</span>
                      </div>
                      <div>
                        <div className="font-medium">{w.asset}</div>
                        <div className="text-xs text-muted-foreground">{w.network}</div>
                      </div>
                    </div>
                    <code className="mt-3 block break-all rounded-md border border-border bg-secondary/40 p-2 text-xs">{w.address}</code>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <div className="grid gap-8 lg:grid-cols-3">
                <form onSubmit={addProject} className="rounded-2xl border border-border bg-card p-6 lg:col-span-1">
                  <h3 className="font-heading text-lg font-semibold">Add Project</h3>
                  <p className="mt-1 text-xs text-muted-foreground">New projects are marked as DEMO DATA.</p>
                  <div className="mt-4 space-y-3">
                    <div><Label htmlFor="p-name">Name *</Label><Input id="p-name" value={newProject.name} onChange={(e) => setNewProject((f) => ({ ...f, name: e.target.value }))} className="mt-1" /></div>
                    <div><Label htmlFor="p-cat">Category *</Label><Input id="p-cat" value={newProject.category} onChange={(e) => setNewProject((f) => ({ ...f, category: e.target.value }))} className="mt-1" /></div>
                    <div><Label htmlFor="p-loc">Location *</Label><Input id="p-loc" value={newProject.location} onChange={(e) => setNewProject((f) => ({ ...f, location: e.target.value }))} className="mt-1" /></div>
                    <div><Label htmlFor="p-goal">Funding Goal (USD)</Label><Input id="p-goal" type="number" value={newProject.funding_goal} onChange={(e) => setNewProject((f) => ({ ...f, funding_goal: e.target.value }))} className="mt-1" /></div>
                    <div><Label htmlFor="p-desc">Description</Label><Input id="p-desc" value={newProject.description} onChange={(e) => setNewProject((f) => ({ ...f, description: e.target.value }))} className="mt-1" /></div>
                    <div><Label htmlFor="p-img">Image URL (optional)</Label><Input id="p-img" value={newProject.image_url} onChange={(e) => setNewProject((f) => ({ ...f, image_url: e.target.value }))} placeholder="https://..." className="mt-1" /></div>
                    <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-forest">Add Project</Button>
                  </div>
                </form>
                <div className="space-y-3 lg:col-span-2">
                  {projects.length === 0 && <EmptyState icon={FolderKanban} text="No projects yet." />}
                  {projects.map((p) => (
                    <div key={p.id} className="rounded-xl border border-border bg-card p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{p.name}</div>
                        {p.is_demo && <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800">DEMO</Badge>}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{p.category} · {p.location}</div>
                      <div className="mt-1 text-sm text-muted-foreground">${(p.amount_raised || 0).toLocaleString()} / ${p.funding_goal.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="partners">
              <PartnerManagement
                partnerApps={partnerApps}
                filter={partnerFilter}
                setFilter={setPartnerFilter}
                search={partnerSearch}
                setSearch={setPartnerSearch}
                selectedApp={selectedApp}
                setSelectedApp={setSelectedApp}
                adminNote={adminNote}
                setAdminNote={setAdminNote}
                onReview={reviewApplication}
              />
            </TabsContent>

            <TabsContent value="members">
              <MembersManagement users={users} partnerApps={partnerApps} />
            </TabsContent>

            <TabsContent value="news">
              <NewsManagement news={news} onRefresh={loadAll} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 font-heading text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
      <Icon className="mx-auto h-8 w-8 text-muted-foreground/40" />
      <p className="mt-3 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}