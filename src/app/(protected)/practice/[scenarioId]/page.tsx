import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function PracticeScenarioPage({
  params,
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  await requireRole(["STAFF"]);
  const { scenarioId } = await params;
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Visitor roleplay"
        title="Visitor conversation"
        description={`Requested scenario: ${scenarioId}. The roleplay engine arrives in Phase 5.`}
      />
      <PhasePlaceholder
        phase={5}
        title="Professional chat simulation is not active yet"
        description="The deterministic simulator will play only the visitor during the conversation. Assessment begins only when the simulation ends."
      />
    </main>
  );
}
