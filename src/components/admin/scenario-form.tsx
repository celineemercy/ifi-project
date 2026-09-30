"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { saveScenario } from "@/app/(protected)/admin/scenarios/actions";
import { difficultyLabels, serviceAreaLabels } from "@/config/scenarios";
import type { Scenario } from "@/generated/prisma/client";
import { initialScenarioState } from "@/components/admin/scenario-state";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const serviceAreas = [
  "COURSES",
  "CULTURE",
  "MEDIATHEQUE",
  "CAMPUS_FRANCE",
  "ADMINISTRATION",
] as const;
const difficulties = ["EASY", "MEDIUM", "HARD"] as const;

export function ScenarioForm({ scenario }: { scenario?: Scenario }) {
  const [state, formAction, pending] = useActionState(
    saveScenario,
    initialScenarioState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const isEditing = Boolean(scenario);

  useEffect(() => {
    if (state.status !== "success") return;
    if (!isEditing) formRef.current?.reset();
    router.refresh();
  }, [isEditing, router, state]);

  const errorFor = (field: string) => state.errors?.[field]?.[0];

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {scenario ? <input type="hidden" name="id" value={scenario.id} /> : null}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={scenario?.title}
          aria-invalid={Boolean(errorFor("title"))}
          required
        />
        <FieldError message={errorFor("title")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={scenario?.slug}
          placeholder="course-registration-question"
          aria-invalid={Boolean(errorFor("slug"))}
          required
        />
        <FieldError message={errorFor("slug")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="serviceArea">Service area</Label>
          <Select
            name="serviceArea"
            defaultValue={scenario?.serviceArea ?? "COURSES"}
          >
            <SelectTrigger id="serviceArea">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {serviceAreas.map((area) => (
                <SelectItem key={area} value={area}>
                  {serviceAreaLabels[area]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errorFor("serviceArea")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            name="difficulty"
            defaultValue={scenario?.difficulty ?? "MEDIUM"}
          >
            <SelectTrigger id="difficulty">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficultyLabels[difficulty]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errorFor("difficulty")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={scenario?.description}
          aria-invalid={Boolean(errorFor("description"))}
          required
        />
        <FieldError message={errorFor("description")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerPersonality">Visitor personality</Label>
        <Textarea
          id="customerPersonality"
          name="customerPersonality"
          defaultValue={scenario?.customerPersonality}
          aria-invalid={Boolean(errorFor("customerPersonality"))}
          required
        />
        <FieldError message={errorFor("customerPersonality")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="learningObjective">Learning objective</Label>
        <Textarea
          id="learningObjective"
          name="learningObjective"
          defaultValue={scenario?.learningObjective}
          aria-invalid={Boolean(errorFor("learningObjective"))}
          required
        />
        <FieldError message={errorFor("learningObjective")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills</Label>
        <Input
          id="skills"
          name="skills"
          defaultValue={scenario?.skills.join(", ")}
          placeholder="Empathy, Clarity, Problem solving"
          aria-invalid={Boolean(errorFor("skills"))}
          required
        />
        <p className="text-muted-foreground text-xs">
          Separate skills with commas.
        </p>
        <FieldError message={errorFor("skills")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="openingMessage">Visitor opening message</Label>
        <Textarea
          id="openingMessage"
          name="openingMessage"
          defaultValue={scenario?.openingMessage}
          aria-invalid={Boolean(errorFor("openingMessage"))}
          required
        />
        <FieldError message={errorFor("openingMessage")} />
      </div>

      {state.message ? (
        <Alert variant={state.status === "success" ? "success" : "destructive"}>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending
          ? "Saving..."
          : scenario
            ? "Update scenario"
            : "Create scenario"}
      </Button>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p className="text-destructive text-xs font-medium">{message}</p>
  ) : null;
}
