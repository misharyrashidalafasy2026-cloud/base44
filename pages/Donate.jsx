import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, Heart, ArrowRight, ArrowLeft, ShieldAlert, Info, Download, ExternalLink } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image } from "@/components/ui/image";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { SITE, WALLETS, GIVING_PURPOSES, FUNDS, SUGGESTED_AMOUNTS, generateDonationId } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import PartnerPrompt from "@/components/PartnerPrompt";

const COUNTRIES = ["Kuwait", "Saudi Arabia", "United Arab Emirates", "Qatar", "Bahrain", "Oman", "Egypt", "Jordan", "Turkey", "Nigeria", "United States", "United Kingdom", "Malaysia", "Indonesia", "Pakistan", "Other"];

const STEPS = ["Purpose", "Amount", "Fund", "Your Details", "Cryptocurrency", "Payment", "Complete"];

export default function Donate() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    giving_purpose: "",
    amount: 0,
    customAmount: "",
    fund: "",
    donor_name: user?.full_name || "",
    donor_email: user?.email || "",
    donor_country: "",
    organization: "",
    anonymous: false,
    dedication: "",
    agent_info: "",
    cryptocurrency: "",
    transaction_hash: "",
  });
  const [donationId, setDonationId] = useState(null);
  const [receiptNo, setReceiptNo] = useState(null);
  const [creating, setCreating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const effectiveAmount = data.amount === "custom" ? parseFloat(data.customAmount) || 0 : data.amount;

  const canProceed = () => {
    if (step === 0) return !!data.giving_purpose;
    if (step === 1) return effectiveAmount >= SITE.minimumContribution;
    if (step === 2) return !!data.fund;
    if (step === 3) return !!data.donor_name && !!data.donor_email && !!data.donor_country;
    if (step === 4) return !!data.cryptocurrency;
    return true;
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const createDonation = async () => {
    setCreating(true);
    const did = generateDonationId();
    const rno = `RCP-${Date.now().toString().slice(-8)}`;
    try {
      const rec = await base44.entities.Donation.create({
        donation_id: did,
        donor_name: data.donor_name,
        donor_email: data.donor_email,
        donor_country: data.donor_country,
        organization: data.organization || "",
        giving_purpose: data.giving_purpose,
        amount: effectiveAmount,
        fund: data.fund,
        cryptocurrency: data.cryptocurrency,
        transaction_hash: "",
        status: "awaiting_payment",
        anonymous: data.anonymous,
        dedication: data.dedication || "",
        agent_info: data.agent_info || "",
        receipt_number: rno,
      });
      setDonationId(did);
      setReceiptNo(rno);
      next();
    } catch (err) {
      toast({ title: "Could not create your donation record. Please try again.", variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const submitHash = async () => {
    if (!data.transaction_hash.trim()) {
      toast({ title: "Please enter your transaction hash.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const records = await base44.entities.Donation.filter({ donation_id: donationId });
      if (records[0]) {
        await base44.entities.Donation.update(records[0].id, {
          transaction_hash: data.transaction_hash,
          status: "submitted",
        });
      }
      toast({ title: "Transaction submitted for verification.", description: "We'll confirm your contribution on the blockchain." });
      next();
    } catch (err) {
      toast({ title: "Could not submit transaction. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedWallet = WALLETS.find((w) => w.asset === data.cryptocurrency);

  const copyAddress = () => {
    navigator.clipboard?.writeText(selectedWallet.address);
    toast({ title: "Wallet address copied to clipboard." });
  };

  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Give With Purpose."
        subtitle="Cryptocurrency donations only. Minimum contribution $2,000 USD. Registration helps us securely associate your contribution, verify payment, and issue receipts."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Stepper */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors", i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground")}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={cn("hidden text-xs font-medium sm:block", i === step ? "text-foreground" : "text-muted-foreground")}>{s}</span>
                {i < STEPS.length - 1 && <div className="hidden h-px w-6 bg-border sm:block" />}
              </div>
            ))}
          </div>

          {step === 0 && (
            <PartnerPrompt partnerStatus={user?.partner_status} />
          )}

          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            {/* Step 0: Purpose */}
            {step === 0 && (
              <div>
                <h2 className="font-heading text-2xl font-semibold">Choose Your Giving Purpose</h2>
                <p className="mt-2 text-sm text-muted-foreground">Select the type of charitable contribution you'd like to make.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {GIVING_PURPOSES.map((p) => (
                    <button key={p} onClick={() => set("giving_purpose", p)} className={cn("rounded-xl border p-4 text-left transition-all", data.giving_purpose === p ? "border-accent bg-accent/10 ring-1 ring-accent" : "border-border hover:border-accent/50")}>
                      <span className="font-medium">{p}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Amount */}
            {step === 1 && (
              <div>
                <h2 className="font-heading text-2xl font-semibold">Select Amount</h2>
                <p className="mt-2 text-sm text-muted-foreground">Minimum contribution: ${SITE.minimumContribution.toLocaleString()} USD</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {SUGGESTED_AMOUNTS.map((a) => (
                    <button key={a} onClick={() => set("amount", a)} className={cn("rounded-xl border p-4 text-center transition-all", data.amount === a ? "border-accent bg-accent/10 ring-1 ring-accent" : "border-border hover:border-accent/50")}>
                      <span className="font-heading text-xl font-semibold">${a.toLocaleString()}</span>
                    </button>
                  ))}
                  <button onClick={() => set("amount", "custom")} className={cn("rounded-xl border p-4 text-center transition-all", data.amount === "custom" ? "border-accent bg-accent/10 ring-1 ring-accent" : "border-border hover:border-accent/50")}>
                    <span className="font-medium">Custom</span>
                  </button>
                </div>
                {data.amount === "custom" && (
                  <div className="mt-4">
                    <Label htmlFor="custom-amt">Custom Amount (USD)</Label>
                    <Input id="custom-amt" type="number" min={SITE.minimumContribution} value={data.customAmount} onChange={(e) => set("customAmount", e.target.value)} className="mt-1.5" />
                    {data.customAmount && parseFloat(data.customAmount) < SITE.minimumContribution && (
                      <p className="mt-2 text-sm text-destructive">Minimum contribution is ${SITE.minimumContribution.toLocaleString()}.</p>
                    )}
                  </div>
                )}
                {effectiveAmount >= SITE.minimumContribution && (
                  <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-4 text-center">
                    <span className="text-sm text-muted-foreground">You are contributing </span>
                    <span className="font-heading text-2xl font-semibold text-primary">${effectiveAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Fund */}
            {step === 2 && (
              <div>
                <h2 className="font-heading text-2xl font-semibold">Where Your Giving Goes</h2>
                <p className="mt-2 text-sm text-muted-foreground">Choose the fund or area you'd like to support.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {FUNDS.map((f) => (
                    <button key={f} onClick={() => set("fund", f)} className={cn("rounded-xl border p-4 text-left transition-all", data.fund === f ? "border-accent bg-accent/10 ring-1 ring-accent" : "border-border hover:border-accent/50")}>
                      <span className="font-medium">{f}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Donor info */}
            {step === 3 && (
              <div>
                <h2 className="font-heading text-2xl font-semibold">Your Details</h2>
                <p className="mt-2 text-sm text-muted-foreground">We use this to associate your contribution, verify payment, and issue your receipt.</p>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="d-name">Full Name *</Label>
                    <Input id="d-name" value={data.donor_name} onChange={(e) => set("donor_name", e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="d-email">Email *</Label>
                    <Input id="d-email" type="email" value={data.donor_email} onChange={(e) => set("donor_email", e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Country *</Label>
                    <select value={data.donor_country} onChange={(e) => set("donor_country", e.target.value)} className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select country</option>
                      {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="d-org">Organization (optional)</Label>
                    <Input id="d-org" value={data.organization} onChange={(e) => set("organization", e.target.value)} className="mt-1.5" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="d-dedication">Donation Dedication (optional)</Label>
                    <Input id="d-dedication" value={data.dedication} onChange={(e) => set("dedication", e.target.value)} placeholder="e.g. On behalf of my family" className="mt-1.5" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="d-agent">Agent / Referral Information (optional)</Label>
                    <Input id="d-agent" value={data.agent_info} onChange={(e) => set("agent_info", e.target.value)} className="mt-1.5" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={data.anonymous} onChange={(e) => set("anonymous", e.target.checked)} className="h-4 w-4 rounded border-border" />
                      Give anonymously (your name won't appear in public records)
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Crypto */}
            {step === 4 && (
              <div>
                <h2 className="font-heading text-2xl font-semibold">Select Cryptocurrency</h2>
                <p className="mt-2 text-sm text-muted-foreground">Choose your asset. Each wallet address works only on its specified network — always verify before sending.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {WALLETS.map((w) => (
                    <button key={w.asset} onClick={() => set("cryptocurrency", w.asset)} className={cn("flex items-center gap-4 rounded-xl border p-4 text-left transition-all", data.cryptocurrency === w.asset ? "border-accent bg-accent/10 ring-1 ring-accent" : "border-border hover:border-accent/50")}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg text-white" style={{ backgroundColor: w.color }}>
                        <span className="text-xs font-bold">{w.symbol}</span>
                      </div>
                      <div>
                        <div className="font-medium">{w.asset}</div>
                        <div className="text-xs text-muted-foreground">{w.network}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Payment */}
            {step === 5 && selectedWallet && (
              <div>
                <h2 className="font-heading text-2xl font-semibold">Complete Your Payment</h2>
                <p className="mt-2 text-sm text-muted-foreground">Send exactly <strong>${effectiveAmount.toLocaleString()} USD</strong> worth of {selectedWallet.asset} to the address below, then submit your transaction hash.</p>

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-300/50 bg-red-50/70 p-4 text-sm text-red-900/80">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <p><strong>Important Security Notice.</strong> Baitul-Ehsan Relief Fund will never ask you to send funds to a personal wallet or pay an agent directly. Verify the asset, network, and address before sending. Never share your seed phrase, private key, or password.</p>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col items-center rounded-xl border border-border bg-secondary/30 p-6">
                    <div className="overflow-hidden rounded-lg border border-border bg-white p-2">
                      <Image src={selectedWallet.qrUrl} alt={`${selectedWallet.asset} wallet QR code`} fittingType="fill" className="h-44 w-44" />
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">Scan to send {selectedWallet.symbol}</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Asset & Network</div>
                      <div className="mt-1 font-medium">{selectedWallet.asset} · {selectedWallet.network}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Wallet Address</div>
                      <div className="mt-1 flex items-start gap-2">
                        <code className="flex-1 break-all rounded-md border border-border bg-secondary/40 p-2 text-xs">{selectedWallet.address}</code>
                        <Button size="icon" variant="outline" onClick={copyAddress} className="shrink-0"><Copy className="h-4 w-4" /></Button>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount</div>
                      <div className="mt-1 font-heading text-2xl font-semibold text-primary">${effectiveAmount.toLocaleString()} USD</div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-amber-300/40 bg-amber-50/60 p-3 text-xs text-amber-900/80">
                      <Info className="h-4 w-4 shrink-0 text-amber-600" />
                      Wallet addresses are pending production verification. Please confirm with our team before sending large amounts.
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Label htmlFor="tx-hash">Transaction Hash</Label>
                  <Textarea id="tx-hash" value={data.transaction_hash} onChange={(e) => set("transaction_hash", e.target.value)} rows={3} placeholder="Paste your blockchain transaction hash here" className="mt-1.5" />
                  <p className="mt-2 text-xs text-muted-foreground">After sending, paste your transaction hash. Blockchain confirmation is not instant — verification may take time.</p>
                </div>
              </div>
            )}

            {/* Step 6: Confirmation */}
            {step === 6 && (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Heart className="h-8 w-8" />
                </div>
                <h2 className="mt-6 font-heading text-3xl font-semibold">JazakAllahu Khayran.</h2>
                <p className="mt-2 text-muted-foreground">May your generosity bring benefit to those who need it.</p>
                <div className="mx-auto mt-8 max-w-md rounded-xl border border-border bg-secondary/30 p-6 text-left">
                  <Row label="Donation ID" value={donationId || "—"} />
                  <Row label="Amount" value={`$${effectiveAmount.toLocaleString()} USD`} />
                  <Row label="Purpose" value={data.giving_purpose} />
                  <Row label="Fund" value={data.fund} />
                  <Row label="Cryptocurrency" value={data.cryptocurrency} />
                  <Row label="Status" value="Payment Submitted" />
                  <Row label="Receipt No." value={receiptNo || "—"} />
                </div>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button asChild variant="outline"><Link to="/my-giving">View My Giving</Link></Button>
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-forest">
                    <Link to="/impact">View My Impact</Link>
                  </Button>
                </div>
                <p className="mt-6 text-xs text-muted-foreground">Your contribution is now awaiting blockchain confirmation and verification. You can track its status in My Giving.</p>
              </div>
            )}

            {/* Nav buttons */}
            {step < 6 && (
              <div className="mt-8 flex items-center justify-between">
                <Button variant="ghost" onClick={back} disabled={step === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {step < 4 ? (
                  <Button onClick={next} disabled={!canProceed()} className="bg-primary text-primary-foreground hover:bg-forest">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : step === 4 ? (
                  <Button onClick={createDonation} disabled={!canProceed() || creating} className="bg-primary text-primary-foreground hover:bg-forest">
                    {creating ? "Preparing..." : "Proceed to Payment"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : step === 5 ? (
                  <Button onClick={submitHash} disabled={submitting} className="bg-primary text-primary-foreground hover:bg-forest">
                    {submitting ? "Submitting..." : "Submit Transaction"}
                  </Button>
                ) : null}
              </div>
            )}
          </div>

          {/* Why register note */}
          {step === 0 && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <strong className="text-foreground">Why do I need to register before donating?</strong> Registration helps us securely associate your contribution with your donation record, provide payment verification and confirmation, issue receipts, protect against fraudulent transactions, maintain accurate records, and give you access to your giving history and available impact updates.
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}