import "server-only";

import { cache } from "react";

import {
  ModuleStatus,
  SimulationStatus,
  UserRole,
} from "@/generated/prisma/client";
import { prisma } from "@/lib/db/client";

export const getManagerAnalytics = cache(async () => {
  const [staff, moduleCount] = await Promise.all([
    prisma.user.findMany({
      where: { role: UserRole.STAFF },
      orderBy: { name: "asc" },
      include: {
        moduleProgress: true,
        simulationSessions: {
          where: { status: SimulationStatus.COMPLETED },
          include: { assessment: true },
        },
      },
    }),
    prisma.learningModule.count({
      where: { status: ModuleStatus.PUBLISHED },
    }),
  ]);

  const assessedSessions = staff.flatMap((member) =>
    member.simulationSessions.filter((session) => session.assessment),
  );
  const progressRows = staff.flatMap((member) => member.moduleProgress);
  const completedRows = progressRows.filter((item) => item.completed).length;
  const totalRows = staff.length * moduleCount;

  const skills = [
    {
      key: "communication",
      label: "Communication",
      value: average(
        assessedSessions.map(
          (session) => session.assessment?.communication ?? 0,
        ),
      ),
    },
    {
      key: "empathy",
      label: "Empathy",
      value: average(
        assessedSessions.map((session) => session.assessment?.empathy ?? 0),
      ),
    },
    {
      key: "problemSolving",
      label: "Problem solving",
      value: average(
        assessedSessions.map(
          (session) => session.assessment?.problemSolving ?? 0,
        ),
      ),
    },
    {
      key: "professionalTone",
      label: "Professional tone",
      value: average(
        assessedSessions.map(
          (session) => session.assessment?.professionalTone ?? 0,
        ),
      ),
    },
    {
      key: "clarity",
      label: "Clarity",
      value: average(
        assessedSessions.map((session) => session.assessment?.clarity ?? 0),
      ),
    },
  ];

  const team = staff.map((member) => {
    const assessments = member.simulationSessions
      .map((session) => session.assessment)
      .filter((assessment) => assessment !== null);
    return {
      id: member.id,
      name: member.name,
      department: member.department,
      overallProgress: moduleCount
        ? Math.round(
            member.moduleProgress.reduce(
              (total, item) => total + item.progress,
              0,
            ) / moduleCount,
          )
        : 0,
      completedModules: member.moduleProgress.filter((item) => item.completed)
        .length,
      totalModules: moduleCount,
      completedSessions: member.simulationSessions.length,
      averageScore: average(
        assessments.map((assessment) => assessment.overallScore),
      ),
    };
  });

  return {
    staffCount: staff.length,
    activeLearners: team.filter(
      (member) => member.completedModules > 0 || member.completedSessions > 0,
    ).length,
    completionRate: totalRows
      ? Math.round((completedRows / totalRows) * 100)
      : 0,
    completedSessions: assessedSessions.length,
    averageScore: average(
      assessedSessions.map((session) => session.assessment?.overallScore ?? 0),
    ),
    skills,
    trainingFocus: skills.reduce((lowest, skill) =>
      skill.value < lowest.value ? skill : lowest,
    ),
    team,
  };
});

function average(values: number[]) {
  return values.length
    ? Math.round(
        values.reduce((total, value) => total + value, 0) / values.length,
      )
    : 0;
}
