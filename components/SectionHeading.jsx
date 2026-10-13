import { cn } from "@/lib/utils";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false, className }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2
        className={cn(
          "font-heading text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]",
          light ? "text-ivory" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-ivory/80" : "text-muted-foreground")}>
          {subtitle}
        </p>
      )}
      <div className={cn("mt-6 h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent", align !== "center" && "from-accent via-accent to-transparent")} />
    </div>
  );
}