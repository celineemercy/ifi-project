"use client";

import { useActionState, useEffect } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

import { submitModuleQuiz } from "@/app/(protected)/learning/[moduleId]/actions";
import { Button } from "@/components/ui/button";
import { initialQuizState } from "@/components/learning/quiz-state";
import type { LearningQuizQuestion } from "@/services/learning.service";

type ModuleQuizProps = {
  moduleId: string;
  questions: LearningQuizQuestion[];
  alreadyCompleted: boolean;
};

export function ModuleQuiz({
  moduleId,
  questions,
  alreadyCompleted,
}: ModuleQuizProps) {
  const router = useRouter();
  const action = submitModuleQuiz.bind(null, moduleId);
  const [state, formAction, pending] = useActionState(action, initialQuizState);

  useEffect(() => {
    if (state.status === "passed") router.refresh();
  }, [router, state.status]);

  if (!questions.length) {
    return (
      <p className="text-muted-foreground mt-4">
        This module does not have a quiz yet.
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-7">
      {questions.map((question, questionIndex) => (
        <fieldset key={question.id} className="space-y-3">
          <legend className="font-semibold">
            {questionIndex + 1}. {question.question}
          </legend>
          <div className="grid gap-2">
            {question.options.map((option, optionIndex) => (
              <label
                key={option}
                className="border-border hover:border-brand-green/40 hover:bg-brand-green-light/40 flex cursor-pointer items-start gap-3 rounded-xl border bg-white px-4 py-3 transition-colors"
              >
                <input
                  className="accent-brand-green mt-1 size-4"
                  type="radio"
                  name={`answer-${question.id}`}
                  value={optionIndex}
                  required
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="flex flex-wrap items-center gap-4">
        <Button disabled={pending} type="submit" size="lg">
          {pending
            ? "Checking answers…"
            : alreadyCompleted
              ? "Review quiz"
              : "Complete module"}
        </Button>
        {alreadyCompleted && state.status === "idle" ? (
          <span className="text-brand-green inline-flex items-center gap-2 font-semibold">
            <CheckCircle2 className="size-5" /> Already completed
          </span>
        ) : null}
      </div>

      {state.message ? (
        <div
          aria-live="polite"
          className={`rounded-xl border p-4 ${
            state.status === "passed"
              ? "border-brand-green/25 bg-brand-green-light text-brand-green-dark"
              : state.status === "retry"
                ? "border-brand-orange/30 bg-orange-50 text-orange-950"
                : "border-brand-red/25 bg-red-50 text-red-900"
          }`}
        >
          <p className="font-semibold">
            {state.score === null
              ? state.message
              : `${state.score}/${state.total} correct`}
          </p>
          {state.score !== null ? (
            <p className="mt-1 text-sm">{state.message}</p>
          ) : null}
          {state.status === "retry" ? (
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
              <RotateCcw className="size-4" /> You can resubmit when ready.
            </p>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
