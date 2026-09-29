"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { SimulationActionState } from "@/components/practice/simulation-state";
import { requireRole } from "@/lib/auth/session";
import {
  abandonSimulation,
  addSimulationTurn,
  completeSimulation,
  startSimulation,
} from "@/services/simulation.service";

export async function startPractice(
  scenarioId: string,
  _formData: FormData,
) {
  const session = await requireRole(["STAFF"]);
  const simulation = await startSimulation(session.user.id, scenarioId);
  revalidatePath("/practice");
  redirect(`/practice/${simulation.scenario.slug}`);
}

export async function sendPracticeMessage(
  sessionId: string,
  _previousState: SimulationActionState,
  formData: FormData,
): Promise<SimulationActionState> {
  const session = await requireRole(["STAFF"]);
  const message = formData.get("message");
  const result = await addSimulationTurn(
    session.user.id,
    sessionId,
    typeof message === "string" ? message : "",
  );

  if (!result.ok) {
    return {
      status: "error",
      message: result.message ?? "The response could not be sent.",
    };
  }

  revalidatePath("/practice");
  return { status: "success", message: "Response sent." };
}

export async function endPractice(sessionId: string, _formData: FormData) {
  const session = await requireRole(["STAFF"]);
  const assessment = await completeSimulation(session.user.id, sessionId);
  if (!assessment) redirect("/practice");

  revalidatePath("/home");
  revalidatePath("/practice");
  revalidatePath("/assessments");
  revalidatePath("/progress");
  redirect(`/assessment/${sessionId}`);
}

export async function abandonPractice(sessionId: string, _formData: FormData) {
  const session = await requireRole(["STAFF"]);
  await abandonSimulation(session.user.id, sessionId);
  revalidatePath("/practice");
  redirect("/practice");
}
