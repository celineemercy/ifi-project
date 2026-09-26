import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/components/auth/login-form";
import { ProductMark } from "@/components/brand/product-mark";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[0.9fr_1.1fr]">
      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" aria-label="Return to IFI Savoir-Faire Hub">
            <ProductMark />
          </Link>
          <p className="text-brand-green mt-12 text-sm font-semibold tracking-[0.15em] uppercase">
            Continuous service learning
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Welcome back.
          </h1>
          <p className="text-muted-foreground mt-3 leading-7">
            Sign in with a prototype account to learn, practice, assess, and
            improve.
          </p>
          <Suspense
            fallback={
              <div className="bg-muted mt-8 h-72 animate-pulse rounded-xl" />
            }
          >
            <LoginForm />
          </Suspense>
          <p className="text-muted-foreground mt-6 text-xs leading-5">
            These accounts contain demonstration data only. Credentials are
            verified against the prototype PostgreSQL database.
          </p>
        </div>
      </section>

      <section className="bg-brand-green relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1.5px)] [background-size:28px_28px] opacity-10" />
        <div className="relative max-w-xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-white/65 uppercase">
            Beyond the workshop
          </p>
          <h2 className="mt-4 text-5xl leading-tight font-bold">
            Great service grows through continuous practice.
          </h2>
          <div className="mt-8 grid grid-cols-4 gap-2 text-center text-sm font-semibold">
            {["Learn", "Practice", "Assess", "Improve"].map((step, index) => (
              <div
                key={step}
                className="rounded-xl border border-white/15 bg-white/10 px-2 py-3"
              >
                <span className="block text-xs text-white/50">
                  0{index + 1}
                </span>
                <span className="mt-1 block">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur-sm">
          <p className="text-sm text-white/65">Designed by</p>
          <p className="mt-1 text-2xl font-semibold">Pradita University</p>
          <div className="mt-5 inline-flex rounded-xl bg-white p-3">
            <Image
              src="/brand/ifi-indonesia-logo.png"
              alt="Institut français Indonésie and Embassy of France in Indonesia"
              width={230}
              height={153}
              className="h-20 w-auto object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
