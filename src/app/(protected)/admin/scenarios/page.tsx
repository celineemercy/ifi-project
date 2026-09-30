import Link from "next/link";
import { Edit3, Eye, EyeOff, MessagesSquare } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { ScenarioForm } from "@/components/admin/scenario-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { difficultyLabels, serviceAreaLabels } from "@/config/scenarios";
import { requireRole } from "@/lib/auth/session";
import { getAdminScenarios } from "@/services/admin.service";
import { toggleScenarioActive } from "./actions";

export default async function AdminScenariosPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; status?: string }>;
}) {
  await requireRole(["SUPER_ADMIN"]);
  const { edit, status = "all" } = await searchParams;
  const scenarios = await getAdminScenarios();
  const editingScenario = scenarios.find((scenario) => scenario.slug === edit);
  const filteredScenarios = scenarios.filter((scenario) => {
    if (status === "active") return scenario.active;
    if (status === "inactive") return !scenario.active;
    return true;
  });

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Administration"
        title="Practice scenarios"
        description="Create, edit, activate, and deactivate realistic IFI service-training scenarios."
      />

      <div className="grid items-start gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader>
            <CardTitle>
              {editingScenario ? "Edit scenario" : "Create scenario"}
            </CardTitle>
            <CardDescription>
              {editingScenario
                ? `Update ${editingScenario.title}.`
                : "Add another visitor situation to the practice library."}
            </CardDescription>
            {editingScenario ? (
              <div>
                <Button asChild size="sm" variant="outline">
                  <Link href="/admin/scenarios">Cancel editing</Link>
                </Button>
              </div>
            ) : null}
          </CardHeader>
          <CardContent>
            <ScenarioForm scenario={editingScenario} />
          </CardContent>
        </Card>

        <section className="space-y-4">
          <nav className="flex flex-wrap gap-2" aria-label="Filter scenarios">
            {[
              { value: "all", label: "All" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ].map((filter) => (
              <Button
                key={filter.value}
                asChild
                size="sm"
                variant={status === filter.value ? "default" : "outline"}
              >
                <Link href={`/admin/scenarios?status=${filter.value}`}>
                  {filter.label}
                </Link>
              </Button>
            ))}
          </nav>

          {filteredScenarios.map((scenario) => (
            <Card key={scenario.id}>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={scenario.active ? "success" : "outline"}>
                        {scenario.active ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="secondary">
                        {serviceAreaLabels[scenario.serviceArea]}
                      </Badge>
                      <Badge variant="outline">
                        {difficultyLabels[scenario.difficulty]}
                      </Badge>
                    </div>
                    <CardTitle className="mt-3 text-lg">
                      {scenario.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {scenario.description}
                    </CardDescription>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button asChild size="icon" variant="outline">
                      <Link
                        href={`/admin/scenarios?edit=${scenario.slug}`}
                        aria-label={`Edit ${scenario.title}`}
                      >
                        <Edit3 className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <form
                      action={toggleScenarioActive.bind(
                        null,
                        scenario.id,
                        !scenario.active,
                      )}
                    >
                      <Button
                        type="submit"
                        size="icon"
                        variant="outline"
                        aria-label={`${scenario.active ? "Deactivate" : "Activate"} ${scenario.title}`}
                      >
                        {scenario.active ? (
                          <EyeOff className="size-4" aria-hidden="true" />
                        ) : (
                          <Eye className="size-4" aria-hidden="true" />
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-2">
                  <MessagesSquare className="size-4" aria-hidden="true" />
                  {scenario._count.simulationSessions} practice sessions
                </span>
                <span>{scenario.skills.join(" · ")}</span>
              </CardContent>
            </Card>
          ))}

          {filteredScenarios.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No matching scenarios</CardTitle>
                <CardDescription>
                  Change the status filter to see the full scenario library.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : null}
        </section>
      </div>
    </main>
  );
}
