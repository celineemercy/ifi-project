"use server";

import { revalidatePath } from "next/cache";
import { ModuleAudience } from "@/generated/prisma/client";

import type { QuizState } from "@/components/learning/quiz-state";
import { requireRole } from "@/lib/auth/session";
import {
  completeLearningModule,
  getLearningModuleForUser,
} from "@/services/learning.service";

export async function submitModuleQuiz(
  moduleId: string,
  _previousState: QuizState,
  formData: FormData,
): Promise<QuizState> {
  const session = await requireRole(["STAFF", "MEMBER"]);
  const audience =
    session.user.role === "MEMBER"
      ? ModuleAudience.MEMBER
      : ModuleAudience.STAFF;
  const learningModule = await getLearningModuleForUser(
    moduleId,
    session.user.id,
    audience,
  );

  if (!learningModule || learningModule.quizQuestions.length !== 3) {
    return {
      status: "error",
      score: null,
      total: null,
      message: "This quiz is unavailable. Please return to My Learning.",
    };
  }

  const answers = learningModule.quizQuestions.map((question) => {
    const value = formData.get(`answer-${question.id}`);
    return typeof value === "string" ? Number(value) : Number.NaN;
  });

  if (answers.some((answer) => !Number.isInteger(answer))) {
    return {
      status: "error",
      score: null,
      total: learningModule.quizQuestions.length,
      message: "Please answer all three questions before submitting.",
    };
  }

  const score = answers.reduce(
    (total, answer, index) =>
      total +
      (answer === learningModule.quizQuestions[index]?.correctIndex ? 1 : 0),
    0,
  );
  const passed = score === learningModule.quizQuestions.length;

  if (!passed) {
    return {
      status: "retry",
      score,
      total: learningModule.quizQuestions.length,
      message:
        "Review the lesson examples and try again. Module completion requires three correct answers.",
    };
  }

  await completeLearningModule(session.user.id, learningModule.id);
  revalidatePath("/home");
  revalidatePath("/learning");
  revalidatePath(`/learning/${learningModule.slug}`);
  revalidatePath("/progress");
  revalidatePath("/member");
  revalidatePath("/member/courses");
  revalidatePath(`/member/courses/${learningModule.slug}`);
  revalidatePath("/member/progress");

  return {
    status: "passed",
    score,
    total: learningModule.quizQuestions.length,
    message: "Module complete. Your learning progress has been updated.",
  };
}
