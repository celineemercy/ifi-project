import type {
  ScenarioDifficulty,
  ServiceArea,
} from "@/generated/prisma/client";

export const serviceAreaLabels: Record<ServiceArea, string> = {
  COURSES: "Courses",
  CULTURE: "Culture",
  MEDIATHEQUE: "Médiathèque",
  CAMPUS_FRANCE: "Campus France",
  ADMINISTRATION: "Administration",
};

export const difficultyLabels: Record<ScenarioDifficulty, string> = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};
