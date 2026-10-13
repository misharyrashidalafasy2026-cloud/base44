import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Receipt, TrendingUp, Clock, CheckCircle2, FileText, ArrowRight, Handshake, XCircle } from "lucide-react";
import { StrategicPartnerSeal } from "@/components/StrategicPartnerBadge";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { DONATION_STATUSES } from "@/lib/siteConfig";

export default function MyGiving() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [partnerApp, setPartnerApp] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    base44.entities.Donation.filter({ donor_email: user.email }, "-created_date", 100)
      .then(setDonations)
      .catch(() => setDonations([]))
      .finally(() => setLoading(false));
    if (user?.id) {
      base44.entities.PartnerApplication.filter({ created_by_id: user.id }, "-created_date", 5)
        .then((apps) => setPartnerApp(apps[0] || null))
        .catch(() => setPartnerApp(null));
    }
  }, [user?.email, user?.id]);

  const totalGiven = donations.filter((d) => d.status === "completed" || d.status === "approved" || d.status === "submitted").reduce((s, d) => s + (d.amount || 0), 0);
  const completed = donations.filter((d) => d.status === "completed").length;
  const pending = donations.filter((d) => ["awaiting_payment", "submitted", "under_review", "processing"].includes(d.status)).length;
  const yearTotal = donations.filter((d) => new Date(d.created_date).getFullYear() === new Date().getFullYear()).reduce((s, d) => s + (d.amount || 0), 0);

  return (
    <>
      <PageHero
        eyebrow="My Giving"
        title="Your Giving Dashboard"
        subtitle="Track your contributions, view receipts, and follow the status of your donations — all in one place."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Summary cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={TrendingUp} label="Total Contributed" value={`$${totalGiven.toLocaleString()}`} />
            <StatCard icon={CheckCircle2} label="Completed" value={completed} />
            <StatCard icon={Clock} label="Pending" value={pending} />
            <StatCard icon={Receipt} label={`${new Date().getFullYear()} Giving`} value={`$${yearTotal.toLocaleString()}`} />
          </div>

          {/* Partnership status */}
          <PartnerStatusCard partnerApp={partnerApp} />

          <div className="mt-10 flex justify-between items-center">
            <h2 className="font-heading text-2xl font-semibold">Donation History</h2>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-forest">
              <Link to="/donate"><Heart className="mr-2 h-4 w-4" /> New Donation</Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-primary" />
            </div>
          ) : donations.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
              <Heart className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="mt-4 font-heading text-xl text-foreground/70">You haven't made a contribution yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">When you donate, your history and receipts will appear here.</p>
              <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-forest">
                <Link to="/donate">Make Your First Contribution <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Donation ID</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Purpose</th>
                      <th className="px-4 py-3 font-medium">Fund</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Crypto</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {donations.map((d) => {
                      const st = DONATION_STATUSES[d.status] || { label: d.status, color: "text-muted-foreground" };
                      return (
                        <tr key={d.id} className="bg-card hover:bg-secondary/30">
                          <td className="px-4 py-3 font-mono text-xs">{d.donation_id || "—"}</td>
                          <td className="px-4 py-3 text-muted-foreground">{d.created_date ? new Date(d.created_date).toLocaleDateString() : "—"}</td>
                          <td className="px-4 py-3">{d.giving_purpose}</td>
                          <td className="px-4 py-3">{d.fund}</td>
                          <td className="px-4 py-3 font-semibold">${(d.amount || 0).toLocaleString()}</td>
                          <td className="px-4 py-3">{d.cryptocurrency}</td>
                          <td className="px-4 py-3"><span className={st.color}>{st.label}</span></td>
                          <td className="px-4 py-3">
                            {d.receipt_number ? (
                              <Button variant="ghost" size="sm" className="px-0 text-accent hover:bg-transparent">
                                <FileText className="h-4 w-4" />
                              </Button>
                            ) : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <p className="mt-6 text-xs text-muted-foreground">
            Donation IDs shown are development examples (e.g. DON-2026-000284). Blockchain confirmation is not instant —
            verification may take time. Receipts are issued after your contribution is verified and approved.
          </p>
        </div>
      </section>
    </>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 font-heading text-3xl font-semibold text-foreground">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function PartnerStatusCard({ partnerApp }) {
  if (partnerApp?.status === "approved") {
    return (
      <div className="mt-8 overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/5 via-accent/8 to-gold/5 p-6">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <StrategicPartnerSeal />
          <div>
            <h3 className="font-heading text-xl font-semibold text-gold-dark">You are a Strategic Partner</h3>
            <p className="mt-1 text-sm text-muted-foreground">{partnerApp.organization_legal_name} — exclusive partner benefits and strategic giving opportunities are unlocked.</p>
          </div>
        </div>
      </div>
    );
  }
  if (partnerApp?.status === "pending_review") {
    return (
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <Clock className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-lg font-semibold">Partner Application Under Review</h3>
            <p className="text-sm text-muted-foreground">Your application is currently being reviewed by our partnership team.</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/partner-application">View Status</Link>
          </Button>
        </div>
      </div>
    );
  }
  if (partnerApp?.status === "rejected") {
    return (
      <div className="mt-8 rounded-2xl border border-red-200 bg-red-50/40 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-700">
            <XCircle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-lg font-semibold">Partner Application Not Approved</h3>
            <p className="text-sm text-muted-foreground">Your previous application was not approved. You can re-apply at any time.</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/partner-application">Re-apply</Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Handshake className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-heading text-lg font-semibold">Become a Strategic Partner</h3>
          <p className="text-sm text-muted-foreground">Unlock corporate sponsorships, joint initiatives, and organization-level branding.</p>
        </div>
        <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-forest">
          <Link to="/partner-application">Apply Now <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}