import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ORG_TYPES = ["Business / Corporate", "Non-Profit / NGO", "Educational Institution", "Media / Marketing", "Government", "Other"];
const PARTNER_CATEGORIES = ["Corporate Financial Sponsor", "In-Kind / Service Provider", "Joint Event / Program Ally", "Marketing / Media Partner"];
const COMMITMENT_LEVELS = ["Under $2,500", "$2,500–$10,000", "$10,000–$50,000", "$50,000+"];

const STEPS = ["Organization", "Primary Contact", "Partnership Intent", "Authorization"];

export default function PartnerApplicationForm({ onSubmit, loading = false, defaults = {}, submitLabel = "Submit Partner Application" }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    organization_legal_name: "",
    organization_type: "",
    website: "",
    headquarters: "",
    contact_name: defaults.contact_name || "",
    job_title: "",
    work_email: defaults.work_email || "",
    phone: "",
    partnership_category: "",
    estimated_commitment: "",
    proposed_goals: "",
    authorization_confirmed: false,
    terms_confirmed: false,
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const clearErr = (k) => setErrors((e) => { const n = { ...e }; delete n[k]; return n; });

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.organization_legal_name.trim()) e.organization_legal_name = "Organization name is required";
      if (!form.organization_type) e.organization_type = "Please select an organization type";
      if (!form.headquarters.trim()) e.headquarters = "Location is required";
    } else if (step === 1) {
      if (!form.contact_name.trim()) e.contact_name = "Contact name is required";
      if (!form.job_title.trim()) e.job_title = "Job title is required";
      if (!form.work_email.trim()) e.work_email = "Work email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.work_email)) e.work_email = "Enter a valid email address";
      if (!form.phone.trim()) e.phone = "Phone number is required";
    } else if (step === 2) {
      if (!form.partnership_category) e.partnership_category = "Please select a category";
      if (!form.proposed_goals.trim()) e.proposed_goals = "Please describe your proposed goals";
    } else if (step === 3) {
      if (!form.authorization_confirmed) e.authorization_confirmed = "You must confirm authorization";
      if (!form.terms_confirmed) e.terms_confirmed = "You must agree to the terms";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const submit = () => { if (validateStep()) onSubmit(form); };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                  i < step ? "border-primary bg-primary text-primary-foreground" : i === step ? "border-primary text-primary" : "border-border text-muted-foreground"
                )}>
                  {i < step ? "✓" : i + 1}
                </span>
                <span className={cn("hidden sm:inline text-xs font-medium", i === step ? "text-foreground" : "text-muted-foreground")}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <span className="mx-2 h-px flex-1 bg-border" />}
            </div>
          ))}
        </div>
        <div className="mt-3 h-1 w-full rounded-full bg-secondary">
          <div className="h-1 rounded-full bg-primary transition-all duration-300" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-4">
          <h3 className="font-heading text-xl font-semibold">Section A — Organization Details</h3>
          <Field label="Organization Legal Name *" error={errors.organization_legal_name}>
            <Input value={form.organization_legal_name} onChange={(e) => { set("organization_legal_name", e.target.value); clearErr("organization_legal_name"); }} placeholder="Acme Corporation" />
          </Field>
          <Field label="Organization Type *" error={errors.organization_type}>
            <Select value={form.organization_type} onValueChange={(v) => { set("organization_type", v); clearErr("organization_type"); }}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>{ORG_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Website URL">
            <Input value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://example.org" />
          </Field>
          <Field label="Country / Headquarters Location *" error={errors.headquarters}>
            <Input value={form.headquarters} onChange={(e) => { set("headquarters", e.target.value); clearErr("headquarters"); }} placeholder="Kuwait City, Kuwait" />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-heading text-xl font-semibold">Section B — Primary Contact</h3>
          <Field label="Contact Name *" error={errors.contact_name}>
            <Input value={form.contact_name} onChange={(e) => { set("contact_name", e.target.value); clearErr("contact_name"); }} placeholder="Jane Doe" />
          </Field>
          <Field label="Job Title / Role *" error={errors.job_title}>
            <Input value={form.job_title} onChange={(e) => { set("job_title", e.target.value); clearErr("job_title"); }} placeholder="Director of Partnerships" />
          </Field>
          <Field label="Work Email *" error={errors.work_email}>
            <Input type="email" value={form.work_email} onChange={(e) => { set("work_email", e.target.value); clearErr("work_email"); }} placeholder="jane@example.org" />
          </Field>
          <Field label="Phone Number *" error={errors.phone}>
            <Input value={form.phone} onChange={(e) => { set("phone", e.target.value); clearErr("phone"); }} placeholder="+965 0000 0000" />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-heading text-xl font-semibold">Section C — Partnership Intent & Scope</h3>
          <Field label="Partnership Category *" error={errors.partnership_category}>
            <Select value={form.partnership_category} onValueChange={(v) => { set("partnership_category", v); clearErr("partnership_category"); }}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>{PARTNER_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Estimated Annual Commitment / Value">
            <Select value={form.estimated_commitment} onValueChange={(v) => set("estimated_commitment", v)}>
              <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
              <SelectContent>{COMMITMENT_LEVELS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <Field label="Proposed Goals & Resources *" error={errors.proposed_goals} helper="Briefly describe what resources, services, or support your organization aims to contribute and what you hope to achieve together.">
            <Textarea rows={4} value={form.proposed_goals} onChange={(e) => { set("proposed_goals", e.target.value); clearErr("proposed_goals"); }} placeholder="We aim to contribute..." />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <h3 className="font-heading text-xl font-semibold">Section D — Authorization & Terms</h3>
          <CheckboxField checked={form.authorization_confirmed} onChange={(v) => { set("authorization_confirmed", v); clearErr("authorization_confirmed"); }} error={errors.authorization_confirmed} label="I confirm I am an authorized representative of my organization to submit this inquiry." />
          <CheckboxField checked={form.terms_confirmed} onChange={(v) => { set("terms_confirmed", v); clearErr("terms_confirmed"); }} error={errors.terms_confirmed} label="I agree to the preliminary partnership terms and privacy policy." />
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <Button variant="ghost" onClick={back} disabled={step === 0} type="button">
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={next} type="button" className="bg-primary text-primary-foreground hover:bg-forest">
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={submit} disabled={loading} type="button" className="bg-primary text-primary-foreground hover:bg-forest">
            {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>) : submitLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, helper, children }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {helper && <p className="text-xs text-muted-foreground">{helper}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function CheckboxField({ checked, onChange, error, label }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <Checkbox checked={checked} onCheckedChange={onChange} className="mt-0.5" id={label} />
        <label htmlFor={label} className="cursor-pointer text-sm text-foreground leading-relaxed">{label}</label>
      </div>
      {error && <p className="mt-1 pl-8 text-xs text-destructive">{error}</p>}
    </div>
  );
}