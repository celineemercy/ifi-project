import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function InsightsPage() {
  await requireRole(["SUPER_ADMIN", "MANAGER"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="AI service insights"
        title="Suggested improvements"
        description="Evidence-backed patterns and cautious recommendations derived from IFI Pulse data."
      />
      <PhasePlaceholder
        phase={8}
        title="Insight generation is intentionally deferred"
        description="Suggestions will be based on database aggregation and clearly labeled as suggested improvements."
      />
    </main>
  );
}
