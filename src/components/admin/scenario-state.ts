export type ScenarioActionState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string[] | undefined>;
};

export const initialScenarioState: ScenarioActionState = {
  status: "idle",
  message: "",
};
