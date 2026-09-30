import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import type { AppRole } from "@/config/demo-accounts";
import { authOptions } from "@/lib/auth/options";

const homeByRole: Record<AppRole, string> = {
  STAFF: "/home",
  MANAGER: "/manager",
  SUPER_ADMIN: "/admin/scenarios",
  MEMBER: "/member",
};

export default async function RootPage() {
  const session = await getServerSession(authOptions);
  redirect(session?.user ? homeByRole[session.user.role] : "/login");
}
