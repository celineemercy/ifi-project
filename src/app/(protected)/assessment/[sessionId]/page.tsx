import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Info,
  MessageSquareText,
  TrendingUp,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requireRole } from "@/lib/auth/session";
import { getSimulationForUser } from "@/services/simulation.service";

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const authSession = await requireRole(["STAFF"]);
  const { sessionId } = await params;
  const simulation = await getSimulationForUser(authSession.user.id, sessionId);

  if (!simulation?.assessment || simulation.status !== "COMPLETED") {
    notFound();
  }

  const assessment = simulation.assessment;
  const skills = [
    { label: "Communication", value: assessment.communication },
    { label: "Empathy", value: assessment.empathy },
    { label: "Problem solving", value: assessment.problemSolving },
    { label: "Professional tone", value: assessment.professionalTone },
    { label: "Clarity", value: assessment.clarity },
  ];

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Simulation complete"
        title="Your learning assessment"
        description={`Developmental feedback for ${simulation.scenario.title}.`}
      />

      <Alert>
        <Info aria-hidden="true" />
        <AlertTitle>For learning and development</AlertTitle>
        <AlertDescription>
          This feedback supports personal practice. It is not a formal
          performance evaluation or an HR decision-making tool.
        </AlertDescription>
      </Alert>

      <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
        <Card>
          <CardHeader>
            <CardDescription>Overall practice score</CardDescription>
            <CardTitle className="text-5xl">
              {assessment.overallScore}
              <span className="text-muted-foreground text-lg font-medium">
                /100
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="success">
              <BadgeCheck className="size-4" aria-hidden="true" />
              Assessment complete
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill overview</CardTitle>
            <CardDescription>
              Scores reflect the language used in this practice conversation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {skills.map((skill) => (
              <div key={skill.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{skill.label}</span>
                  <span className="font-semibold">{skill.value}</span>
                </div>
                <Progress value={skill.value} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <TrendingUp className="text-primary size-5" aria-hidden="true" />
            <CardTitle>What worked well</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-6">
            {assessment.strength}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <MessageSquareText
              className="text-brand-orange size-5"
              aria-hidden="true"
            />
            <CardTitle>Try next time</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-6">
            {assessment.improvement}
          </CardContent>
        </Card>
      </div>

      {assessment.recommendedModule ? (
        <Card>
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-secondary text-secondary-foreground flex size-10 shrink-0 items-center justify-center rounded-md">
                <BookOpen className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-primary text-sm font-medium">
                  Recommended next
                </p>
                <h2 className="mt-1 text-lg font-semibold">
                  {assessment.recommendedModule.title}
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  {assessment.recommendedModule.description}
                </p>
              </div>
            </div>
            <Button asChild className="shrink-0">
              <Link href={`/learning/${assessment.recommendedModule.slug}`}>
                Open module
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Conversation transcript</CardTitle>
          <CardDescription>
            Review the exchange that informed this assessment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {simulation.messages.map((message) => (
            <div key={message.id} className="border-border border-l-2 pl-4">
              <p className="text-muted-foreground text-xs font-semibold uppercase">
                {message.role === "EMPLOYEE" ? "You" : "Visitor"}
              </p>
              <p className="mt-1 text-sm leading-6">{message.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
