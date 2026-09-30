import "server-only";

import { cache } from "react";
import { z } from "zod";

import {
  ModuleAudience,
  ModuleStatus,
  SimulationStatus,
} from "@/generated/prisma/client";
import { prisma } from "@/lib/db/client";

const quizQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()).min(2),
  correctIndex: z.number().int().nonnegative(),
  explanation: z.string(),
});

const quizSchema = z.array(quizQuestionSchema).length(3);

export type LearningQuizQuestion = z.infer<typeof quizQuestionSchema>;

export function parseLearningQuiz(value: unknown): LearningQuizQuestion[] {
  const parsed = quizSchema.safeParse(value);
  return parsed.success ? parsed.data : [];
}

export const getLearningModulesForUser = cache(
  async (userId: string, audience: ModuleAudience = ModuleAudience.STAFF) => {
    const modules = await prisma.learningModule.findMany({
      where: { status: ModuleStatus.PUBLISHED, audience },
      orderBy: { order: "asc" },
      include: {
        lessons: { orderBy: { order: "asc" } },
        progress: { where: { userId }, take: 1 },
      },
    });

    return modules.map(({ progress, ...learningModule }) => ({
      ...learningModule,
      userProgress: progress[0] ?? null,
    }));
  },
);

export const getLearningModuleForUser = cache(
  async (
    moduleIdOrSlug: string,
    userId: string,
    audience: ModuleAudience = ModuleAudience.STAFF,
  ) => {
    const learningModuleRecord = await prisma.learningModule.findFirst({
      where: {
        status: ModuleStatus.PUBLISHED,
        audience,
        OR: [{ id: moduleIdOrSlug }, { slug: moduleIdOrSlug }],
      },
      include: {
        lessons: { orderBy: { order: "asc" } },
        progress: { where: { userId }, take: 1 },
      },
    });

    if (!learningModuleRecord) return null;

    const { progress, ...learningModule } = learningModuleRecord;
    return {
      ...learningModule,
      quizQuestions: parseLearningQuiz(learningModuleRecord.quiz),
      userProgress: progress[0] ?? null,
    };
  },
);

export const getStaffLearningSummary = cache(async (userId: string) => {
  const [progress, sessions] = await Promise.all([
    prisma.moduleProgress.findMany({
      where: { userId, module: { audience: ModuleAudience.STAFF } },
      include: { module: true },
      orderBy: { module: { order: "asc" } },
    }),
    prisma.simulationSession.findMany({
      where: { userId, status: SimulationStatus.COMPLETED },
      include: {
        assessment: { include: { recommendedModule: true } },
      },
      orderBy: { completedAt: "desc" },
    }),
  ]);

  const overallProgress = progress.length
    ? Math.round(
        progress.reduce((total, item) => total + item.progress, 0) /
          progress.length,
      )
    : 0;
  const completedModules = progress.filter((item) => item.completed).length;
  const scoredSessions = sessions.filter((item) => item.assessment);
  const averageScore = scoredSessions.length
    ? Math.round(
        scoredSessions.reduce(
          (total, item) => total + (item.assessment?.overallScore ?? 0),
          0,
        ) / scoredSessions.length,
      )
    : 0;

  const skillAverages = scoredSessions.length
    ? {
        communication: Math.round(
          scoredSessions.reduce(
            (total, item) => total + (item.assessment?.communication ?? 0),
            0,
          ) / scoredSessions.length,
        ),
        empathy: Math.round(
          scoredSessions.reduce(
            (total, item) => total + (item.assessment?.empathy ?? 0),
            0,
          ) / scoredSessions.length,
        ),
        problemSolving: Math.round(
          scoredSessions.reduce(
            (total, item) => total + (item.assessment?.problemSolving ?? 0),
            0,
          ) / scoredSessions.length,
        ),
        professionalTone: Math.round(
          scoredSessions.reduce(
            (total, item) => total + (item.assessment?.professionalTone ?? 0),
            0,
          ) / scoredSessions.length,
        ),
        clarity: Math.round(
          scoredSessions.reduce(
            (total, item) => total + (item.assessment?.clarity ?? 0),
            0,
          ) / scoredSessions.length,
        ),
      }
    : null;

  return {
    overallProgress,
    completedModules,
    totalModules: progress.length,
    completedSessions: sessions.length,
    averageScore,
    skillAverages,
    recommendedModule: scoredSessions[0]?.assessment?.recommendedModule ?? null,
    moduleProgress: progress,
  };
});

export const getMemberLearningSummary = cache(async (userId: string) => {
  const modules = await getLearningModulesForUser(
    userId,
    ModuleAudience.MEMBER,
  );
  const completedModules = modules.filter(
    (module) => module.userProgress?.completed,
  ).length;
  const overallProgress = modules.length
    ? Math.round(
        modules.reduce(
          (total, module) => total + (module.userProgress?.progress ?? 0),
          0,
        ) / modules.length,
      )
    : 0;

  return {
    modules,
    completedModules,
    totalModules: modules.length,
    overallProgress,
    nextModule:
      modules.find((module) => !module.userProgress?.completed) ?? null,
  };
});

export async function completeLearningModule(userId: string, moduleId: string) {
  const existing = await prisma.moduleProgress.findUnique({
    where: { userId_moduleId: { userId, moduleId } },
  });

  if (existing?.completed) return existing;

  const now = new Date();

  return prisma.moduleProgress.upsert({
    where: { userId_moduleId: { userId, moduleId } },
    create: {
      userId,
      moduleId,
      progress: 100,
      completed: true,
      startedAt: now,
      completedAt: now,
    },
    update: {
      progress: 100,
      completed: true,
      startedAt: now,
      completedAt: now,
    },
  });
}
