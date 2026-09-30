import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  MessagesSquare,
  Percent,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requireRole } from "@/lib/auth/session";
import {
  getLearningModulesForUser,
  getStaffLearningSummary,
} from "@/services/learning.service";

export default async function StaffHomePage() {
  const session = await requireRole(["STAFF"]);
  const firstName = session.user.name?.split(" ")[0] || "Team Member";
  const [summary, modules] = await Promise.all([
    getStaffLearningSummary(session.user.id),
    getLearningModulesForUser(session.user.id),
  ]);
  const nextModule =
    modules.find((module) => !module.userProgress?.completed) ?? modules[0];

  const metrics = [
    {
      label: "Overall progress",
      value: `${summary.overallProgress}%`,
      icon: Percent,
      color: "bg-brand-green",
    },
    {
      label: "Completed modules",
      value: `${summary.completedModules} / ${summary.totalModules}`,
      icon: BookOpenCheck,
      color: "bg-ifi-blue",
    },
    {
      label: "Practice sessions",
      value: String(summary.completedSessions),
      icon: MessagesSquare,
      color: "bg-brand-orange",
    },
    {
      label: "Average skill score",
      value: `${summary.averageScore}%`,
      icon: ClipboardCheck,
      color: "bg-brand-red",
    },
  ] as const;

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Your learning journey"
        title={`Bonjour, ${firstName}.`}
        description="Great service builds stronger connections. Continue learning, practise realistic situations, and turn feedback into your next improvement."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`grid size-11 place-items-center rounded-xl text-white ${metric.color}`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="text-3xl font-bold">{metric.value}</span>
                </div>
                <h2 className="text-muted-foreground mt-5 font-semibold">
                  {metric.label}
                </h2>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {nextModule ? (
        <Card className="mt-6 overflow-hidden">
          <CardContent className="grid gap-6 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-brand-green text-sm font-semibold tracking-[0.14em] uppercase">
                Continue learning
              </p>
              <h2 className="mt-2 text-2xl font-bold">{nextModule.title}</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl leading-7">
                {nextModule.description}
              </p>
              <div className="mt-4 max-w-md">
                <div className="mb-2 flex justify-between text-sm font-semibold">
                  <span>Module progress</span>
                  <span>{nextModule.userProgress?.progress ?? 0}%</span>
                </div>
                <Progress value={nextModule.userProgress?.progress ?? 0} />
              </div>
            </div>
            <Button asChild size="lg">
              <Link href={`/learning/${nextModule.slug}`}>
                Continue module <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}
    </main>
  );
}
