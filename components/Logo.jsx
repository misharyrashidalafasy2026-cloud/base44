import { cn } from "@/lib/utils";
import { SITE } from "@/lib/siteConfig";

export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M24 2L27.44 15.68L39.56 8.44L32.31 20.56L46 24L32.31 27.44L39.56 39.56L27.44 32.31L24 46L20.56 32.31L8.44 39.56L15.69 27.44L2 24L15.69 20.56L8.44 8.44L20.56 15.69Z"
        fill="currentColor"
        className="text-primary"
      />
      <circle cx="24" cy="24" r="6.5" fill="currentColor" className="text-accent" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" className="text-background" />
    </svg>
  );
}

export default function Logo({ variant = "full", className, withArabic = true }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9 shrink-0" />
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-lg font-semibold tracking-wide text-foreground sm:text-xl">
            BAITUL-EHSAN
          </span>
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em] text-accent sm:text-[0.65rem]">
            Relief Fund
          </span>
          {withArabic && (
            <span className="font-arabic text-xs text-muted-foreground sm:text-sm" dir="rtl">
              {SITE.nameArabic}
            </span>
          )}
        </span>
      )}
    </span>
  );
}