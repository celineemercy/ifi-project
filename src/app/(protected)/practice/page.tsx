import Link from "next/link";
import { ArrowRight, BrainCircuit, Clock3 } from "lucide-react";
import type { ServiceArea } from "@/generated/prisma/client";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { difficultyLabels, serviceAreaLabels } from "@/config/scenarios";
import { requireRole } from "@/lib/auth/session";
import { getActiveScenarios } from "@/services/simulation.service";

const serviceAreas = [
  "ALL",
  "CULTURE",
  "COURSES",
  "CAMPUS_FRANCE",
  "MEDIATHEQUE",
] as const;

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}) {
  await requireRole(["STAFF"]);
  const { area = "ALL" } = await searchParams;
  const scenarios = await getActiveScenarios();
  const filteredScenarios = scenarios.filter(
    (scenario) => area === "ALL" || scenario.serviceArea === area,
  );

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Practice simulator"
        title="Practice real IFI service situations"
        description="Choose a visitor situation, respond in your own words, and receive developmental feedback when you end the conversation."
      />

      <nav className="flex flex-wrap gap-2" aria-label="Filter scenarios">
        {serviceAreas.map((serviceArea) => (
          <Button
            key={serviceArea}
            asChild
            size="sm"
            variant={area === serviceArea ? "default" : "outline"}
          >
            <Link
              href={
                serviceArea === "ALL"
                  ? "/practice"
                  : `/practice?area=${serviceArea}`
              }
            >
              {serviceArea === "ALL"
                ? "All areas"
                : serviceAreaLabels[serviceArea as ServiceArea]}
            </Link>
          </Button>
        ))}
      </nav>

      {filteredScenarios.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredScenarios.map((scenario) => (
            <Card key={scenario.id} className="flex h-full flex-col">
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {serviceAreaLabels[scenario.serviceArea]}
                  </Badge>
                  <Badge variant="outline">
                    {difficultyLabels[scenario.difficulty]}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{scenario.title}</CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BrainCircuit className="size-4" aria-hidden="true" />
                  <span>{scenario.skills.join(" · ")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock3 className="size-4" aria-hidden="true" />
                  <span>About 5 minutes</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/practice/${scenario.slug}`}>
                    Start scenario
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No scenarios in this area</CardTitle>
            <CardDescription>
              Choose another service area to continue practicing.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </main>
  );
}
