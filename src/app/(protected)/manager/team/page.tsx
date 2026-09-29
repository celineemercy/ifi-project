import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireRole } from "@/lib/auth/session";
import { getManagerAnalytics } from "@/services/analytics.service";

export default async function TeamProgressPage() {
  await requireRole(["MANAGER"]);
  const analytics = await getManagerAnalytics();

  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10">
      <PageHeader
        eyebrow="Team progress"
        title="Learning participation"
        description="Understand how the team is progressing through modules and practice sessions."
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team member</TableHead>
                <TableHead>Learning progress</TableHead>
                <TableHead>Modules</TableHead>
                <TableHead>Practices</TableHead>
                <TableHead className="text-right">Average score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics.team.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.department ?? "IFI team"}
                    </p>
                  </TableCell>
                  <TableCell className="min-w-48">
                    <div className="mb-2 flex justify-between text-xs">
                      <span>Overall</span>
                      <span>{member.overallProgress}%</span>
                    </div>
                    <Progress value={member.overallProgress} />
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {member.completedModules}/{member.totalModules}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.completedSessions}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {member.completedSessions > 0
                      ? `${member.averageScore}/100`
                      : "Not available"}
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
