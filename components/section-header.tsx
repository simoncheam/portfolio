import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4", align === "center" ? "text-center" : "text-left")}>
      {eyebrow && (
        <p className="text-sm font-mono font-bold text-primary uppercase tracking-[0.2em]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-black tracking-tight [text-wrap:balance]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-muted-foreground [text-wrap:pretty]",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
