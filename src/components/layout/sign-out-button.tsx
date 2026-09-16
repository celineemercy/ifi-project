"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="w-full justify-start text-white/65 hover:bg-white/10 hover:text-white"
    >
      <LogOut className="size-4" />
      Sign out
    </Button>
  );
}
