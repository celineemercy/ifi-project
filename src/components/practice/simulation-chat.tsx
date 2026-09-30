"use client";

import { useActionState, useEffect, useRef } from "react";
import { Flag, LoaderCircle, Send, StopCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  abandonPractice,
  endPractice,
  sendPracticeMessage,
} from "@/app/(protected)/practice/[scenarioId]/actions";
import { initialSimulationState } from "@/components/practice/simulation-state";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "VISITOR" | "EMPLOYEE";
  content: string;
};

export function SimulationChat({
  sessionId,
  scenarioTitle,
  messages,
}: {
  sessionId: string;
  scenarioTitle: string;
  messages: ChatMessage[];
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const sendAction = sendPracticeMessage.bind(null, sessionId);
  const endAction = endPractice.bind(null, sessionId);
  const abandonAction = abandonPractice.bind(null, sessionId);
  const [state, formAction, pending] = useActionState(
    sendAction,
    initialSimulationState,
  );
  const employeeTurns = messages.filter(
    (message) => message.role === "EMPLOYEE",
  ).length;

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      router.refresh();
    }
  }, [router, state]);

  return (
    <Card className="mt-8 overflow-hidden">
      <CardHeader className="border-b pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge variant="success">Simulation in progress</Badge>
            <h2 className="mt-2 text-xl font-bold">{scenarioTitle}</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            {employeeTurns} employee response{employeeTurns === 1 ? "" : "s"}
          </p>
        </div>
      </CardHeader>

      <CardContent className="max-h-[52vh] space-y-4 overflow-y-auto bg-muted/35 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "EMPLOYEE" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-lg px-4 py-3 text-sm leading-6 sm:max-w-[72%]",
                message.role === "EMPLOYEE"
                  ? "bg-primary text-primary-foreground"
                  : "border bg-card text-card-foreground",
              )}
            >
              <p className="mb-1 text-xs font-semibold opacity-65">
                {message.role === "EMPLOYEE" ? "You" : "Visitor"}
              </p>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="block border-t p-4">
        <form ref={formRef} action={formAction} className="space-y-3">
          <Textarea
            name="message"
            required
            minLength={2}
            maxLength={1200}
            placeholder="Respond as an IFI team member..."
            aria-label="Your response to the visitor"
            disabled={pending}
          />
          {state.status === "error" ? (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-muted-foreground text-xs">
              The simulator plays only the visitor. Feedback begins after you
              end the conversation.
            </p>
            <Button type="submit" disabled={pending}>
              {pending ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              Send response
            </Button>
          </div>
        </form>

        <div className="mt-5 flex flex-wrap gap-3 border-t pt-5">
          <form action={endAction}>
            <Button
              type="submit"
              variant="secondary"
              disabled={employeeTurns < 2}
            >
              <Flag className="size-4" /> End and assess
            </Button>
          </form>
          <form action={abandonAction}>
            <Button type="submit" variant="ghost">
              <StopCircle className="size-4" /> Abandon session
            </Button>
          </form>
          {employeeTurns < 2 ? (
            <p className="text-muted-foreground self-center text-xs">
              Send at least two responses before assessment.
            </p>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}
