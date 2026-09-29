export type SimulationActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialSimulationState: SimulationActionState = {
  status: "idle",
  message: "",
};
