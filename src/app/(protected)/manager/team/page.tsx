import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function TeamProgressPage() {
  await requireRole(["MANAGER"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Team progress"
        title="Learning participation"
        description="Understand how the team is progressing through modules and practice sessions."
      />
      <PhasePlaceholder
        phase={7}
        title="Team progress is intentionally deferred"
        description="This route will aggregate the 12 seeded employee learning records."
      />
    </main>
  );
}
