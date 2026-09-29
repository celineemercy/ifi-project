import { CheckCircle2, Clock3 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
    <Alert variant="warning" className="mt-8 max-w-3xl p-6">
      <Clock3 />
      <AlertTitle>
        <span className="text-brand-green block text-sm">
          Planned for Phase {phase}
        </span>
        <span className="text-foreground mt-1 block text-xl">{title}</span>
      </AlertTitle>
      <AlertDescription className="text-muted-foreground">
        <p>{description}</p>
        <p className="mt-5 flex items-center gap-2 font-semibold">
          <CheckCircle2 className="text-brand-green size-4" />
          Navigation and access control are ready.
        </p>
      </AlertDescription>
    </Alert>
  );
}
