import { CheckCircle2, Clock3 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function PhasePlaceholder({
  phase,
  title,
  description,
}: {
  phase: number;
  title: string;
  description: string;
}) {
  return (
    <Card className="mt-8 max-w-3xl">
      <CardContent className="p-7">
        <div className="flex items-start gap-4">
          <span className="bg-brand-amber/15 grid size-11 shrink-0 place-items-center rounded-xl text-[#925500]">
            <Clock3 className="size-5" />
          </span>
          <div>
            <p className="text-brand-green text-sm font-semibold">
              Planned for Phase {phase}
            </p>
            <h2 className="mt-1 text-xl font-bold">{title}</h2>
            <p className="text-muted-foreground mt-2 leading-6">
              {description}
            </p>
            <p className="text-muted-foreground mt-5 flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="text-brand-green size-4" />
              Navigation and access control are ready.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
