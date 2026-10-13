import { cn } from "@/lib/utils";

function GoldStar({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 2L27.44 15.68L39.56 8.44L32.31 20.56L46 24L32.31 27.44L39.56 39.56L27.44 32.31L24 46L20.56 32.31L8.44 39.56L15.69 27.44L2 24L15.69 20.56L8.44 8.44L20.56 15.69Z" />
    </svg>
  );
}

export function StrategicPartnerBadge({ className }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gradient-to-r from-gold/15 via-accent/20 to-gold/15 px-3 py-1 shadow-sm",
      className
    )}>
      <GoldStar className="h-3.5 w-3.5 text-gold-dark" />
      <span className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark">Strategic Partner</span>
    </span>
  );
}

export function StrategicPartnerSeal({ className }) {
  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/50 bg-gradient-to-br from-gold/20 via-accent/15 to-gold/25 shadow-md">
        <GoldStar className="h-9 w-9 text-gold-dark" />
        <div className="absolute -inset-1 rounded-full border border-gold/20" />
      </div>
      <span className="mt-2.5 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-gold-dark">Strategic Partner</span>
    </div>
  );
}