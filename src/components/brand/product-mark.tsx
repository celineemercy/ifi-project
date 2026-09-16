import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type ProductMarkProps = {
  compact?: boolean;
  inverse?: boolean;
  className?: string;
};

export function ProductMark({
  compact = false,
  inverse = false,
  className,
}: ProductMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-xl",
          inverse ? "text-brand-green bg-white" : "bg-brand-green text-white",
        )}
      >
        <Sparkles className="size-5" strokeWidth={2.2} />
      </span>
      {!compact && (
        <span className="min-w-0 leading-none">
          <span
            className={cn(
              "block text-[17px] font-bold tracking-[0.025em] whitespace-nowrap",
              inverse ? "text-white" : "text-foreground",
            )}
          >
            IFI <span className="text-brand-orange">SAVOIR-FAIRE</span>
          </span>
          <span
            className={cn(
              "mt-1 block text-[9px] font-semibold tracking-[0.18em] uppercase",
              inverse ? "text-white/65" : "text-muted-foreground",
            )}
          >
            Learning hub
          </span>
        </span>
      )}
    </div>
  );
}
