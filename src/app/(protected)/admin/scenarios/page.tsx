import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function AdminScenariosPage() {
  await requireRole(["SUPER_ADMIN"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Administration"
        title="Practice scenarios"
        description="Create, edit, activate, and deactivate realistic IFI service-training scenarios."
      />
      <PhasePlaceholder
        phase={8}
        title="Scenario CRUD is planned"
        description="Phase 2 seeds the initial five scenarios; Phase 8 adds the focused administration interface."
      />
    </main>
  );
}
