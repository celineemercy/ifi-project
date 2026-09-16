import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function AnalyticsPage() {
  await requireRole(["SUPER_ADMIN", "MANAGER"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Analytics"
        title="Service performance"
        description="Explore service, branch, sentiment, and resolution performance from database-backed aggregations."
      />
      <PhasePlaceholder
        phase={7}
        title="Analytics are waiting for real data"
        description="No KPI or chart values are hardcoded. This view will activate after feedback and ticket records exist."
      />
    </main>
  );
}
