import { useState } from "react";
import { Search, Mail, Phone, ShieldCheck, Handshake, User as UserIcon, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StrategicPartnerBadge } from "@/components/StrategicPartnerBadge";

function levelInfo(user, partnerApps) {
  if (user.partner_status === "approved") {
    const app = partnerApps.find((a) => a.created_by_id === user.id);
    return { label: "Strategic Partner", org: app?.organization_legal_name };
  }
  if (user.partner_status === "pending_review") return { label: "Partner (Pending)" };
  if (user.partner_status === "rejected") return { label: "Partner (Rejected)" };
  return { label: "Regular Donor" };
}

export default function MembersManagement({ users, partnerApps }) {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const filtered = users.filter((u) => {
    const info = levelInfo(u, partnerApps);
    const matchesSearch =
      !search ||
      (u.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.phone || "").includes(search);
    const matchesLevel = levelFilter === "all" || (levelFilter === "partner" && u.partner_status === "approved") || (levelFilter === "pending" && u.partner_status === "pending_review") || (levelFilter === "donor" && (!u.partner_status || u.partner_status === "none"));
    return matchesSearch && matchesLevel;
  });

  const partnerCount = users.filter((u) => u.partner_status === "approved").length;
  const pendingCount = users.filter((u) => u.partner_status === "pending_review").length;
  const donorCount = users.filter((u) => !u.partner_status || u.partner_status === "none").length;

  return (
    <div>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gold/30 bg-gold/5 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gold-dark"><Handshake className="h-4 w-4" /> Strategic Partners</div>
          <div className="mt-1 font-heading text-2xl font-semibold">{partnerCount}</div>
        </div>
        <div className="rounded-xl border border-amber-300/40 bg-amber-50/50 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-amber-700"><ShieldCheck className="h-4 w-4" /> Pending Partners</div>
          <div className="mt-1 font-heading text-2xl font-semibold">{pendingCount}</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground"><UserIcon className="h-4 w-4" /> Regular Donors</div>
          <div className="mt-1 font-heading text-2xl font-semibold">{donorCount}</div>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, or phone..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          {["all", "partner", "pending", "donor"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${levelFilter === lvl ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:bg-secondary/50"}`}
            >
              {lvl === "all" ? "All Members" : lvl === "partner" ? "Partners" : lvl === "pending" ? "Pending" : "Donors"}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Member</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Level</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No members found.</td></tr>
              )}
              {filtered.map((u) => {
                const info = levelInfo(u, partnerApps);
                return (
                  <tr key={u.id} className="hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <div className="font-medium">{u.full_name || "—"}</div>
                      {info.org && <div className="text-xs text-muted-foreground">{info.org}</div>}
                      {u.referral_information && <div className="text-xs text-muted-foreground">Ref: {u.referral_information}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="break-all">{u.email || "—"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        {u.phone || "—"}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {u.partner_status === "approved" ? (
                        <StrategicPartnerBadge />
                      ) : u.partner_status === "pending_review" ? (
                        <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-700">Partner (Pending)</Badge>
                      ) : u.partner_status === "rejected" ? (
                        <Badge variant="outline" className="border-red-300 bg-red-50 text-red-700">Partner (Rejected)</Badge>
                      ) : (
                        <Badge variant="outline">Regular Donor</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={u.role === "admin" ? "default" : "secondary"}>{u.role || "user"}</Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {u.created_date ? new Date(u.created_date).toLocaleDateString() : "—"}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}