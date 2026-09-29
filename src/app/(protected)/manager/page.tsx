import Link from "next/link";
import {
  ArrowRight,
  BookCheck,
  ClipboardCheck,
  Target,
  UsersRound,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { SkillChart } from "@/components/manager/skill-chart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireRole } from "@/lib/auth/session";
import { getManagerAnalytics } from "@/services/analytics.service";

export default async function ManagerPage() {
  await requireRole(["MANAGER"]);
  const analytics = await getManagerAnalytics();
  const metrics = [
    {
      label: "Team members",
      value: analytics.staffCount,
      icon: UsersRound,
    },
    {
      label: "Active learners",
      value: analytics.activeLearners,
      icon: BookCheck,
    },
    {
      label: "Module completion",
      value: `${analytics.completionRate}%`,
      icon: Target,
    },
    {
      label: "Completed practices",
      value: analytics.completedSessions,
      icon: ClipboardCheck,
    },
  ];

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Manager dashboard"
        title="Team learning at a glance"
        description="Monitor learning completion, practice activity, and development patterns without treating training scores as formal performance evaluation."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-5">
              <metric.icon className="size-5 text-primary" aria-hidden="true" />
              <p className="mt-4 text-3xl font-bold">{metric.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {metric.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        <Card>
          <CardHeader>
            <CardTitle>Average skill profile</CardTitle>
            <CardDescription>
              Aggregated from {analytics.completedSessions} completed practice
              assessments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SkillChart data={analytics.skills} />
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Alert variant="warning">
            <Target aria-hidden="true" />
            <AlertTitle>Suggested Training Focus</AlertTitle>
            <AlertDescription>
              {analytics.completedSessions > 0
                ? `${analytics.trainingFocus.label} is currently the lowest team average at ${analytics.trainingFocus.value}/100.`
                : "Complete team practice sessions to identify an evidence-based training focus."}
            </AlertDescription>
          </Alert>
          <Card>
            <CardHeader>
              <CardTitle>Team average</CardTitle>
              <CardDescription>Across completed simulations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {analytics.averageScore}
                <span className="text-base font-medium text-muted-foreground">
                  /100
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/manager/team">
            View team progress
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/manager/skills">Explore skill insights</Link>
        </Button>
      </div>
    </main>
  );
}
