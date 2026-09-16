import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function LearningPage() {
  await requireRole(["STAFF"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="My learning"
        title="Build service savoir-faire"
        description="Five focused modules extend the workshop into continuous, practical learning."
      />
      <PhasePlaceholder
        phase={4}
        title="Learning modules are ready for content"
        description="The route and staff access boundary are active. Phase 4 connects the five modules, lessons, quiz, and completion progress."
      />
    </main>
  );
}
