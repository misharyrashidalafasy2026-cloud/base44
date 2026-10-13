import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotARobot({ checked, onChange, className }) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-secondary/40 p-3.5 transition-colors hover:bg-secondary/60",
        checked && "border-primary/40 bg-primary/5",
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-border accent-primary"
      />
      <ShieldCheck className="h-5 w-5 text-primary" />
      <div className="flex-1">
        <span className="block text-sm font-medium">I'm not a robot</span>
        <span className="block text-xs text-muted-foreground">Verify to submit — protects against spam and automated abuse.</span>
      </div>
    </label>
  );
}