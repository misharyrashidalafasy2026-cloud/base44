import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search, Check, X, ChevronLeft } from "lucide-react";

const STATUS_BADGES = {
  pending_review: { label: "Pending Review", className: "border-amber-300 bg-amber-50 text-amber-800" },
  approved: { label: "Approved", className: "border-emerald-300 bg-emerald-50 text-emerald-800" },
  rejected: { label: "Rejected", className: "border-red-300 bg-red-50 text-red-800" },
};

export default function PartnerManagement({ partnerApps, filter, setFilter, search, setSearch, selectedApp, setSelectedApp, adminNote, setAdminNote, onReview }) {
  if (selectedApp) {
    const app = selectedApp;
    return (
      <div>
        <Button variant="ghost" onClick={() => setSelectedApp(null)} className="mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to list
        </Button>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl font-semibold">{app.organization_legal_name}</h3>
            <Badge className={STATUS_BADGES[app.status]?.className}>{STATUS_BADGES[app.status]?.label}</Badge>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Detail label="Organization Type" value={app.organization_type} />
            <Detail label="Website" value={app.website} />
            <Detail label="Headquarters" value={app.headquarters} />
            <Detail label="Partnership Category" value={app.partnership_category} />
            <Detail label="Estimated Commitment" value={app.estimated_commitment} />
            <Detail label="Submitted" value={app.created_date ? new Date(app.created_date).toLocaleString() : "—"} />
            <Detail label="Contact Name" value={app.contact_name} />
            <Detail label="Job Title" value={app.job_title} />
            <Detail label="Work Email" value={app.work_email} />
            <Detail label="Phone" value={app.phone} />
          </div>
          <div className="mt-4">
            <Label>Proposed Goals & Resources</Label>
            <p className="mt-1 whitespace-pre-wrap rounded-lg border border-border bg-secondary/30 p-3 text-sm">{app.proposed_goals}</p>
          </div>
          {app.reviewed_by && (
            <div className="mt-4 text-sm text-muted-foreground">
              Reviewed by {app.reviewed_by} on {app.reviewed_at ? new Date(app.reviewed_at).toLocaleString() : "—"}
            </div>
          )}
          <div className="mt-4">
            <Label htmlFor="admin-notes">Internal Notes</Label>
            <Textarea id="admin-notes" rows={3} value={adminNote} onChange={(e) => setAdminNote(e.target.value)} placeholder="Add internal review notes..." />
          </div>
          {app.status === "pending_review" && (
            <div className="mt-6 flex gap-3">
              <Button onClick={() => onReview(app, "approved")} className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Check className="mr-1.5 h-4 w-4" /> Approve
              </Button>
              <Button onClick={() => onReview(app, "rejected")} variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                <X className="mr-1.5 h-4 w-4" /> Reject
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const filtered = partnerApps.filter((a) => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return a.organization_legal_name?.toLowerCase().includes(q) || a.contact_name?.toLowerCase().includes(q) || a.work_email?.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search organization, contact, or email..." className="pl-9" />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="sm:w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="pending_review">Pending Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
            <p className="text-sm text-muted-foreground">No partner applications found.</p>
          </div>
        )}
        {filtered.map((app) => (
          <div key={app.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{app.organization_legal_name}</div>
                <div className="text-xs text-muted-foreground">{app.contact_name} · {app.work_email}</div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={STATUS_BADGES[app.status]?.className}>{STATUS_BADGES[app.status]?.label}</Badge>
                <Button variant="outline" size="sm" onClick={() => { setSelectedApp(app); setAdminNote(app.admin_notes || ""); }}>Review</Button>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {app.partnership_category} · Submitted {new Date(app.created_date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm text-foreground">{value || "—"}</div>
    </div>
  );
}