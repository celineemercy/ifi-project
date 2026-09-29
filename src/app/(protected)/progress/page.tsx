import Link from "next/link";
import { ArrowRight, Award, Target } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { requireRole } from "@/lib/auth/session";
import { getStaffLearningSummary } from "@/services/learning.service";

export default async function ProgressPage() {
  const session = await requireRole(["STAFF"]);
  const summary = await getStaffLearningSummary(session.user.id);
  const firstName = session.user.name?.split(" ")[0] ?? "Your";

  const skills = summary.skillAverages
    ? [
        { label: "Communication", value: summary.skillAverages.communication },
        { label: "Empathy", value: summary.skillAverages.empathy },
        {
          label: "Problem Solving",
          value: summary.skillAverages.problemSolving,
        },
        {
          label: "Professional Tone",
          value: summary.skillAverages.professionalTone,
        },
        { label: "Clarity", value: summary.skillAverages.clarity },
      ]
    : [];
  const strongestSkill = skills.reduce(
    (strongest, skill) =>
      !strongest || skill.value > strongest.value ? skill : strongest,
    skills[0],
  );
  const practiceSkill = skills.reduce(
    (weakest, skill) =>
      !weakest || skill.value < weakest.value ? skill : weakest,
    skills[0],
  );

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="My development"
        title={`${firstName}'s service development`}
        description="Track completed learning, practice sessions, skill development, and recommended next steps."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Overall progress", `${summary.overallProgress}%`],
          [
            "Learning modules",
            `${summary.completedModules} / ${summary.totalModules}`,
          ],
          ["Simulations", String(summary.completedSessions)],
          ["Average score", `${summary.averageScore}%`],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent className="p-6">
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-muted-foreground mt-2 font-semibold">
                {label}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <Card>
          <CardContent className="p-6 sm:p-7">
            <p className="text-brand-green text-sm font-semibold tracking-[0.13em] uppercase">
              Skill development
            </p>
            <h2 className="mt-1 text-2xl font-bold">
              Practice assessment averages
            </h2>
            {skills.length ? (
              <div className="mt-6 space-y-5">
                {skills.map((skill) => (
                  <div key={skill.label}>
                    <div className="mb-2 flex justify-between font-semibold">
                      <span>{skill.label}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <Progress
                      value={skill.value}
                      className="h-2.5"
                      indicatorClassName="bg-ifi-blue"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mt-5">
                Complete a simulation to begin building your skill profile.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="border-brand-green/20 bg-brand-green-light/45">
            <CardContent className="p-6">
              <Award className="text-brand-green size-7" />
              <p className="text-brand-green mt-4 text-sm font-semibold tracking-[0.13em] uppercase">
                Strongest skill
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                {strongestSkill?.label ?? "Keep practising"}
              </h2>
              {strongestSkill ? (
                <p className="text-muted-foreground mt-2">
                  Current average: {strongestSkill.value}%
                </p>
              ) : null}
            </CardContent>
          </Card>

          <Card className="border-brand-orange/25 bg-orange-50">
            <CardContent className="p-6">
              <Target className="text-brand-orange size-7" />
              <p className="mt-4 text-sm font-semibold tracking-[0.13em] text-orange-900 uppercase">
                Needs more practice
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                {practiceSkill?.label ?? "Complete a simulation"}
              </h2>
              <p className="text-muted-foreground mt-2 leading-6">
                Recommended next learning: {summary.recommendedModule?.title ??
                  "Complete another practice assessment"}.
              </p>
              {summary.recommendedModule ? (
                <Button asChild variant="outline" className="mt-5">
                  <Link href={`/learning/${summary.recommendedModule.slug}`}>
                    Open recommendation <ArrowRight className="size-4" />
                  </Link>
                </Button>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </section>

      <Card className="mt-6">
        <CardContent className="p-6 sm:p-7">
          <p className="text-brand-green text-sm font-semibold tracking-[0.13em] uppercase">
            Learning progress
          </p>
          <div className="mt-5 space-y-4">
            {summary.moduleProgress.map((item) => (
              <div key={item.id}>
                <div className="mb-2 flex flex-wrap justify-between gap-2 font-semibold">
                  <span>{item.module.shortTitle}</span>
                  <span>{item.progress}%</span>
                </div>
                <Progress value={item.progress} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="text-muted-foreground mt-6 text-sm">
        Simulated training feedback is intended for learning and development,
        not formal employee performance evaluation.
      </p>
    </main>
  );
}
