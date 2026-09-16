import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function SkillInsightsPage() {
  await requireRole(["MANAGER"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Skill insights"
        title="Team development patterns"
        description="Compare aggregated communication, empathy, problem solving, professional tone, and clarity scores."
      />
      <PhasePlaceholder
        phase={7}
        title="Skill insights require completed assessments"
        description="Recommendations will be labeled Suggested Training Focus and grounded in database aggregation."
      />
    </main>
  );
}
