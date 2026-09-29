import "server-only";

import { cache } from "react";

import { UserRole } from "@/generated/prisma/client";
import { prisma } from "@/lib/db/client";

export const getAdminScenarios = cache(async () =>
  prisma.scenario.findMany({
    orderBy: [{ active: "desc" }, { serviceArea: "asc" }, { title: "asc" }],
    include: { _count: { select: { simulationSessions: true } } },
  }),
);

export const getAdminLearningModules = cache(async () =>
  prisma.learningModule.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: { select: { lessons: true, progress: true } },
      progress: { select: { completed: true } },
    },
  }),
);

export const getAdminUsers = cache(async () =>
  prisma.user.findMany({
    orderBy: [{ role: "asc" }, { name: "asc" }],
    include: {
      _count: { select: { moduleProgress: true, simulationSessions: true } },
      moduleProgress: { select: { completed: true } },
    },
  }),
);

export const getStaffCount = cache(() =>
  prisma.user.count({ where: { role: UserRole.STAFF } }),
);
