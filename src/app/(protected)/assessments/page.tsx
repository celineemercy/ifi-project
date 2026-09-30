import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { serviceAreaLabels } from "@/config/scenarios";
import { requireRole } from "@/lib/auth/session";
import { getAssessmentHistory } from "@/services/simulation.service";

const dateFormatter = new Intl.DateTimeFormat("en-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export default async function AssessmentsPage() {
  const session = await requireRole(["STAFF"]);
  const assessments = await getAssessmentHistory(session.user.id);

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Assessment history"
        title="Review your practice feedback"
        description="Revisit completed simulations, strengths, and suggested areas for development."
      />

      {assessments.length > 0 ? (
        <section className="grid gap-4">
          {assessments.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary text-secondary-foreground flex size-10 shrink-0 items-center justify-center rounded-md">
                    <ClipboardCheck className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold">{item.scenario.title}</h2>
                      <Badge variant="secondary">
                        {serviceAreaLabels[item.scenario.serviceArea]}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {item.completedAt
                        ? dateFormatter.format(item.completedAt)
                        : "Completed"}
                    </p>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {item.assessment?.strength}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      {item.assessment?.overallScore}
                    </p>
                    <p className="text-muted-foreground text-xs">out of 100</p>
                  </div>
                  <Button asChild size="icon" variant="outline">
                    <Link
                      href={`/assessment/${item.id}`}
                      aria-label={`View assessment for ${item.scenario.title}`}
                    >
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No completed assessments yet</CardTitle>
            <CardDescription>
              Complete a practice conversation to generate your first
              development report.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/practice">Choose a scenario</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
