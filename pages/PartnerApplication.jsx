import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Handshake, CheckCircle2, Clock, ArrowRight, XCircle, FileText } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import PartnerApplicationForm from "@/components/PartnerApplicationForm";

const STATUS_LABELS = {
  pending_review: { label: "Pending Review", variant: "outline", className: "border-amber-300 bg-amber-50 text-amber-800" },
  approved: { label: "Approved", variant: "outline", className: "border-emerald-300 bg-emerald-50 text-emerald-800" },
  rejected: { label: "Rejected", variant: "outline", className: "border-red-300 bg-red-50 text-red-800" },
};

export default function PartnerApplication() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    base44.entities.PartnerApplication.filter({ created_by_id: user.id }, "-created_date", 10)
      .then(setApplications)
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const latest = applications[0];
  const canApply = !latest || latest.status === "rejected";

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const app = await base44.entities.PartnerApplication.create({ ...formData, status: "pending_review" });
      try { await base44.auth.updateMe({ partner_status: "pending_review" }); } catch {}
      setSubmitted(app);
      setApplications((a) => [app, ...a]);
    } catch (err) {
      alert(err.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-primary" />
      </div>
    );
  }

  if (submitted) {
    return (
      <>
        <PageHero eyebrow="Partnership" title="Application Received!" />
        <section className="bg-background">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h2 className="mt-4 font-heading text-2xl font-semibold">Thank you, {submitted.organization_legal_name}!</h2>
              <p className="mt-2 text-muted-foreground">Your partner application has been received and is now under review.</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2">
                <Clock className="h-4 w-4 text-amber-700" />
                <span className="text-sm font-medium text-amber-800">Status: Pending Review</span>
              </div>
              <div className="mt-6 space-y-1 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Estimated Response Time:</strong> 2–3 business days</p>
                <p><strong className="text-foreground">Next Steps:</strong> Our partnership team will review your application and contact {submitted.work_email} with next steps or MOU details.</p>
              </div>
              <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-forest">
                <Link to="/my-giving">Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Partnership" title="Become a Strategic Partner" subtitle="Partnering with us unlocks corporate sponsorships, joint initiatives, and organization-level branding opportunities." />

      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          {!canApply && latest && (
            <div className="mb-8 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Handshake className="h-5 w-5 text-primary" />
                  <span className="font-medium">Your Application Status</span>
                </div>
                <Badge className={STATUS_LABELS[latest.status]?.className}>{STATUS_LABELS[latest.status]?.label}</Badge>
              </div>
              {latest.status === "pending_review" && (
                <p className="mt-3 text-sm text-muted-foreground">Your application is currently being reviewed by our partnership team. You'll be contacted at {latest.work_email} once a decision is made.</p>
              )}
              {latest.status === "approved" && (
                <p className="mt-3 text-sm text-muted-foreground">Congratulations! Your partnership has been approved. Partner benefits and dashboard features are now unlocked.</p>
              )}
            </div>
          )}

          {canApply ? (
            <>
              {latest?.status === "rejected" && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50/60 p-4 text-sm text-red-800">
                  Your previous application was not approved at this time. You may submit a new application below.
                </div>
              )}
              <div className="rounded-2xl border border-border bg-card p-8">
                <h2 className="mb-6 font-heading text-xl font-semibold">Partner Application Questionnaire</h2>
                <PartnerApplicationForm onSubmit={handleSubmit} loading={submitting} defaults={{ contact_name: user?.full_name || "", work_email: user?.email || "" }} />
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="mt-4 font-heading text-lg text-foreground/70">Your application is being reviewed.</p>
              <p className="mt-2 text-sm text-muted-foreground">You'll be able to submit a new application once the review process is complete.</p>
              <Button asChild variant="outline" className="mt-6">
                <Link to="/my-giving">Back to Dashboard</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}