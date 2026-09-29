"use client";

import { useActionState, useEffect } from "react";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

import { submitModuleQuiz } from "@/app/(protected)/learning/[moduleId]/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { initialQuizState } from "@/components/learning/quiz-state";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
          <RadioGroup name={`answer-${question.id}`} required>
            {question.options.map((option, optionIndex) => (
              <Label
                key={option}
                htmlFor={`${question.id}-${optionIndex}`}
                className="border-border bg-card hover:border-primary/40 hover:bg-accent has-data-[state=checked]:border-primary has-data-[state=checked]:bg-accent flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 font-normal transition-colors"
              >
                <RadioGroupItem
                  id={`${question.id}-${optionIndex}`}
                  value={String(optionIndex)}
                  className="mt-0.5"
                />
                <span>{option}</span>
              </Label>
            ))}
          </RadioGroup>
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
          <Badge variant="success">
            <CheckCircle2 className="size-5" /> Already completed
          </Badge>
        ) : null}
      </div>

      {state.message ? (
        <Alert
          aria-live="polite"
          variant={
            state.status === "passed"
              ? "success"
              : state.status === "retry"
                ? "warning"
                : "destructive"
          }
        >
          <AlertTitle>
            {state.score === null
              ? state.message
              : `${state.score}/${state.total} correct`}
          </AlertTitle>
          {state.score !== null ? (
            <AlertDescription>{state.message}</AlertDescription>
          ) : null}
          {state.status === "retry" ? (
            <AlertDescription className="mt-2 inline-flex items-center gap-2 font-semibold">
              <RotateCcw className="size-4" /> You can resubmit when ready.
            </AlertDescription>
          ) : null}
        </Alert>
      ) : null}
    </form>
  );
}
