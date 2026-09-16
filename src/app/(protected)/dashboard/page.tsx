import { Activity, Bot, Database, ShieldCheck } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/session";

const readiness = [
  {
    label: "Application shell",
    detail: "Responsive and role-aware",
    icon: Activity,
  },
  {
    label: "Authentication",
    detail: "Demo credentials active",
    icon: ShieldCheck,
  },
  { label: "PostgreSQL", detail: "Docker service configured", icon: Database },
  { label: "AI mode", detail: "Mock-first environment ready", icon: Bot },
] as const;

export default async function DashboardPage() {
  await requireRole(["SUPER_ADMIN", "MANAGER"]);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Management command center"
        title="Bonjour, IFI team"
        description="The application foundation is ready. Live service metrics will appear here after the Phase 2 data model and seed dataset are connected."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {readiness.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardContent className="p-5">
                <span className="bg-brand-green-light text-brand-green grid size-10 place-items-center rounded-xl">
                  <Icon className="size-5" />
                </span>
                <p className="mt-5 font-semibold">{item.label}</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {item.detail}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardContent className="p-7">
            <p className="text-brand-green text-sm font-semibold tracking-[0.12em] uppercase">
              Core journey
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              Capture → Understand → Resolve → Improve
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl leading-7">
              Phase 2 establishes the relational data foundation. Later phases
              connect visitor submissions, structured analysis, ticket handling,
              and database-backed management reporting.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-4">
              {["Capture", "Understand", "Resolve", "Improve"].map(
                (step, index) => (
                  <div key={step} className="bg-muted rounded-xl p-4">
                    <p className="text-muted-foreground text-xs font-semibold">
                      0{index + 1}
                    </p>
                    <p className="mt-2 font-semibold">{step}</p>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-7">
            <p className="text-brand-green text-sm font-semibold tracking-[0.12em] uppercase">
              Service scope
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Courses",
                "Culture",
                "Médiathèque",
                "Campus France",
                "Administration",
              ].map((service) => (
                <li
                  key={service}
                  className="border-border flex items-center gap-3 rounded-xl border px-4 py-3 font-semibold"
                >
                  <span className="bg-brand-orange size-2 rounded-full" />
                  {service}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
