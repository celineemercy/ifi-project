import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleCheck,
  LockKeyhole,
  ShoppingBag,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/session";
import { formatIdr } from "@/lib/format-currency";
import { getMemberPackageState } from "@/services/member-packages.service";

export default async function MemberPackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; package?: string }>;
}) {
  const session = await requireRole(["MEMBER"]);
  const [state, query] = await Promise.all([
    getMemberPackageState(session.user.id),
    searchParams,
  ]);
  const selectedPackage = state.packages.find(
    (item) => item.slug === query.package,
  );
  const confirmed = query.status === "confirmed" && selectedPackage?.owned;

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Member packages"
        title="Choose your French-learning path"
        description="Explore sample learning bundles. Select a package to unlock its courses in this prototype."
      />

      {confirmed ? (
        <Alert variant="success" aria-live="polite">
          <CircleCheck />
          <AlertTitle>Demo purchase confirmed</AlertTitle>
          <AlertDescription>
            {selectedPackage.title} is now in your library. No payment was
            taken.
            <Link
              href="/member/courses"
              className="ml-1 font-semibold underline"
            >
              Explore your courses
            </Link>
          </AlertDescription>
        </Alert>
      ) : null}

      <Alert variant="warning">
        <ShoppingBag />
        <AlertTitle>Prototype checkout — no real payment</AlertTitle>
        <AlertDescription>
          All prices below are fictional examples in Indonesian rupiah. These
          are not official IFI packages or offers.
        </AlertDescription>
      </Alert>

      <section
        className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3"
        aria-label="Learning packages"
      >
        {state.packages.map((learningPackage) => (
          <Card
            key={learningPackage.id}
            className={
              learningPackage.sortOrder === 2 ? "border-brand-green/40" : ""
            }
          >
            <CardContent className="flex h-full flex-col p-6">
              <div className="flex min-h-7 items-center justify-between gap-2">
                {learningPackage.sortOrder === 2 ? (
                  <Badge variant="success">Popular path</Badge>
                ) : (
                  <span />
                )}
                {learningPackage.owned ? (
                  <Badge variant="secondary">In your library</Badge>
                ) : null}
              </div>
              <h2 className="mt-4 text-xl font-bold">
                {learningPackage.title}
              </h2>
              <p className="text-muted-foreground mt-2 min-h-18 text-sm leading-6">
                {learningPackage.description}
              </p>
              <p className="mt-5 text-3xl font-bold">
                {formatIdr(learningPackage.priceIdr)}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Sample one-time price · no charge in demo
              </p>
              <div className="border-border mt-6 border-t pt-5">
                <h3 className="text-sm font-semibold">
                  Included in this bundle
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {learningPackage.courseTitles.map((title) => (
                    <li key={title} className="flex items-start gap-2">
                      <Check className="text-brand-green mt-0.5 size-4 shrink-0" />
                      {title}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="text-muted-foreground mt-5 space-y-1.5 text-sm">
                {learningPackage.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                {learningPackage.owned ||
                learningPackage.newlyUnlockedCount === 0 ? (
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/member/courses">
                      {learningPackage.owned
                        ? "Open your courses"
                        : "Already unlocked"}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <Link
                      href={`/member/packages/${learningPackage.slug}/checkout`}
                    >
                      Choose package <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {state.packages.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <LockKeyhole className="text-muted-foreground size-6" />
            <h2 className="mt-3 font-bold">No packages available yet</h2>
            <p className="text-muted-foreground mt-2">
              Check back when a prototype bundle is published.
            </p>
          </CardContent>
        </Card>
      ) : null}

      <p className="text-muted-foreground text-sm">
        Real membership eligibility, payment processing, refunds, and access
        terms are not implemented in this prototype.
      </p>
    </main>
  );
}
