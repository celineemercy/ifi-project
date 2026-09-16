import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { requireRole } from "@/lib/auth/session";

export default async function AdminLearningPage() {
  await requireRole(["SUPER_ADMIN"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Administration"
        title="Learning content"
        description="Review the five workshop-aligned modules and their lessons."
      />
      <PhasePlaceholder
        phase={4}
        title="Learning-content tools follow the module experience"
        description="The prototype will keep content management deliberately simple."
      />
    </main>
  );
}
