import "server-only";

import { cache } from "react";
import { ModuleAudience, ModuleStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/db/client";

export const getMemberPackageState = cache(async (userId: string) => {
  const [packages, purchases, modules, completedProgress] = await Promise.all([
    prisma.learningPackage.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.demoPurchase.findMany({
      where: { userId },
      include: { package: true },
      orderBy: { confirmedAt: "desc" },
    }),
    prisma.learningModule.findMany({
      where: {
        audience: ModuleAudience.MEMBER,
        status: ModuleStatus.PUBLISHED,
      },
      select: { id: true, title: true },
    }),
    prisma.moduleProgress.findMany({
      where: {
        userId,
        completed: true,
        module: { audience: ModuleAudience.MEMBER },
      },
      select: { moduleId: true },
    }),
  ]);

  const ownedPackageIds = new Set(
    purchases.map((purchase) => purchase.packageId),
  );
  const unlockedModuleIds = new Set([
    ...purchases.flatMap((purchase) => purchase.package.moduleIds),
    // Preserve access to courses completed before packages were introduced.
    ...completedProgress.map((progress) => progress.moduleId),
  ]);
  const moduleTitles = new Map(
    modules.map((module) => [module.id, module.title]),
  );

  return {
    unlockedModuleIds,
    packages: packages.map((learningPackage) => ({
      ...learningPackage,
      owned: ownedPackageIds.has(learningPackage.id),
      newlyUnlockedCount: learningPackage.moduleIds.filter(
        (moduleId) =>
          !unlockedModuleIds.has(moduleId) && moduleTitles.has(moduleId),
      ).length,
      courseTitles: learningPackage.moduleIds
        .map((moduleId) => moduleTitles.get(moduleId))
        .filter((title): title is string => Boolean(title)),
    })),
    purchases,
  };
});

export async function confirmMemberDemoPurchase(
  userId: string,
  packageId: string,
) {
  const learningPackage = await prisma.learningPackage.findFirst({
    where: { id: packageId, active: true },
  });
  if (!learningPackage) return { status: "unavailable" as const, slug: null };

  const state = await getMemberPackageState(userId);
  if (state.packages.some((item) => item.id === packageId && item.owned)) {
    return { status: "owned" as const, slug: learningPackage.slug };
  }
  if (
    learningPackage.moduleIds.every((moduleId) =>
      state.unlockedModuleIds.has(moduleId),
    )
  ) {
    return { status: "unlocked" as const, slug: learningPackage.slug };
  }

  await prisma.demoPurchase.upsert({
    where: { userId_packageId: { userId, packageId } },
    update: {},
    create: { userId, packageId },
  });
  return { status: "confirmed" as const, slug: learningPackage.slug };
}
