import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Handshake, X, ArrowRight } from "lucide-react";

const DISMISS_KEY = "berf_partner_prompt_dismissed";

export default function PartnerPrompt({ partnerStatus }) {
  const [visible, setVisible] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);

  useEffect(() => {
    if (partnerStatus === "approved" || partnerStatus === "pending_review") return;
    if (localStorage.getItem(DISMISS_KEY) === "true") return;
    setVisible(true);
  }, [partnerStatus]);

  const dismiss = (permanent = false) => {
    if (permanent) localStorage.setItem(DISMISS_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/5 via-accent/8 to-gold/5 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
          <Handshake className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-base font-semibold text-foreground">Become a Strategic Partner?</h3>
            <button onClick={() => dismiss(false)} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Partnering unlocks corporate sponsorships, joint initiatives, and organization-level branding. You can apply now or anytime later — it won't interrupt your donation.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button asChild size="sm" className="bg-gold-dark text-white hover:bg-gold-dark/90">
              <Link to="/partner-application" onClick={() => dismiss(false)}>
                Yes, Apply Now <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button size="sm" variant="ghost" onClick={() => dismiss(dontAskAgain)}>
              Not now
            </Button>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <Checkbox checked={dontAskAgain} onCheckedChange={setDontAskAgain} className="h-3.5 w-3.5" />
              Don't ask me again
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}