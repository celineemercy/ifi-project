import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function ManagerPage() {
  await requireRole(["MANAGER"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Manager dashboard"
        title="Team learning at a glance"
        description="Monitor learning completion, practice activity, and skill development without turning training scores into formal performance evaluation."
      />
      <PhasePlaceholder
        phase={7}
        title="Team metrics will use seeded database records"
        description="No KPI values are hardcoded. Phase 7 adds team progress, skill averages, and a clearly labeled Suggested Training Focus."
      />
    </main>
  );
}
