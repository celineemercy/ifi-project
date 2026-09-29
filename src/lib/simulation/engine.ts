import { z } from "zod";

type TranscriptMessage = {
  role: "VISITOR" | "EMPLOYEE";
  content: string;
};

const assessmentResultSchema = z.object({
  communication: z.number().int().min(0).max(100),
  empathy: z.number().int().min(0).max(100),
  problemSolving: z.number().int().min(0).max(100),
  professionalTone: z.number().int().min(0).max(100),
  clarity: z.number().int().min(0).max(100),
  overallScore: z.number().int().min(0).max(100),
  strength: z.string().min(1),
  improvement: z.string().min(1),
  recommendedModuleSlug: z.string().min(1),
});

export type AssessmentResult = z.infer<typeof assessmentResultSchema>;

const visitorReplies: Record<string, readonly string[]> = {
  "course-registration-confusion": [
    "Terima kasih. Yang paling saya khawatirkan adalah batas waktu pendaftaran. Informasi mana yang sudah pasti?",
    "Baik. Jadi apa langkah pertama yang perlu saya lakukan, dan siapa yang bisa saya hubungi jika masih ada perbedaan informasi?",
    "Saya mengerti. Bisakah Anda merangkum dokumen dan langkah berikutnya agar saya tidak salah?",
    "Penjelasannya sekarang lebih jelas. Terima kasih sudah memisahkan informasi yang pasti dan yang masih perlu diperiksa.",
  ],
  "delf-registration-complaint": [
    "Saya perlu jawaban yang ringkas. Dokumen mana yang wajib dan mana yang hanya tambahan?",
    "Baik, lalu di mana saya bisa memeriksa versi persyaratan yang paling baru?",
    "Kalau ada perubahan lagi, siapa yang sebaiknya saya hubungi?",
    "Baik. Sekarang saya tahu apa yang perlu disiapkan terlebih dahulu.",
  ],
  "cultural-event-schedule-change": [
    "Saya menghargai penjelasannya. Apakah ada jadwal alternatif atau kegiatan serupa?",
    "Pilihan itu mungkin cocok. Bagaimana cara memastikan tempatnya masih tersedia?",
    "Apakah perubahan terbaru akan dikirimkan kepada peserta?",
    "Terima kasih. Saya akan memeriksa pilihan tersebut.",
  ],
  "mediatheque-membership-question": [
    "Baik, jadi layanan apa saja yang memang termasuk dalam keanggotaan saya?",
    "Kalau layanan ini tidak termasuk, pilihan terdekat yang tersedia apa?",
    "Apakah ada biaya atau persyaratan tambahan untuk pilihan itu?",
    "Jelas sekali. Terima kasih sudah menjelaskannya dengan sederhana.",
  ],
  "campus-france-information-confusion": [
    "Terima kasih. Saya ingin mulai dari dokumen yang paling mendesak terlebih dahulu.",
    "Bagaimana saya membedakan informasi resmi dengan saran umum yang saya temukan?",
    "Baik, siapa yang perlu saya hubungi untuk bagian yang masih harus diverifikasi?",
    "Sekarang urutannya jauh lebih mudah dipahami. Terima kasih.",
  ],
};

const fallbackReplies = [
  "Terima kasih. Bisa dijelaskan informasi mana yang sudah pasti dan apa langkah saya berikutnya?",
  "Baik. Siapa yang dapat saya hubungi jika saya masih membutuhkan konfirmasi?",
  "Bisakah Anda merangkum langkahnya secara singkat agar saya tidak salah?",
  "Saya mengerti sekarang. Terima kasih atas bantuannya.",
] as const;

export function generateVisitorReply(
  scenarioSlug: string,
  employeeTurn: number,
) {
  const replies = visitorReplies[scenarioSlug] ?? fallbackReplies;
  return replies[Math.min(Math.max(employeeTurn - 1, 0), replies.length - 1)];
}

export function assessTranscript(
  scenarioSlug: string,
  messages: TranscriptMessage[],
): AssessmentResult {
  const employeeMessages = messages.filter(
    (message) => message.role === "EMPLOYEE",
  );
  const text = employeeMessages.map((message) => message.content).join(" ");
  const normalized = text.toLowerCase();
  const words = normalized.split(/\s+/).filter(Boolean);
  const employeeTurns = employeeMessages.length;

  const communication = clamp(
    62 + Math.min(18, Math.floor(words.length / 10)) + employeeTurns * 2,
  );
  const empathy = clamp(
    60 +
      keywordScore(normalized, [
        "understand",
        "sorry",
        "appreciate",
        "concern",
        "mengerti",
        "memahami",
        "maaf",
        "khawatir",
      ]) *
        6,
  );
  const problemSolving = clamp(
    58 +
      keywordScore(normalized, [
        "next step",
        "confirm",
        "check",
        "verify",
        "contact",
        "langkah",
        "pastikan",
        "periksa",
        "hubungi",
      ]) *
        5 +
      employeeTurns * 2,
  );
  const professionalTone = clamp(
    68 +
      keywordScore(normalized, [
        "please",
        "thank",
        "help",
        "silakan",
        "terima kasih",
        "bantu",
      ]) *
        5,
  );
  const clarity = clamp(
    64 +
      keywordScore(normalized, [
        "first",
        "then",
        "finally",
        "pertama",
        "kemudian",
        "berikutnya",
        "ringkas",
      ]) *
        5 +
      (words.length >= 35 ? 6 : 0),
  );

  const scores = {
    communication,
    empathy,
    problemSolving,
    professionalTone,
    clarity,
  };
  const entries = Object.entries(scores) as Array<
    [keyof typeof scores, number]
  >;
  const strongest = entries.reduce((best, item) =>
    item[1] > best[1] ? item : best,
  );
  const weakest = entries.reduce((lowest, item) =>
    item[1] < lowest[1] ? item : lowest,
  );
  const labels: Record<keyof typeof scores, string> = {
    communication: "communication",
    empathy: "empathy",
    problemSolving: "problem solving",
    professionalTone: "professional tone",
    clarity: "clarity",
  };
  const overallScore = Math.round(
    entries.reduce((total, [, value]) => total + value, 0) / entries.length,
  );

  return assessmentResultSchema.parse({
    ...scores,
    overallScore,
    strength: `Your strongest area was ${labels[strongest[0]]}. The conversation remained focused on helping the visitor move forward.`,
    improvement: `Strengthen ${labels[weakest[0]]} by stating the confirmed next action, owner, and timing before closing the conversation.`,
    recommendedModuleSlug:
      scenarioSlug === "course-registration-confusion" ||
      weakest[0] === "problemSolving"
        ? "difficult-situations"
        : weakest[0] === "communication" || weakest[0] === "empathy"
          ? "communication-empathy"
          : "continuous-improvement",
  });
}

function keywordScore(text: string, keywords: string[]) {
  return keywords.filter((keyword) => text.includes(keyword)).length;
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}
