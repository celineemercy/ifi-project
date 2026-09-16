import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function SettingsPage() {
  await requireRole(["SUPER_ADMIN"]);

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Administration"
        title="Prototype settings"
        description="Configure application-level behavior without exposing secrets or operational credentials."
      />
      <PhasePlaceholder
        phase={10}
        title="Settings will be added only when needed"
        description="Environment-backed configuration remains the source of truth during early development."
      />
    </main>
  );
}
