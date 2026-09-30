"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import type { ScenarioActionState } from "@/components/admin/scenario-state";
import { ScenarioDifficulty, ServiceArea } from "@/generated/prisma/client";
import { requireRole } from "@/lib/auth/session";
import { prisma } from "@/lib/db/client";

const scenarioSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3).max(100),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words and hyphens."),
  serviceArea: z.enum(ServiceArea),
  difficulty: z.enum(ScenarioDifficulty),
  description: z.string().trim().min(20).max(500),
  customerPersonality: z.string().trim().min(10).max(300),
  learningObjective: z.string().trim().min(20).max(500),
  skills: z
    .string()
    .transform((value) =>
      value
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    )
    .pipe(z.array(z.string()).min(1).max(8)),
  openingMessage: z.string().trim().min(10).max(1000),
});

export async function saveScenario(
  _previousState: ScenarioActionState,
  formData: FormData,
): Promise<ScenarioActionState> {
  await requireRole(["SUPER_ADMIN"]);
  const parsed = scenarioSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    serviceArea: formData.get("serviceArea"),
    difficulty: formData.get("difficulty"),
    description: formData.get("description"),
    customerPersonality: formData.get("customerPersonality"),
    learningObjective: formData.get("learningObjective"),
    skills: formData.get("skills"),
    openingMessage: formData.get("openingMessage"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Review the highlighted scenario details.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { id, ...data } = parsed.data;
  const duplicate = await prisma.scenario.findFirst({
    where: { slug: data.slug, ...(id ? { NOT: { id } } : {}) },
    select: { id: true },
  });
  if (duplicate) {
    return {
      status: "error",
      message: "A scenario already uses this slug.",
      errors: { slug: ["Choose a unique slug."] },
    };
  }

  if (id) {
    const updated = await prisma.scenario.updateMany({
      where: { id },
      data,
    });
    if (!updated.count) {
      return { status: "error", message: "Scenario not found." };
    }
  } else {
    await prisma.scenario.create({ data: { ...data, active: true } });
  }

  revalidatePath("/admin/scenarios");
  revalidatePath("/practice");
  return {
    status: "success",
    message: id ? "Scenario updated." : "Scenario created.",
  };
}

export async function toggleScenarioActive(
  scenarioId: string,
  active: boolean,
) {
  await requireRole(["SUPER_ADMIN"]);
  await prisma.scenario.updateMany({
    where: { id: scenarioId },
    data: { active },
  });
  revalidatePath("/admin/scenarios");
  revalidatePath("/practice");
}
