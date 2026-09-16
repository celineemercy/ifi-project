import { cache } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import type { AppRole } from "@/config/demo-accounts";
import { authOptions } from "@/lib/auth/options";

export const verifySession = cache(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  return session;
});

export async function requireRole(
  allowedRoles: AppRole[],
  fallback = "/staff",
) {
  const session = await verifySession();
  if (!allowedRoles.includes(session.user.role)) redirect(fallback);
  return session;
}
