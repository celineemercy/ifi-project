export type QuizState = {
  status: "idle" | "passed" | "retry" | "error";
  score: number | null;
  total: number | null;
  message: string | null;
};

export const initialQuizState: QuizState = {
  status: "idle",
  score: null,
  total: null,
  message: null,
};
