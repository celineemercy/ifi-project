import Link from "next/link";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { notFound } from "next/navigation";

import { confirmDemoPurchase } from "@/app/(protected)/member/packages/actions";
import { PageHeader } from "@/components/layout/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { requireRole } from "@/lib/auth/session";
import { formatIdr } from "@/lib/format-currency";
import { getMemberPackageState } from "@/services/member-packages.service";

export default async function DemoCheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await requireRole(["MEMBER"]);
  const { slug } = await params;
  const state = await getMemberPackageState(session.user.id);
  const learningPackage = state.packages.find((item) => item.slug === slug);
  if (!learningPackage) notFound();

  return (
    <main className="space-y-7 p-5 sm:p-8 lg:p-10">
      <Button asChild variant="ghost" className="-ml-3">
        <Link href="/member/packages">
          <ArrowLeft className="size-4" /> Back to packages
        </Link>
      </Button>
      <PageHeader
        eyebrow="Demo checkout"
        title={`Review ${learningPackage.title}`}
        description="Confirm the bundle you want to add to your prototype learning library."
      />
      <Alert variant="warning">
        <ShoppingBag />
        <AlertTitle>No real purchase</AlertTitle>
        <AlertDescription>
          This checkout only simulates a package purchase. No card details are
          requested and no money is charged.
        </AlertDescription>
      </Alert>
      <Card className="max-w-2xl">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-bold">{learningPackage.title}</h2>
            <p className="text-muted-foreground mt-2">
              {learningPackage.description}
            </p>
          </div>
          <div className="border-border border-y py-5">
            <p className="text-sm font-semibold">Courses in this package</p>
            <ul className="mt-3 space-y-2 text-sm">
              {learningPackage.courseTitles.map((title) => (
                <li key={title} className="flex items-center gap-2">
                  <Check className="text-brand-green size-4" /> {title}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="font-semibold">Sample total</span>
            <strong className="text-2xl">
              {formatIdr(learningPackage.priceIdr)}
            </strong>
          </div>
          {learningPackage.owned || learningPackage.newlyUnlockedCount === 0 ? (
            <Button asChild className="w-full">
              <Link href="/member/courses">
                These courses are already unlocked
              </Link>
            </Button>
          ) : (
            <form action={confirmDemoPurchase.bind(null, learningPackage.id)}>
              <Button type="submit" size="lg" className="w-full">
                Confirm demo purchase
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
