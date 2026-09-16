import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function ProgressPage() {
  await requireRole(["STAFF"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="My development"
        title="Progress over time"
        description="Track completed learning, practice sessions, skill development, and recommended next steps."
      />
      <PhasePlaceholder
        phase={4}
        title="Progress will be calculated from learning records"
        description="Phase 4 connects module progress; Phases 5 and 6 add simulation and assessment development data."
      />
    </main>
  );
}
