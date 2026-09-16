import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  MessageSquareText,
} from "lucide-react";

import { ProductMark } from "@/components/brand/product-mark";
import { Button } from "@/components/ui/button";

const workflow = [
  {
    label: "Capture",
    copy: "Collect visitor feedback at every IFI service touchpoint.",
    icon: MessageSquareText,
    color: "bg-brand-green",
  },
  {
    label: "Understand",
    copy: "Turn comments into structured sentiment, issues, and urgency.",
    icon: BrainCircuit,
    color: "bg-ifi-blue",
  },
  {
    label: "Resolve",
    copy: "Route actionable feedback to the right IFI service team.",
    icon: CheckCircle2,
    color: "bg-brand-orange",
  },
  {
    label: "Improve",
    copy: "Reveal recurring friction and guide service improvements.",
    icon: BarChart3,
    color: "bg-brand-red",
  },
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <header className="border-border/80 border-b bg-white/95">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <ProductMark />
          <Button asChild variant="outline">
            <Link href="/login">Staff sign in</Link>
          </Button>
        </div>
      </header>

      <section className="bg-brand-green relative isolate text-white">
        <div className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px] opacity-15" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.18em] text-white/70 uppercase">
              Pradita University × Institut français d’Indonésie
            </p>
            <h1 className="max-w-3xl text-5xl leading-[0.98] font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Listen better.
              <span className="text-brand-yellow block">Improve together.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
              IFI Pulse connects feedback, AI-assisted understanding, service
              cases, and management insight in one practical workflow.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="text-brand-green bg-white hover:bg-white/90"
              >
                <Link href="/feedback">
                  Share feedback <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/login">Open staff workspace</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm sm:p-8">
            <div className="text-foreground rounded-2xl bg-white p-7 shadow-2xl shadow-black/15">
              <div className="border-border flex items-center justify-between gap-4 border-b pb-5">
                <div>
                  <p className="text-muted-foreground text-xs font-semibold tracking-[0.15em] uppercase">
                    Service signal
                  </p>
                  <p className="mt-1 text-xl font-semibold">
                    Registration clarity
                  </p>
                </div>
                <span className="bg-brand-amber/15 rounded-full px-3 py-1 text-sm font-semibold text-[#8a5100]">
                  Medium priority
                </span>
              </div>
              <blockquote className="text-foreground/80 my-6 text-lg leading-7">
                “The re-registration process was confusing and I received
                different answers from the team.”
              </blockquote>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <Signal label="Sentiment" value="Negative" />
                <Signal label="Service" value="Courses" />
                <Signal label="Action" value="Ticket created" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-brand-green text-sm font-semibold tracking-[0.15em] uppercase">
              One continuous loop
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From a visitor’s voice to measurable service action.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflow.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.label}
                  className="border-border rounded-2xl border bg-white p-6"
                >
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
                  <h3 className="mt-8 text-xl font-bold">{step.label}</h3>
                  <p className="text-muted-foreground mt-2 leading-6">
                    {step.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-border border-t bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="text-muted-foreground text-sm">
            University prototype for service experience improvement.
          </p>
          <Image
            src="/brand/ifi-indonesia-logo.png"
            alt="Institut français Indonésie and Embassy of France in Indonesia"
            width={210}
            height={140}
            className="h-16 w-auto object-contain"
          />
        </div>
      </footer>
    </main>
  );
}

function Signal({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted rounded-xl p-3">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
