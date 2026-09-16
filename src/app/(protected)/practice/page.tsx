import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function PracticePage() {
  await requireRole(["STAFF"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="AI practice"
        title="Practice real IFI service situations"
        description="Choose a service area and rehearse realistic visitor conversations in a safe learning environment."
      />
      <PhasePlaceholder
        phase={5}
        title="Scenario selection and roleplay are planned"
        description="Five IFI scenarios and deterministic mock conversations will be added after the database and learning hub are complete."
      />
    </main>
  );
}
