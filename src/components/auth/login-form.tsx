"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, LoaderCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { demoPassword } from "@/config/demo-accounts";

const demoEmails = [
  "alex.staff@ifi.demo",
  "manager@ifi.demo",
  "admin@ifi.demo",
] as const;

const destinationByEmail: Record<(typeof demoEmails)[number], string> = {
  "alex.staff@ifi.demo": "/home",
  "manager@ifi.demo": "/manager",
  "admin@ifi.demo": "/admin/scenarios",
};

export function LoginForm() {
  const router = useRouter();
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

    router.push(destinationByEmail[email]);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div className="grid gap-2">
        <Label htmlFor="demo-account">Demo account</Label>
        <Select
          value={email}
          onValueChange={(value) =>
            setEmail(value as (typeof demoEmails)[number])
          }
        >
          <SelectTrigger id="demo-account" className="h-11">
            <SelectValue placeholder="Choose a demo account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={demoEmails[0]}>Alex - Staff</SelectItem>
            <SelectItem value={demoEmails[1]}>Manager</SelectItem>
            <SelectItem value={demoEmails[2]}>Super Admin</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-muted-foreground text-xs">{email}</p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-11"
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
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
