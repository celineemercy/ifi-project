import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireRole } from "@/lib/auth/session";
import { getAdminUsers } from "@/services/admin.service";

const roleLabels = {
  STAFF: "Staff",
  MANAGER: "Manager",
  SUPER_ADMIN: "Super admin",
  MEMBER: "Member",
} as const;

export default async function UsersPage() {
  await requireRole(["SUPER_ADMIN"]);
  const users = await getAdminUsers();

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Administration"
        title="Demo users"
        description="Review prototype staff, member, manager, and administrator accounts and their current learning activity."
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Completed modules</TableHead>
                <TableHead className="text-right">Practice sessions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {user.email}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "STAFF" ? "secondary" : "outline"}
                    >
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.department ?? "Not assigned"}</TableCell>
                  <TableCell>
                    {
                      user.moduleProgress.filter((item) => item.completed)
                        .length
                    }
                    /{user._count.moduleProgress}
                  </TableCell>
                  <TableCell className="text-right">
                    {user._count.simulationSessions}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
