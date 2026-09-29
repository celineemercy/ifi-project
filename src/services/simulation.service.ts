import "server-only";

import { cache } from "react";
import { z } from "zod";

import {
  ConversationRole,
  SimulationStatus,
} from "@/generated/prisma/client";
import {
  assessTranscript,
  generateVisitorReply,
} from "@/lib/simulation/engine";
import { prisma } from "@/lib/db/client";

const employeeMessageSchema = z
  .string()
  .trim()
  .min(2, "Write a response before sending.")
  .max(1200, "Keep the response under 1,200 characters.");

export const getActiveScenarios = cache(async () =>
  prisma.scenario.findMany({
    where: { active: true },
    orderBy: [{ serviceArea: "asc" }, { difficulty: "asc" }, { title: "asc" }],
  }),
);

export const getScenarioForPractice = cache(async (slug: string) =>
  prisma.scenario.findFirst({ where: { slug, active: true } }),
);

export async function getCurrentSimulation(
  userId: string,
  scenarioId: string,
) {
  return prisma.simulationSession.findFirst({
    where: { userId, scenarioId, status: SimulationStatus.IN_PROGRESS },
    orderBy: { startedAt: "desc" },
    include: {
      scenario: true,
      messages: { orderBy: { sequence: "asc" } },
    },
  });
}

export async function getSimulationForUser(userId: string, sessionId: string) {
  return prisma.simulationSession.findFirst({
    where: { id: sessionId, userId },
    include: {
      scenario: true,
      messages: { orderBy: { sequence: "asc" } },
      assessment: { include: { recommendedModule: true } },
    },
  });
}

export async function startSimulation(userId: string, scenarioId: string) {
  const existing = await getCurrentSimulation(userId, scenarioId);
  if (existing) return existing;

  const scenario = await prisma.scenario.findFirst({
    where: { id: scenarioId, active: true },
  });
  if (!scenario) throw new Error("Scenario is unavailable.");

  return prisma.simulationSession.create({
    data: {
      userId,
      scenarioId,
      messages: {
        create: {
          sequence: 1,
          role: ConversationRole.VISITOR,
          content: scenario.openingMessage,
        },
      },
    },
    include: {
      scenario: true,
      messages: { orderBy: { sequence: "asc" } },
    },
  });
}

export async function addSimulationTurn(
  userId: string,
  sessionId: string,
  rawMessage: string,
) {
  const parsed = employeeMessageSchema.safeParse(rawMessage);
  if (!parsed.success) {
    return { ok: false as const, message: parsed.error.issues[0]?.message };
  }

  const result = await prisma.$transaction(async (transaction) => {
    const session = await transaction.simulationSession.findFirst({
      where: {
        id: sessionId,
        userId,
        status: SimulationStatus.IN_PROGRESS,
      },
      include: {
        scenario: true,
        messages: { orderBy: { sequence: "asc" } },
      },
    });
    if (!session) return null;

    const nextSequence = (session.messages.at(-1)?.sequence ?? 0) + 1;
    const employeeTurn =
      session.messages.filter(
        (message) => message.role === ConversationRole.EMPLOYEE,
      ).length + 1;
    const visitorReply = generateVisitorReply(
      session.scenario.slug,
      employeeTurn,
    );

    await transaction.conversationMessage.createMany({
      data: [
        {
          sessionId,
          sequence: nextSequence,
          role: ConversationRole.EMPLOYEE,
          content: parsed.data,
        },
        {
          sessionId,
          sequence: nextSequence + 1,
          role: ConversationRole.VISITOR,
          content: visitorReply,
        },
      ],
    });

    return { visitorReply };
  });

  return result
    ? { ok: true as const, message: "Response sent.", ...result }
    : { ok: false as const, message: "This simulation is no longer active." };
}

export async function completeSimulation(userId: string, sessionId: string) {
  const session = await getSimulationForUser(userId, sessionId);
  if (!session || session.status === SimulationStatus.ABANDONED) return null;
  if (session.assessment) return session.assessment;
  if (
    session.messages.filter(
      (message) => message.role === ConversationRole.EMPLOYEE,
    ).length < 2
  ) {
    return null;
  }

  const result = assessTranscript(
    session.scenario.slug,
    session.messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
  );
  const recommendedModule = await prisma.learningModule.findUnique({
    where: { slug: result.recommendedModuleSlug },
    select: { id: true },
  });

  return prisma.$transaction(async (transaction) => {
    const assessment = await transaction.assessment.upsert({
      where: { sessionId },
      update: {},
      create: {
        sessionId,
        communication: result.communication,
        empathy: result.empathy,
        problemSolving: result.problemSolving,
        professionalTone: result.professionalTone,
        clarity: result.clarity,
        overallScore: result.overallScore,
        strength: result.strength,
        improvement: result.improvement,
        recommendedModuleId: recommendedModule?.id,
      },
    });

    await transaction.simulationSession.update({
      where: { id: sessionId },
      data: {
        status: SimulationStatus.COMPLETED,
        completedAt: new Date(),
        overallScore: result.overallScore,
      },
    });

    return assessment;
  });
}

export async function abandonSimulation(userId: string, sessionId: string) {
  const result = await prisma.simulationSession.updateMany({
    where: {
      id: sessionId,
      userId,
      status: SimulationStatus.IN_PROGRESS,
    },
    data: { status: SimulationStatus.ABANDONED, completedAt: new Date() },
  });
  return result.count > 0;
}

export const getAssessmentHistory = cache(async (userId: string) =>
  prisma.simulationSession.findMany({
    where: {
      userId,
      status: SimulationStatus.COMPLETED,
      assessment: { isNot: null },
    },
    orderBy: { completedAt: "desc" },
    include: { scenario: true, assessment: true },
  }),
);
