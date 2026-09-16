import { requireRole } from "@/lib/auth/session";

export default async function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["MANAGER"]);
  return children;
}
