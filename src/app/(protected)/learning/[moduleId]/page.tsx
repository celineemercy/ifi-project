import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function LearningModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  await requireRole(["STAFF"]);
  const { moduleId } = await params;
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Learning module"
        title="Module lesson view"
        description={`Requested module: ${moduleId}. Database content will replace this route preview in Phase 4.`}
      />
      <PhasePlaceholder
        phase={4}
        title="Lesson content and quiz are intentionally deferred"
        description="Communication & Empathy will be the first fully functional module."
      />
    </main>
  );
}
