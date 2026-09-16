import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  await requireRole(["STAFF"]);
  const { sessionId } = await params;
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Simulation complete"
        title="Learning assessment"
        description={`Session ${sessionId} will display skill feedback and a recommended next module.`}
      />
      <PhasePlaceholder
        phase={6}
        title="Validated assessment results are planned"
        description="Scores will include a prominent learning-and-development disclaimer and will not be presented as formal performance evaluation."
      />
    </main>
  );
}
