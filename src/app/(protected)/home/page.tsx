import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardCheck,
  MessagesSquare,
  TrendingUp,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/session";

const journey = [
  {
    label: "Learn",
    detail: "Build practical service habits through focused microlearning.",
    icon: BookOpenCheck,
    color: "bg-brand-green",
  },
  {
    label: "Practice",
    detail: "Respond to realistic IFI visitor situations in a safe space.",
    icon: MessagesSquare,
    color: "bg-ifi-blue",
  },
  {
    label: "Assess",
    detail: "Receive structured learning feedback after each simulation.",
    icon: ClipboardCheck,
    color: "bg-brand-orange",
  },
  {
    label: "Improve",
    detail: "Follow recommendations and see your development over time.",
    icon: TrendingUp,
    color: "bg-brand-red",
  },
] as const;

export default async function StaffHomePage() {
  const session = await requireRole(["STAFF"]);
  const firstName = session.user.name?.split(" ")[0] || "Team Member";

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Your learning journey"
        title={`Bonjour, ${firstName}.`}
        description="Great service builds stronger connections. This foundation is ready for database-backed learning progress in Phase 4."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {journey.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={step.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span
                    className={`grid size-11 place-items-center rounded-xl text-white ${step.color}`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="text-muted-foreground text-sm font-semibold">
                    0{index + 1}
                  </span>
                </div>
                <h2 className="mt-7 text-xl font-bold">{step.label}</h2>
                <p className="text-muted-foreground mt-2 leading-6">
                  {step.detail}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Card className="mt-6 overflow-hidden">
        <CardContent className="grid gap-8 p-7 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-brand-green text-sm font-semibold tracking-[0.14em] uppercase">
              Next in the build
            </p>
            <h2 className="mt-2 text-2xl font-bold">Communication & Empathy</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl leading-7">
              The primary learning module will connect active-listening lessons,
              a short case, a three-question quiz, and progress updates.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/learning">
              View learning foundation <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
