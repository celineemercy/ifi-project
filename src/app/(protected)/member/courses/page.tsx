import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock3 } from "lucide-react";
import { ModuleAudience } from "@/generated/prisma/client";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requireRole } from "@/lib/auth/session";
import { getLearningModulesForUser } from "@/services/learning.service";

export default async function MemberCoursesPage() {
  const session = await requireRole(["MEMBER"]);
  const courses = await getLearningModulesForUser(
    session.user.id,
    ModuleAudience.MEMBER,
  );

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Course catalogue"
        title="Explore French learning"
        description="Short, self-paced prototype courses help you build confidence with language and culture. Choose a course and learn at your own speed."
      />
      {courses.length ? (
        <section
          className="grid gap-5 lg:grid-cols-2"
          aria-label="Available courses"
        >
          {courses.map((course) => {
            const progress = course.userProgress?.progress ?? 0;
            const completed = course.userProgress?.completed ?? false;
            return (
              <Card key={course.id} className="flex h-full flex-col">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="bg-brand-green-light text-brand-green grid size-12 place-items-center rounded-xl">
                      <BookOpen className="size-6" aria-hidden="true" />
                    </span>
                    {completed ? (
                      <Badge variant="success">
                        <CheckCircle2 className="size-4" /> Completed
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        Course {String(course.order).padStart(2, "0")}
                      </Badge>
                    )}
                  </div>
                  <h2 className="mt-5 text-2xl font-bold">{course.title}</h2>
                  <p className="text-muted-foreground mt-2 flex-1 leading-7">
                    {course.description}
                  </p>
                  <div className="text-muted-foreground mt-5 flex flex-wrap gap-4 text-sm">
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="size-4" /> {course.durationMinutes} min
                    </span>
                    <span>{course.lessons.length} lessons + quiz</span>
                  </div>
                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-sm font-medium">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                  <Button asChild className="mt-6 w-full">
                    <Link href={`/member/courses/${course.slug}`}>
                      {completed
                        ? "Review course"
                        : progress
                          ? "Continue course"
                          : "Start course"}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </section>
      ) : (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold">Courses are coming soon</h2>
            <p className="text-muted-foreground mt-2">
              Please check back when member learning content is published.
            </p>
          </CardContent>
        </Card>
      )}
      <p className="text-muted-foreground text-sm">
        These are prototype lessons, not official IFI classes or certification
        preparation.
      </p>
    </main>
  );
}
