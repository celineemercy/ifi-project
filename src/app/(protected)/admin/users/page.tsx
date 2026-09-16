import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function UsersPage() {
  await requireRole(["SUPER_ADMIN"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Administration"
        title="Demo users"
        description="Manage prototype staff, manager, and administrator accounts."
      />
      <PhasePlaceholder
        phase={3}
        title="Database-backed accounts follow the seed data"
        description="Phase 3 replaces temporary local identities with the 12 seeded employee records and role protection."
      />
    </main>
  );
}
