"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireRole } from "@/lib/auth/session";
import { confirmMemberDemoPurchase } from "@/services/member-packages.service";

export async function confirmDemoPurchase(packageId: string) {
  const session = await requireRole(["MEMBER"]);
  const result = await confirmMemberDemoPurchase(session.user.id, packageId);

  revalidatePath("/member");
  revalidatePath("/member/courses");
  revalidatePath("/member/progress");
  revalidatePath("/member/packages");

  const params = new URLSearchParams({ status: result.status });
  if (result.slug) params.set("package", result.slug);
  redirect(`/member/packages?${params.toString()}`);
}
