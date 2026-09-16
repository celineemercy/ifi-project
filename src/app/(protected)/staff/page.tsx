import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { verifySession } from "@/lib/auth/session";

export default async function StaffPage() {
  await verifySession();
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Staff workspace"
        title="Service tickets"
        description="Review, assign, progress, and resolve actionable visitor feedback."
      />
      <PhasePlaceholder
        phase={6}
        title="Ticket operations are next in the workflow"
        description="The role-aware workspace is ready. Ticket data and actions will be connected after feedback analysis and automation are complete."
      />
    </main>
  );
}
