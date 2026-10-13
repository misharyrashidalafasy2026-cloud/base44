import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Mail, Lock, Loader2, Handshake, CheckCircle2, Users, ArrowRight } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import { toast } from "@/components/ui/use-toast";
import { safeReturnTo } from "@/lib/authReturnTo";
import PartnerApplicationForm from "@/components/PartnerApplicationForm";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referral, setReferral] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("account");
  const [otpCode, setOtpCode] = useState("");
  const [submittedApp, setSubmittedApp] = useState(null);
  const [userInfo, setUserInfo] = useState({ contact_name: "", work_email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }
    if (!referral.trim()) { setError("Please provide your agent or referral information to continue."); return; }
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      setStep("otp");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode });
      if (result?.access_token) {
        base44.auth.setToken(result.access_token);
        try { await base44.auth.updateMe({ referral_information: referral.trim() }); } catch {}
        try {
          const me = await base44.auth.me();
          setUserInfo({ contact_name: me?.full_name || "", work_email: me?.email || email });
        } catch { setUserInfo({ contact_name: "", work_email: email }); }
        setStep("partner_choice");
      }
    } catch (err) {
      setError(err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await base44.auth.resendOtp(email);
      toast({ title: "Code sent", description: "Check your email for the new code." });
    } catch (err) {
      setError(err.message || "Failed to resend code");
    }
  };

  const handleGoogle = () => base44.auth.loginWithProvider("google", safeReturnTo());

  const handlePartnerSubmit = async (formData) => {
    setLoading(true);
    try {
      const app = await base44.entities.PartnerApplication.create({ ...formData, status: "pending_review" });
      try { await base44.auth.updateMe({ partner_status: "pending_review" }); } catch {}
      setSubmittedApp(app);
      setStep("partner_confirmation");
    } catch (err) {
      setError(err.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const goToDashboard = () => { window.location.href = safeReturnTo(); };

  if (step === "otp") {
    return (
      <AuthLayout icon={Mail} title="Verify your email" subtitle={`We sent a code to ${email}`}>
        {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
        <div className="flex justify-center mb-6">
          <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} autoFocus autoComplete="one-time-code">
            <InputOTPGroup>
              <InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} />
              <InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button className="w-full h-12 font-medium" onClick={handleVerify} disabled={loading || otpCode.length < 6}>
          {loading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</>) : "Verify"}
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Didn't receive the code?{" "}
          <button onClick={handleResend} className="text-primary font-medium hover:underline">Resend</button>
        </p>
      </AuthLayout>
    );
  }

  if (step === "partner_choice") {
    return (
      <AuthLayout icon={Handshake} title="Become a Strategic Partner?" subtitle="Partnering with us unlocks corporate sponsorships, joint initiatives, and organization-level branding opportunities.">
        {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
        <div className="space-y-3">
          <Button onClick={() => setStep("partner_form")} className="w-full h-14 flex-col items-start bg-primary text-primary-foreground hover:bg-forest">
            <span className="flex items-center font-medium"><Users className="mr-2 h-4 w-4" /> Yes, Apply Now</span>
            <span className="text-xs opacity-80 font-normal">Complete a partner application questionnaire</span>
          </Button>
          <Button onClick={goToDashboard} variant="outline" className="w-full h-14 flex-col items-start">
            <span className="font-medium">No / Skip for Now</span>
            <span className="text-xs text-muted-foreground font-normal">Continue to your standard dashboard — apply later anytime</span>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  if (step === "partner_form") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4">
              <Handshake className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Partner Application</h1>
            <p className="text-muted-foreground mt-2">Complete the questionnaire below to apply as an Official Partner.</p>
          </div>
          {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
          <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
            <PartnerApplicationForm onSubmit={handlePartnerSubmit} loading={loading} defaults={userInfo} />
          </div>
        </div>
      </div>
    );
  }

  if (step === "partner_confirmation") {
    return (
      <AuthLayout icon={CheckCircle2} title="Application Received!" subtitle={`Thank you for applying to become a strategic partner, ${submittedApp?.organization_legal_name}.`}>
        <div className="space-y-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Your application is currently:</p>
            <Badge className="mt-2 border-amber-300 bg-amber-50 text-amber-800">Status: Pending Review</Badge>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground text-left rounded-lg border border-border bg-secondary/30 p-4">
            <p><strong className="text-foreground">Estimated Response Time:</strong> 2–3 business days</p>
            <p><strong className="text-foreground">Next Steps:</strong> Our partnership team will review your application and contact {submittedApp?.work_email} with the next steps or MOU details.</p>
          </div>
          <Button onClick={goToDashboard} className="w-full h-12 font-medium bg-primary text-primary-foreground hover:bg-forest">
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={UserPlus}
      title="Create your account"
      subtitle="Sign up to get started"
      footer={
        <>
          Already have an account?{" "}
          <Link to={"/login" + (safeReturnTo() !== "/" ? "?returnTo=" + encodeURIComponent(safeReturnTo()) : "")} className="text-primary font-medium hover:underline">Log in</Link>
        </>
      }
    >
      <Button variant="outline" className="w-full h-12 text-sm font-medium mb-6" onClick={handleGoogle}>
        <GoogleIcon className="w-5 h-5 mr-2" /> Continue with Google
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-3 text-muted-foreground">or</span></div>
      </div>

      {error && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input id="email" type="email" autoComplete="email" autoFocus placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-12" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input id="password" type="password" autoComplete="new-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <Input id="confirm" type="password" autoComplete="new-password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 h-12" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="referral">Agent / Referral Information <span className="text-destructive">*</span></Label>
          <Input id="referral" placeholder="Agent name, organization, agent code, or referral source" value={referral} onChange={(e) => setReferral(e.target.value)} className="h-12" required />
          <p className="text-xs text-muted-foreground">Please provide the name, organization, agent code, or referral source that introduced you to us.</p>
        </div>
        <Button type="submit" className="w-full h-12 font-medium" disabled={loading}>
          {loading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating account...</>) : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}