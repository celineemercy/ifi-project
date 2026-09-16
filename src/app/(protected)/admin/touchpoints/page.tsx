import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function TouchpointsPage() {
  await requireRole(["SUPER_ADMIN"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Administration"
        title="QR touchpoints"
        description="Manage feedback entry points across IFI services and branches."
      />
      <PhasePlaceholder
        phase={3}
        title="Touchpoint records and QR codes are planned"
        description="The route structure is ready; database-backed touchpoints and downloadable QR codes arrive with the feedback workflow."
      />
    </main>
  );
}
