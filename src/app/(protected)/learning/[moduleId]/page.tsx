import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Lightbulb } from "lucide-react";
import { notFound } from "next/navigation";

import { ModuleQuiz } from "@/components/learning/module-quiz";
import { PageHeader } from "@/components/layout/page-header";
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
          <span className="text-brand-green inline-flex items-center gap-2 font-semibold">
            <CheckCircle2 className="size-4" /> Completed
          </span>
        ) : (
          <span className="rounded-full bg-orange-100 px-3 py-1 font-semibold text-orange-900">
            {learningModule.userProgress?.progress ?? 0}% complete
          </span>
        )}
      </div>

      <Card className="border-brand-green/20 bg-brand-green-light/40 mt-8">
        <CardContent className="p-6 sm:p-7">
          <p className="text-brand-green text-sm font-semibold tracking-[0.13em] uppercase">
            Learning objective
          </p>
          <p className="mt-2 text-lg leading-7">
            {learningModule.learningObjective}
          </p>
        </CardContent>
      </Card>

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
                <span className="text-muted-foreground text-sm">
                  {lesson.durationMinutes} min
                </span>
              </div>
              <p className="mt-3 font-semibold">{lesson.summary}</p>
              <p className="text-muted-foreground mt-3 leading-7">
                {lesson.content}
              </p>
              {lesson.example ? (
                <div className="border-brand-orange/25 mt-5 rounded-xl border bg-orange-50 p-4">
                  <p className="inline-flex items-center gap-2 font-semibold text-orange-950">
                    <Lightbulb className="size-4" /> Service example
                  </p>
                  <p className="mt-2 leading-7 text-orange-950/80">
                    {lesson.example}
                  </p>
                </div>
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
