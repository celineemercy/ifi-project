import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Compass,
  GraduationCap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requireRole } from "@/lib/auth/session";
import { getMemberLearningSummary } from "@/services/learning.service";

export default async function MemberDashboardPage() {
  const session = await requireRole(["MEMBER"]);
  const firstName = session.user.name?.split(" ")[0] || "Learner";
  const summary = await getMemberLearningSummary(session.user.id);

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <section className="relative overflow-hidden rounded-2xl bg-[#053b23] p-6 text-white sm:p-9">
        <div className="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full border border-white/10 bg-white/5" />
        <div className="relative max-w-2xl">
          <p className="text-brand-yellow text-sm font-semibold tracking-[0.15em] uppercase">
            IFI member learning
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Bonjour, {firstName}.
          </h1>
          <p className="mt-3 max-w-xl leading-7 text-white/75">
            Make time for French, one short lesson at a time. Explore a course,
            check your understanding, and watch your progress grow.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-white text-[#053b23] hover:bg-white/90"
          >
            <Link href="/member/courses">
              Explore courses <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section
        className="grid gap-4 sm:grid-cols-3"
        aria-label="Learning overview"
      >
        {[
          {
            label: "Overall progress",
            value: `${summary.overallProgress}%`,
            icon: Compass,
          },
          {
            label: "Courses completed",
            value: `${summary.completedModules} / ${summary.totalModules}`,
            icon: BookOpenCheck,
          },
          {
            label: "Courses unlocked",
            value: `${summary.unlockedModules} / ${summary.totalModules}`,
            icon: GraduationCap,
          },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <Icon className="text-brand-green size-6" aria-hidden="true" />
              <p className="mt-4 text-3xl font-bold">{value}</p>
              <h2 className="text-muted-foreground mt-1 text-sm font-medium">
                {label}
              </h2>
            </CardContent>
          </Card>
        ))}
      </section>

      {summary.nextModule ? (
        <section aria-labelledby="next-course-heading">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 id="next-course-heading" className="text-2xl font-bold">
              Your next lesson
            </h2>
            <Badge variant="secondary">Learn at your pace</Badge>
          </div>
          <Card className="border-brand-green/20">
            <CardContent className="grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center">
              <div className="min-w-0">
                <p className="text-brand-green text-sm font-semibold tracking-wider uppercase">
                  Course {String(summary.nextModule.order).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-bold">
                  {summary.nextModule.title}
                </h3>
                <p className="text-muted-foreground mt-2 max-w-2xl leading-6">
                  {summary.nextModule.description}
                </p>
                <div className="mt-5 max-w-md">
                  <div className="mb-2 flex justify-between text-sm font-medium">
                    <span>Progress</span>
                    <span>
                      {summary.nextModule.userProgress?.progress ?? 0}%
                    </span>
                  </div>
                  <Progress
                    value={summary.nextModule.userProgress?.progress ?? 0}
                  />
                </div>
              </div>
              <Button asChild>
                <Link href={`/member/courses/${summary.nextModule.slug}`}>
                  {summary.nextModule.userProgress?.progress
                    ? "Continue"
                    : "Start learning"}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      ) : summary.unlockedModules < summary.totalModules ? (
        <Card className="border-brand-orange/25 bg-orange-50">
          <CardContent className="grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="text-xl font-bold">Ready for the next course?</h2>
              <p className="text-muted-foreground mt-2">
                Browse the prototype French-learning packages to unlock more
                lessons.
              </p>
            </div>
            <Button asChild>
              <Link href="/member/packages">
                View packages <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold">You are all caught up</h2>
            <p className="text-muted-foreground mt-2">
              Review a course any time or check your learning progress.
            </p>
          </CardContent>
        </Card>
      )}

      <p className="text-muted-foreground text-sm">
        Prototype self-study content inspired by IFI&apos;s public learning
        themes; not an official IFI online course.
      </p>
    </main>
  );
}
