import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Lightbulb } from "lucide-react";
import { notFound } from "next/navigation";

import { ModuleQuiz } from "@/components/learning/module-quiz";
import { PageHeader } from "@/components/layout/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/session";
import { getLearningModuleForUser } from "@/services/learning.service";

export default async function LearningModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const session = await requireRole(["STAFF"]);
  const { moduleId } = await params;
  const learningModule = await getLearningModuleForUser(
    moduleId,
    session.user.id,
  );

  if (!learningModule) notFound();

  const completed = learningModule.userProgress?.completed ?? false;

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <Button asChild variant="ghost" className="mb-5 -ml-3">
        <Link href="/learning">
          <ArrowLeft className="size-4" /> Back to My Learning
        </Link>
      </Button>

      <PageHeader
        eyebrow={`Module ${String(learningModule.order).padStart(2, "0")}`}
        title={learningModule.title}
        description={learningModule.description}
      />

      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
        <span className="text-muted-foreground inline-flex items-center gap-2">
          <Clock3 className="size-4" /> {learningModule.durationMinutes} minutes
        </span>
        <span className="text-muted-foreground">
          {learningModule.lessons.length} short lessons
        </span>
        {completed ? (
          <Badge variant="success">
            <CheckCircle2 className="size-4" /> Completed
          </Badge>
        ) : (
          <Badge variant="warning">
            {learningModule.userProgress?.progress ?? 0}% complete
          </Badge>
        )}
      </div>

      <Alert variant="success" className="mt-8 p-6 sm:p-7">
        <Lightbulb />
        <AlertTitle className="tracking-[0.13em] uppercase">
          Learning objective
        </AlertTitle>
        <AlertDescription className="text-foreground text-lg">
          {learningModule.learningObjective}
        </AlertDescription>
      </Alert>

      <section className="mt-8 space-y-5" aria-labelledby="lessons-heading">
        <div>
          <p className="text-brand-green text-sm font-semibold tracking-[0.13em] uppercase">
            Learn
          </p>
          <h2 id="lessons-heading" className="mt-1 text-2xl font-bold">
            Short lessons
          </h2>
        </div>

        {learningModule.lessons.map((lesson) => (
          <Card key={lesson.id}>
            <CardContent className="p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-muted-foreground text-sm font-semibold">
                    LESSON {lesson.order}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{lesson.title}</h3>
                </div>
                <Badge variant="outline">{lesson.durationMinutes} min</Badge>
              </div>
              <p className="mt-3 font-semibold">{lesson.summary}</p>
              <p className="text-muted-foreground mt-3 leading-7">
                {lesson.content}
              </p>
              {lesson.example ? (
                <Alert variant="warning" className="mt-5">
                  <Lightbulb />
                  <AlertTitle>Service example</AlertTitle>
                  <AlertDescription>{lesson.example}</AlertDescription>
                </Alert>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="mt-8">
        <CardContent className="p-6 sm:p-8">
          <p className="text-brand-green text-sm font-semibold tracking-[0.13em] uppercase">
            Check your understanding
          </p>
          <h2 className="mt-1 text-2xl font-bold">Three-question quiz</h2>
          <p className="text-muted-foreground mt-2 leading-7">
            Answer all questions correctly to complete this module. You can
            review and retry as often as you need.
          </p>
          <ModuleQuiz
            moduleId={learningModule.slug}
            questions={learningModule.quizQuestions}
            alreadyCompleted={completed}
          />
        </CardContent>
      </Card>

      <p className="text-muted-foreground mt-6 text-sm leading-6">
        Prototype learning content informed by IFI&apos;s public service
        context; not official IFI policy or training material.
      </p>
    </main>
  );
}
