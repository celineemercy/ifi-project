import Link from "next/link";
import { ArrowLeft, MapPin, MessageSquareText } from "lucide-react";

import { ProductMark } from "@/components/brand/product-mark";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function FeedbackFoundation({ touchpoint }: { touchpoint?: string }) {
  return (
    <main className="bg-background min-h-screen">
      <header className="border-border border-b bg-white">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link href="/">
            <ProductMark />
          </Link>
          <span className="text-muted-foreground hidden text-sm font-semibold sm:block">
            Public feedback portal
          </span>
        </div>
      </header>
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-brand-green text-sm font-semibold tracking-[0.14em] uppercase">
          Your experience matters
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Help IFI improve its services.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-8">
          The public feedback experience is prepared for mobile-first
          implementation in Phase 3.
        </p>

        <Card className="mt-8">
          <CardContent className="p-7 sm:p-8">
            <div className="flex gap-4">
              <span className="bg-brand-green-light text-brand-green grid size-11 shrink-0 place-items-center rounded-xl">
                {touchpoint ? (
                  <MapPin className="size-5" />
                ) : (
                  <MessageSquareText className="size-5" />
                )}
              </span>
              <div>
                <p className="text-brand-green text-sm font-semibold">
                  Phase 3 preview
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  Feedback submission is not enabled yet
                </h2>
                <p className="text-muted-foreground mt-2 leading-6">
                  {touchpoint
                    ? `The touchpoint “${touchpoint}” was detected. Its service and branch will be preselected once touchpoint data is available.`
                    : "This page will collect service, location, rating, comments, and optional contact details."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button asChild variant="outline" className="mt-6">
          <Link href="/">
            <ArrowLeft className="size-4" /> Return home
          </Link>
        </Button>
      </section>
    </main>
  );
}
