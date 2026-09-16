import { PageHeader } from "@/components/layout/page-header";
import { PhasePlaceholder } from "@/components/layout/phase-placeholder";
import { verifySession } from "@/lib/auth/session";

export default async function CoachPage() {
  await verifySession();
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="AI coach"
        title="Practice difficult service moments"
        description="Interactive training scenarios will help staff strengthen empathy, clarity, and problem solving."
      />
      <PhasePlaceholder
        phase={9}
        title="Training follows the complete service workflow"
        description="The three approved coaching scenarios will be built only after the core feedback-to-resolution journey works."
      />
    </main>
  );
}
