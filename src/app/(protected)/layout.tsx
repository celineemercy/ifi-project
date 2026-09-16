import { AppShell } from "@/components/layout/app-shell";
import { verifySession } from "@/lib/auth/session";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  return <AppShell user={session.user}>{children}</AppShell>;
}
