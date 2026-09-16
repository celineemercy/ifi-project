import { requireRole } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["SUPER_ADMIN", "MANAGER"]);
  return children;
}
