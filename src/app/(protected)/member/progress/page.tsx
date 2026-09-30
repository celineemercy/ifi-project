import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requireRole } from "@/lib/auth/session";
import { getMemberLearningSummary } from "@/services/learning.service";

export default async function MemberProgressPage() {
  const session = await requireRole(["MEMBER"]);
  const summary = await getMemberLearningSummary(session.user.id);

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="My progress"
        title="Your French learning journey"
        description="See what you have completed and pick up where you left off. Every short lesson counts."
      />

      <section
        className="grid gap-4 sm:grid-cols-2"
        aria-label="Progress summary"
      >
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm font-medium">
              Overall progress
            </p>
            <p className="mt-2 text-4xl font-bold">
              {summary.overallProgress}%
            </p>
            <Progress className="mt-5" value={summary.overallProgress} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm font-medium">
              Courses completed
            </p>
            <p className="mt-2 text-4xl font-bold">
              {summary.completedModules} / {summary.totalModules}
            </p>
            <p className="text-muted-foreground mt-4 text-sm">
              Complete each course&apos;s quiz to mark it finished.
            </p>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="course-progress-heading">
        <h2 id="course-progress-heading" className="mb-4 text-2xl font-bold">
          Course progress
        </h2>
        {summary.modules.length ? (
          <div className="space-y-4">
            {summary.modules.map((course) => {
              const progress = course.userProgress?.progress ?? 0;
              return (
                <Card key={course.id}>
                  <CardContent className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{course.title}</h3>
                        {course.userProgress?.completed ? (
                          <Badge variant="success">
                            <CheckCircle2 className="size-4" /> Completed
                          </Badge>
                        ) : null}
                      </div>
                      <div className="mt-3 flex max-w-lg items-center gap-3">
                        <Progress value={progress} />
                        <span className="text-sm font-medium">{progress}%</span>
                      </div>
                    </div>
                    <Button asChild variant="outline">
                      <Link href={`/member/courses/${course.slug}`}>
                        {course.userProgress?.completed ? "Review" : "Continue"}
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                No member courses are published yet.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
