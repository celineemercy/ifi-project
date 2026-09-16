import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function UsersPage() {
  await requireRole(["SUPER_ADMIN"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Administration"
        title="Users and access"
        description="Manage prototype staff accounts, departments, and roles."
      />
      <PhasePlaceholder
        phase={2}
        title="Database-backed users follow the schema"
        description="Phase 2 replaces the temporary local demo accounts with seeded users and department relationships."
      />
    </main>
  );
}
