import { Target } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { SkillChart } from "@/components/manager/skill-chart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requireRole } from "@/lib/auth/session";
import { getManagerAnalytics } from "@/services/analytics.service";

export default async function SkillInsightsPage() {
  await requireRole(["MANAGER"]);
  const analytics = await getManagerAnalytics();

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Skill insights"
        title="Team development patterns"
        description="Compare aggregated communication, empathy, problem solving, professional tone, and clarity scores."
      />

      <Alert variant="warning">
        <Target aria-hidden="true" />
        <AlertTitle>Suggested Training Focus</AlertTitle>
        <AlertDescription>
          {analytics.completedSessions > 0
            ? `Prioritize ${analytics.trainingFocus.label.toLowerCase()} practice. It is the current lowest team average at ${analytics.trainingFocus.value}/100.`
            : "There are no completed assessments yet. This recommendation will update as the team practices."}
        </AlertDescription>
      </Alert>

      <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>Skill comparison</CardTitle>
            <CardDescription>
              Team averages from completed simulation assessments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SkillChart data={analytics.skills} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score detail</CardTitle>
            <CardDescription>Average score out of 100</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {analytics.skills.map((skill) => (
              <div key={skill.key}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">{skill.label}</span>
                  <span className="font-semibold">{skill.value}</span>
                </div>
                <Progress value={skill.value} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
