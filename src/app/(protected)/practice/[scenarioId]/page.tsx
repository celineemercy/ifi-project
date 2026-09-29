import { notFound } from "next/navigation";
import { Target, UserRound } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { SimulationChat } from "@/components/practice/simulation-chat";
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
import {
  getCurrentSimulation,
  getScenarioForPractice,
} from "@/services/simulation.service";
import { startPractice } from "./actions";

export default async function PracticeScenarioPage({
  params,
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  const sessionUser = await requireRole(["STAFF"]);
  const { scenarioId } = await params;
  const scenario = await getScenarioForPractice(scenarioId);

  if (!scenario) {
    notFound();
  }

  const session = await getCurrentSimulation(sessionUser.user.id, scenario.id);

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Visitor roleplay"
        title={scenario.title}
        description={scenario.description}
      />

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">
          {serviceAreaLabels[scenario.serviceArea]}
        </Badge>
        <Badge variant="outline">
          {difficultyLabels[scenario.difficulty]}
        </Badge>
        {scenario.skills.map((skill) => (
          <Badge key={skill} variant="outline">
            {skill}
          </Badge>
        ))}
      </div>

      {session ? (
        <SimulationChat
          sessionId={session.id}
          scenarioTitle={scenario.title}
          messages={session.messages.map((message) => ({
            id: message.id,
            role: message.role,
            content: message.content,
            sequence: message.sequence,
          }))}
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex size-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <UserRound className="size-5" aria-hidden="true" />
              </div>
              <CardTitle>Meet the visitor</CardTitle>
              <CardDescription>
                The simulator will respond only as this visitor. You remain the IFI
                employee throughout the conversation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                <span className="font-medium text-foreground">Personality: </span>
                <span className="text-muted-foreground">
                  {scenario.customerPersonality}
                </span>
              </p>
              <p>
                <span className="font-medium text-foreground">Opening: </span>
                <span className="text-muted-foreground">
                  {scenario.openingMessage}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex size-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                <Target className="size-5" aria-hidden="true" />
              </div>
              <CardTitle>Learning objective</CardTitle>
              <CardDescription>{scenario.learningObjective}</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={startPractice.bind(null, scenario.id)}>
                <Button className="w-full" type="submit">
                  Begin conversation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
