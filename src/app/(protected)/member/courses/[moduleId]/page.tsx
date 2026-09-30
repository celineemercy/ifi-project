import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Lightbulb } from "lucide-react";
import { notFound } from "next/navigation";
import { ModuleAudience } from "@/generated/prisma/client";

import { ModuleQuiz } from "@/components/learning/module-quiz";
import { PageHeader } from "@/components/layout/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/session";
import { getLearningModuleForUser } from "@/services/learning.service";

export default async function MemberCoursePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const session = await requireRole(["MEMBER"]);
  const { moduleId } = await params;
  const course = await getLearningModuleForUser(
    moduleId,
    session.user.id,
    ModuleAudience.MEMBER,
  );
  if (!course) notFound();

  const completed = course.userProgress?.completed ?? false;

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <Button asChild variant="ghost" className="-ml-3">
        <Link href="/member/courses">
          <ArrowLeft className="size-4" /> All courses
        </Link>
      </Button>

      <div>
        <PageHeader
          eyebrow={`Course ${String(course.order).padStart(2, "0")}`}
          title={course.title}
          description={course.description}
        />
        <div className="text-muted-foreground mt-5 flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-2">
            <Clock3 className="size-4" /> {course.durationMinutes} minutes
          </span>
          <span>{course.lessons.length} short lessons</span>
          {completed ? (
            <Badge variant="success">
              <CheckCircle2 className="size-4" /> Completed
            </Badge>
          ) : null}
        </div>
      </div>

      <Alert variant="success" className="p-6">
        <Lightbulb />
        <AlertTitle>What you&apos;ll learn</AlertTitle>
        <AlertDescription className="text-foreground text-base leading-7">
          {course.learningObjective}
        </AlertDescription>
      </Alert>

      <section className="space-y-4" aria-labelledby="course-lessons-heading">
        <div>
          <p className="text-brand-green text-sm font-semibold tracking-wider uppercase">
            Learn
          </p>
          <h2 id="course-lessons-heading" className="mt-1 text-2xl font-bold">
            Your lessons
          </h2>
        </div>
        {course.lessons.map((lesson) => (
          <Card key={lesson.id}>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-muted-foreground text-sm font-semibold">
                    LESSON {lesson.order}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{lesson.title}</h3>
                </div>
                <Badge variant="outline">{lesson.durationMinutes} min</Badge>
              </div>
              <p className="mt-4 font-semibold">{lesson.summary}</p>
              <p className="text-muted-foreground mt-3 leading-7">
                {lesson.content}
              </p>
              {lesson.example ? (
                <Alert variant="warning" className="mt-5">
                  <Lightbulb />
                  <AlertTitle>Try it</AlertTitle>
                  <AlertDescription>{lesson.example}</AlertDescription>
                </Alert>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardContent className="p-6">
          <p className="text-brand-green text-sm font-semibold tracking-wider uppercase">
            Check your understanding
          </p>
          <h2 className="mt-1 text-2xl font-bold">Quick quiz</h2>
          <p className="text-muted-foreground mt-2 leading-7">
            Answer all three questions correctly to complete this course. You
            can retry as often as you need.
          </p>
          <ModuleQuiz
            moduleId={course.slug}
            questions={course.quizQuestions}
            alreadyCompleted={completed}
          />
        </CardContent>
      </Card>

      <p className="text-muted-foreground text-sm">
        Prototype self-study content; not an official IFI course or certificate.
      </p>
    </main>
  );
}
