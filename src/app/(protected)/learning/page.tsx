import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock3 } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requireRole } from "@/lib/auth/session";
import { getLearningModulesForUser } from "@/services/learning.service";

export default async function LearningPage() {
  const session = await requireRole(["STAFF"]);
  const modules = await getLearningModulesForUser(session.user.id);

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="My learning"
        title="Build service savoir-faire"
        description="Five focused modules extend the workshop into continuous, practical learning. Content is original prototype material informed by IFI's public service context."
      />

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {modules.map((module) => {
          const progress = module.userProgress?.progress ?? 0;
          const completed = module.userProgress?.completed ?? false;

          return (
            <Card key={module.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="bg-brand-green-light text-brand-green grid size-11 shrink-0 place-items-center rounded-xl">
                      <BookOpen className="size-5" />
                    </span>
                    <Badge variant="secondary">
                      MODULE {String(module.order).padStart(2, "0")}
                    </Badge>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold">{module.title}</h2>
                  <p className="text-muted-foreground mt-2 leading-7">
                    {module.description}
                  </p>
                  <div className="text-muted-foreground mt-5 flex flex-wrap gap-4 text-sm">
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="size-4" /> {module.durationMinutes} min
                    </span>
                    <span>{module.lessons.length} lessons + quiz</span>
                    {completed ? (
                      <Badge variant="success">
                        <CheckCircle2 className="size-4" /> Completed
                      </Badge>
                    ) : null}
                  </div>
                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-sm font-semibold">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                </div>
                <div className="border-border flex items-center justify-between border-t px-6 py-4 sm:px-7">
                  <span className="text-muted-foreground text-sm">
                    {progress > 0 && !completed
                      ? "Continue where you left off"
                      : completed
                        ? "Review any time"
                        : "Ready to begin"}
                  </span>
                  <Button asChild variant="ghost">
                    <Link href={`/learning/${module.slug}`}>
                      {completed
                        ? "Review"
                        : progress > 0
                          ? "Continue"
                          : "Start"}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
