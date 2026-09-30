import { BookOpen, CheckCircle2, Clock3, UsersRound } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requireRole } from "@/lib/auth/session";
import { getAdminLearningModules } from "@/services/admin.service";

export default async function AdminLearningPage() {
  await requireRole(["SUPER_ADMIN"]);
  const modules = await getAdminLearningModules();

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Administration"
        title="Learning content"
        description="Review the workshop-aligned modules, lessons, and participation stored in the prototype."
      />

      <section className="grid gap-5 lg:grid-cols-2">
        {modules.map((module) => {
          const completed = module.progress.filter(
            (progress) => progress.completed,
          ).length;
          const completionRate = module.progress.length
            ? Math.round((completed / module.progress.length) * 100)
            : 0;

          return (
            <Card key={module.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="bg-secondary text-secondary-foreground flex size-10 items-center justify-center rounded-md">
                    <BookOpen className="size-5" aria-hidden="true" />
                  </div>
                  <Badge
                    variant={
                      module.status === "PUBLISHED" ? "success" : "outline"
                    }
                  >
                    {module.status === "PUBLISHED" ? "Published" : "Draft"}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="size-4" aria-hidden="true" />
                    {module.durationMinutes} min
                  </span>
                  <span>{module._count.lessons} lessons</span>
                  <span className="inline-flex items-center gap-2">
                    <UsersRound className="size-4" aria-hidden="true" />
                    {module._count.progress} learners
                  </span>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-2 font-medium">
                      <CheckCircle2 className="size-4" aria-hidden="true" />
                      Completion
                    </span>
                    <span className="font-semibold">{completionRate}%</span>
                  </div>
                  <Progress value={completionRate} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
