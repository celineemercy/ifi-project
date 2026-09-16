import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function AssessmentsPage() {
  await requireRole(["STAFF"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Assessment history"
        title="Review your practice feedback"
        description="Revisit completed simulations, strengths, and suggested areas for development."
      />
      <PhasePlaceholder
        phase={6}
        title="Assessment history follows completed simulations"
        description="This view will use stored simulation and assessment records rather than hardcoded scores."
      />
    </main>
  );
}
