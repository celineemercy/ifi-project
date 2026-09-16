"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { demoPassword } from "@/config/demo-accounts";

const demoEmails = [
  "admin@ifi-pulse.demo",
  "manager@ifi-pulse.demo",
  "staff@ifi-pulse.demo",
] as const;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<(typeof demoEmails)[number]>(
    demoEmails[0],
  );
  const [password, setPassword] = useState(demoPassword);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("The email or password is incorrect.");
      setIsPending(false);
      return;
    }

    router.push(searchParams.get("callbackUrl") || "/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Demo account</span>
        <select
          value={email}
          onChange={(event) =>
            setEmail(event.target.value as (typeof demoEmails)[number])
          }
          className="border-border focus:border-brand-green focus:ring-brand-green/15 h-11 w-full rounded-lg border bg-white px-3 outline-none focus:ring-2"
        >
          <option value={demoEmails[0]}>Super Admin</option>
          <option value={demoEmails[1]}>Manager</option>
          <option value={demoEmails[2]}>Courses Staff</option>
        </select>
        <span className="text-muted-foreground mt-1.5 block text-xs">
          {email}
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Password</span>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="border-border focus:border-brand-green focus:ring-brand-green/15 h-11 w-full rounded-lg border bg-white px-3 outline-none focus:ring-2"
        />
      </label>

      {error && (
        <p
          role="alert"
          className="bg-brand-red/8 text-brand-red rounded-lg px-3 py-2 text-sm"
        >
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={isPending}>
        {isPending ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <ArrowRight className="size-4" />
        )}
        {isPending ? "Signing in…" : "Sign in to workspace"}
      </Button>
    </form>
  );
}
