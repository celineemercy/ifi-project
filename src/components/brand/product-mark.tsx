import { Activity } from "lucide-react";

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
          "grid size-10 place-items-center rounded-xl",
          inverse ? "text-brand-green bg-white" : "bg-brand-green text-white",
        )}
      >
        <Activity className="size-5" strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="leading-none">
          <span
            className={cn(
              "block text-xl font-bold tracking-[0.04em]",
              inverse ? "text-white" : "text-foreground",
            )}
          >
            IFI <span className="text-brand-orange">PULSE</span>
          </span>
          <span
            className={cn(
              "mt-1 block text-[10px] font-semibold tracking-[0.15em] uppercase",
              inverse ? "text-white/65" : "text-muted-foreground",
            )}
          >
            Service intelligence
          </span>
        </span>
      )}
    </div>
  );
}
