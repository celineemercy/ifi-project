import { PrismaPg } from "@prisma/adapter-pg";
import { config as loadEnv } from "dotenv";

import {
  ConversationRole,
  ModuleStatus,
  PrismaClient,
  ScenarioDifficulty,
  ServiceArea,
  SimulationStatus,
  UserRole,
} from "../src/generated/prisma/client";

const seedEnvFile = process.env.SEED_ENV_FILE;

if (seedEnvFile) loadEnv({ path: seedEnvFile, override: true });
loadEnv({ path: ".env.local" });
loadEnv();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed the prototype database.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const passwordHashes = {
  admin: "$2b$10$IxP4pkOsNeZk9tcPrYLueulfy9ZeQN//kpJU24UNCydkrqr1WjIrG",
  manager: "$2b$10$un8RS8VJRZTxRnRYGUb5xuSafWaeyZwrpH1t0b5L8FfsTeCcgEZea",
  staff: "$2b$10$n5NoKO1u8kw89sNaAnqqtuC5o0q.i6BGlEedrBGjP.Slnvm8Bqt5e",
} as const;

const users = [
  {
    id: "demo-admin",
    name: "IFI Savoir-Faire Admin",
    email: "admin@ifi.demo",
    role: UserRole.SUPER_ADMIN,
    department: null,
    passwordHash: passwordHashes.admin,
  },
  {
    id: "demo-manager",
    name: "IFI Learning Manager",
    email: "manager@ifi.demo",
    role: UserRole.MANAGER,
    department: null,
    passwordHash: passwordHashes.manager,
  },
  {
    id: "demo-staff",
    name: "Alex",
    email: "alex.staff@ifi.demo",
    role: UserRole.STAFF,
    department: "Courses",
    passwordHash: passwordHashes.staff,
  },
  {
    id: "staff-ayu",
    name: "Ayu Lestari",
    email: "ayu.lestari@ifi.demo",
    role: UserRole.STAFF,
    department: "Culture",
    passwordHash: passwordHashes.staff,
  },
  {
    id: "staff-bima",
    name: "Bima Prakoso",
    email: "bima.prakoso@ifi.demo",
    role: UserRole.STAFF,
    department: "Médiathèque",
    passwordHash: passwordHashes.staff,
  },
  {
    id: "staff-citra",
    name: "Citra Anggraeni",
    email: "citra.anggraeni@ifi.demo",
    role: UserRole.STAFF,
    department: "Campus France",
    passwordHash: passwordHashes.staff,
  },
  {
    id: "staff-dimas",
    name: "Dimas Saputra",
    email: "dimas.saputra@ifi.demo",
    role: UserRole.STAFF,
    department: "Administration",
    passwordHash: passwordHashes.staff,
  },
  {
    id: "staff-farah",
    name: "Farah Azzahra",
    email: "farah.azzahra@ifi.demo",
    role: UserRole.STAFF,
    department: "Courses",
    passwordHash: passwordHashes.staff,
  },
  {
    id: "staff-galih",
    name: "Galih Pranata",
    email: "galih.pranata@ifi.demo",
    role: UserRole.STAFF,
    department: "Culture",
    passwordHash: passwordHashes.staff,
  },
  {
    id: "staff-intan",
    name: "Intan Maharani",
    email: "intan.maharani@ifi.demo",
    role: UserRole.STAFF,
    department: "Médiathèque",
    passwordHash: passwordHashes.staff,
  },
  {
    id: "staff-kevin",
    name: "Kevin Wijaya",
    email: "kevin.wijaya@ifi.demo",
    role: UserRole.STAFF,
    department: "Campus France",
    passwordHash: passwordHashes.staff,
  },
  {
    id: "staff-larasati",
    name: "Larasati Putri",
    email: "larasati.putri@ifi.demo",
    role: UserRole.STAFF,
    department: "Administration",
    passwordHash: passwordHashes.staff,
  },
  {
    id: "staff-nadia",
    name: "Nadia Rahman",
    email: "nadia.rahman@ifi.demo",
    role: UserRole.STAFF,
    department: "Courses",
    passwordHash: passwordHashes.staff,
  },
  {
    id: "staff-rafi",
    name: "Rafi Nugroho",
    email: "rafi.nugroho@ifi.demo",
    role: UserRole.STAFF,
    department: "Culture",
    passwordHash: passwordHashes.staff,
  },
] as const;

const modules = [
  {
    id: "module-01",
    slug: "service-mindset",
    title: "The Savoir-Faire Service Mindset",
    shortTitle: "Service Mindset",
    description:
      "Build a welcoming, responsible service mindset for every visitor interaction.",
    learningObjective:
      "Recognize how preparation, ownership, and cultural openness shape a consistent visitor experience.",
    order: 1,
    durationMinutes: 18,
    status: ModuleStatus.PUBLISHED,
    quiz: [
      {
        id: "mindset-1",
        question:
          "What is the best first response when a visitor is unsure where to go?",
        options: [
          "Point toward another desk",
          "Acknowledge the visitor and help identify the right next step",
          "Ask them to return later",
        ],
        correctIndex: 1,
        explanation:
          "Taking ownership means helping the visitor reach a clear next step, even when another team will complete the request.",
      },
      {
        id: "mindset-2",
        question: "Which behavior best demonstrates service ownership?",
        options: [
          "Explaining why the issue belongs to another team",
          "Closing the conversation quickly",
          "Confirming who will help and what happens next",
        ],
        correctIndex: 2,
        explanation:
          "Ownership is visible when the visitor understands who will act and what to expect.",
      },
      {
        id: "mindset-3",
        question: "Why should staff adapt explanations to each visitor?",
        options: [
          "Visitors have different language, context, and familiarity",
          "Procedures should change for each visitor",
          "It makes every interaction longer",
        ],
        correctIndex: 0,
        explanation:
          "The procedure can remain consistent while the explanation is adapted for clarity and inclusion.",
      },
    ],
    lessons: [
      {
        id: "lesson-01-01",
        title: "A Welcoming First Moment",
        summary:
          "Create confidence in the first few seconds of an interaction.",
        content:
          "Pause, make attentive contact, and invite the visitor to explain their goal. A calm opening signals that the visitor has reached someone who is ready to help.",
        example: "Bonjour, welcome to IFI. How can I help you today?",
        order: 1,
        durationMinutes: 5,
      },
      {
        id: "lesson-01-02",
        title: "Own the Next Step",
        summary: "Guide the request even when another team must resolve it.",
        content:
          "Service ownership does not mean solving every issue alone. It means avoiding a dead end: identify the right contact, explain the handoff, and check that the visitor knows what to do next.",
        example:
          "Campus France can confirm that requirement. I will show you where to find the checklist and who to contact if anything remains unclear.",
        order: 2,
        durationMinutes: 6,
      },
      {
        id: "lesson-01-03",
        title: "Represent a Shared Mission",
        summary: "Connect daily service to cultural and educational exchange.",
        content:
          "IFI welcomes people across language learning, culture, education, and mobility services. Consistent care helps visitors feel invited into that wider exchange between Indonesia and France.",
        example:
          "Even a short direction or clarification can shape whether a visitor feels confident returning to IFI.",
        order: 3,
        durationMinutes: 7,
      },
    ],
  },
  {
    id: "module-02",
    slug: "touchpoint-mastery",
    title: "Mastering Every Touchpoint",
    shortTitle: "Touchpoint Mastery",
    description:
      "Coordinate a clear experience across courses, culture, the médiathèque, Campus France, and administration.",
    learningObjective:
      "Map a visitor request across service areas and deliver a reliable handoff without contradictory information.",
    order: 2,
    durationMinutes: 20,
    status: ModuleStatus.PUBLISHED,
    quiz: [
      {
        id: "touchpoint-1",
        question:
          "What should happen before transferring a visitor to another service area?",
        options: [
          "Confirm the request and explain the handoff",
          "End the interaction immediately",
          "Ask the visitor to search online",
        ],
        correctIndex: 0,
        explanation:
          "A short confirmation prevents visitors from repeating their story without context.",
      },
      {
        id: "touchpoint-2",
        question:
          "When two information sources conflict, what should staff do first?",
        options: [
          "Choose the most convenient answer",
          "Acknowledge the conflict and verify the current source",
          "Tell the visitor both answers are acceptable",
        ],
        correctIndex: 1,
        explanation:
          "Verification protects trust and avoids adding another unconfirmed answer.",
      },
      {
        id: "touchpoint-3",
        question: "A strong handoff ends with which detail?",
        options: [
          "An internal department code",
          "A clear owner and expected next action",
          "A promise that cannot be verified",
        ],
        correctIndex: 1,
        explanation:
          "Visitors need an understandable owner, action, and expectation.",
      },
    ],
    lessons: [
      {
        id: "lesson-02-01",
        title: "See the Whole Visitor Journey",
        summary: "Understand the request before choosing the service path.",
        content:
          "A visitor may move between courses, events, library services, mobility advice, and administration. Begin with their goal rather than the name of an internal department.",
        example:
          "Are you looking for language preparation, certification information, or guidance about studying in France?",
        order: 1,
        durationMinutes: 6,
      },
      {
        id: "lesson-02-02",
        title: "Make Reliable Handoffs",
        summary: "Transfer context, not just the visitor.",
        content:
          "Summarize the request, name the receiving service, and explain why that service is the right destination. When possible, point to the current official information source.",
        example:
          "You need confirmation about the study application checklist, so Campus France is the right team. Here is the current information page and their contact route.",
        order: 2,
        durationMinutes: 7,
      },
      {
        id: "lesson-02-03",
        title: "Close the Loop",
        summary: "Finish with a shared understanding of the next step.",
        content:
          "Before closing, invite one final question and ask the visitor to confirm the action they will take. This quickly reveals any remaining confusion.",
        example:
          "Before you go, could you tell me which form you will complete first? I want to make sure the next step is clear.",
        order: 3,
        durationMinutes: 7,
      },
    ],
  },
  {
    id: "module-03",
    slug: "communication-empathy",
    title: "Elegant Communication & Active Empathy",
    shortTitle: "Communication & Empathy",
    description:
      "Listen carefully, acknowledge the visitor's experience, and provide a clear next action.",
    learningObjective:
      "Use active listening and concise service language to turn confusion into a clear, respectful path forward.",
    order: 3,
    durationMinutes: 22,
    status: ModuleStatus.PUBLISHED,
    quiz: [
      {
        id: "empathy-1",
        question: "Which response best acknowledges a confused visitor?",
        options: [
          "That is our procedure.",
          "The information is already online.",
          "I understand why receiving two answers is confusing. Let me verify the current step with you.",
        ],
        correctIndex: 2,
        explanation:
          "The response recognizes the visitor's experience and immediately offers constructive help.",
      },
      {
        id: "empathy-2",
        question: "What should active listening produce before an explanation?",
        options: [
          "A summary of the visitor's actual concern",
          "A longer description of internal policy",
          "A transfer to another team",
        ],
        correctIndex: 0,
        explanation:
          "Summarizing the concern confirms understanding before staff propose a solution.",
      },
      {
        id: "empathy-3",
        question:
          "A clear closing should explain what will happen, who owns it, and...",
        options: [
          "why the visitor was mistaken",
          "what the visitor should do next",
          "every possible exception",
        ],
        correctIndex: 1,
        explanation:
          "A concrete visitor action completes the next-step structure.",
      },
    ],
    lessons: [
      {
        id: "lesson-03-01",
        title: "Listen Before Responding",
        summary: "Identify both the request and the concern behind it.",
        content:
          "Give the visitor space to finish, then summarize what you heard in one sentence. Check that the summary is correct before offering information. This reduces assumptions and repeated explanations.",
        example:
          "If I understand correctly, you received two different registration instructions and want to know which one is current. Is that right?",
        order: 1,
        durationMinutes: 7,
      },
      {
        id: "lesson-03-02",
        title: "Acknowledge the Visitor",
        summary: "Name the impact without making an unsupported promise.",
        content:
          "Empathy can be brief and specific. Acknowledge why the situation feels difficult, then connect that acknowledgement to the help you can provide.",
        example:
          "Instead of saying, 'That is our procedure,' say, 'I understand why that situation can be confusing. Let me help clarify the next step.'",
        order: 2,
        durationMinutes: 7,
      },
      {
        id: "lesson-03-03",
        title: "Provide a Clear Next Action",
        summary: "End with an owner, an action, and an expectation.",
        content:
          "Close the interaction by stating what will happen, who will handle it, and what the visitor should do next. Use short sentences and avoid internal terminology that the visitor may not know.",
        example:
          "I will verify the current registration notice with the courses team today. Please use the link I send you, and contact us again if you do not receive confirmation by tomorrow afternoon.",
        order: 3,
        durationMinutes: 8,
      },
    ],
  },
  {
    id: "module-04",
    slug: "difficult-situations",
    title: "Handling Difficult Situations with Grace",
    shortTitle: "Difficult Situations",
    description:
      "De-escalate frustration while protecting accuracy, boundaries, and professional tone.",
    learningObjective:
      "Apply a calm acknowledge-clarify-act structure when a visitor is disappointed, frustrated, or overwhelmed.",
    order: 4,
    durationMinutes: 24,
    status: ModuleStatus.PUBLISHED,
    quiz: [
      {
        id: "difficult-1",
        question:
          "What is the most useful first step when a visitor is visibly frustrated?",
        options: [
          "Correct every inaccurate detail",
          "Acknowledge the concern and lower the pace",
          "Promise the preferred outcome",
        ],
        correctIndex: 1,
        explanation:
          "Acknowledgement creates enough calm to clarify facts without making an unsupported promise.",
      },
      {
        id: "difficult-2",
        question:
          "What should staff do when the requested outcome is not available?",
        options: [
          "Explain the limit and offer the closest valid option",
          "Repeat the rule without context",
          "Avoid giving a definite answer",
        ],
        correctIndex: 0,
        explanation:
          "A transparent boundary plus a useful alternative maintains trust.",
      },
      {
        id: "difficult-3",
        question: "Which closing best reduces repeat frustration?",
        options: [
          "Everything is explained on the website",
          "There is nothing else we can do",
          "Here is the confirmed option, the deadline, and the contact if you need help",
        ],
        correctIndex: 2,
        explanation:
          "Specific next steps replace uncertainty with an actionable path.",
      },
    ],
    lessons: [
      {
        id: "lesson-04-01",
        title: "Lower the Temperature",
        summary: "Use calm pacing and specific acknowledgement.",
        content:
          "Do not compete with the visitor's emotional pace. Speak calmly, avoid interruption, and acknowledge the concrete source of frustration before investigating.",
        example:
          "I can hear that the schedule change disrupted your plan. Let me check the confirmed options with you.",
        order: 1,
        durationMinutes: 8,
      },
      {
        id: "lesson-04-02",
        title: "Clarify Facts and Boundaries",
        summary:
          "Separate what is known, what needs checking, and what cannot be promised.",
        content:
          "State confirmed facts in plain language. If something is uncertain, say how you will verify it. Never invent an exception simply to end a difficult conversation.",
        example:
          "The original session is no longer available. I can confirm the replacement date now, and I will check whether your reservation transfers automatically.",
        order: 2,
        durationMinutes: 8,
      },
      {
        id: "lesson-04-03",
        title: "Offer a Constructive Path",
        summary: "Present the closest valid solution and confirm acceptance.",
        content:
          "Offer one or two realistic options, explain their consequences, and ask which option best supports the visitor's goal. Record or communicate the agreed next step.",
        example:
          "You can keep your reservation for the new date or request help reviewing another event. Which option would be more useful for you?",
        order: 3,
        durationMinutes: 8,
      },
    ],
  },
  {
    id: "module-05",
    slug: "continuous-improvement",
    title: "Continuous Improvement & Team Synergy",
    shortTitle: "Continuous Improvement",
    description:
      "Turn practice feedback into small improvements shared across the service team.",
    learningObjective:
      "Reflect on service interactions, choose one observable improvement, and share useful learning without ranking employees.",
    order: 5,
    durationMinutes: 16,
    status: ModuleStatus.PUBLISHED,
    quiz: [
      {
        id: "improvement-1",
        question: "What makes a useful improvement goal?",
        options: [
          "It is specific and observable in the next interaction",
          "It describes a broad personality trait",
          "It compares one employee with another",
        ],
        correctIndex: 0,
        explanation:
          "An observable behavior can be practiced and reviewed without becoming a personal judgment.",
      },
      {
        id: "improvement-2",
        question: "How should simulation scores be used?",
        options: [
          "As formal performance ratings",
          "As learning signals that guide practice",
          "As a public employee ranking",
        ],
        correctIndex: 1,
        explanation:
          "Prototype scores support reflection and development, not employment evaluation.",
      },
      {
        id: "improvement-3",
        question: "What team practice improves consistency?",
        options: [
          "Keeping successful responses private",
          "Sharing confirmed answers and effective service phrases",
          "Letting every team use a different process",
        ],
        correctIndex: 1,
        explanation:
          "Shared, confirmed guidance helps visitors receive consistent information across touchpoints.",
      },
    ],
    lessons: [
      {
        id: "lesson-05-01",
        title: "Reflect on One Interaction",
        summary:
          "Use evidence from a specific moment instead of a general impression.",
        content:
          "Choose one interaction and identify what helped the visitor, where confusion remained, and what you would do differently next time.",
        example:
          "The visitor became calmer after I summarized the concern, but my closing did not include a deadline.",
        order: 1,
        durationMinutes: 5,
      },
      {
        id: "lesson-05-02",
        title: "Choose a Small Practice Goal",
        summary: "Turn feedback into one behavior you can repeat.",
        content:
          "A good goal is narrow enough to use in the next shift. Focus on a visible behavior such as summarizing the request or stating a confirmed next action.",
        example:
          "In my next three visitor conversations, I will close with the owner, action, and expected timing.",
        order: 2,
        durationMinutes: 5,
      },
      {
        id: "lesson-05-03",
        title: "Strengthen the Team",
        summary: "Share useful patterns without turning learning into ranking.",
        content:
          "Teams improve when confirmed information and effective service approaches are easy to share. Discuss patterns and training needs, not personal league tables.",
        example:
          "Our team is seeing repeated confusion about registration requirements, so we should align the explanation and reference link.",
        order: 3,
        durationMinutes: 6,
      },
    ],
  },
] as const;

const scenarios = [
  {
    id: "scenario-01",
    slug: "course-registration-confusion",
    title: "Course Registration Confusion",
    serviceArea: ServiceArea.COURSES,
    difficulty: ScenarioDifficulty.MEDIUM,
    description:
      "A student received different information from two staff members about course registration.",
    customerPersonality:
      "Polite but increasingly worried about missing the registration deadline.",
    learningObjective:
      "Acknowledge conflicting information, verify the current source, and provide a clear next action.",
    skills: ["Communication", "Empathy", "Problem Solving", "Clarity"],
    openingMessage:
      "Bonjour. Saya mendapat informasi yang berbeda mengenai pendaftaran kelas. Saya jadi bingung harus mengikuti informasi yang mana.",
    active: true,
  },
  {
    id: "scenario-02",
    slug: "delf-registration-complaint",
    title: "DELF Registration Complaint",
    serviceArea: ServiceArea.COURSES,
    difficulty: ScenarioDifficulty.HARD,
    description:
      "A participant is frustrated because the DELF registration requirements are not clear to them.",
    customerPersonality:
      "Direct and impatient after reading several different instructions.",
    learningObjective:
      "De-escalate frustration and explain confirmed requirements without overwhelming the participant.",
    skills: ["Communication", "Empathy", "Professional Tone", "Clarity"],
    openingMessage:
      "Saya sudah membaca informasinya beberapa kali, tetapi persyaratan pendaftaran DELF masih tidak jelas. Apa yang sebenarnya harus saya siapkan?",
    active: true,
  },
  {
    id: "scenario-03",
    slug: "cultural-event-schedule-change",
    title: "Cultural Event Schedule Change",
    serviceArea: ServiceArea.CULTURE,
    difficulty: ScenarioDifficulty.MEDIUM,
    description:
      "A visitor is disappointed because a cultural event schedule changed after they made plans to attend.",
    customerPersonality:
      "Disappointed and seeking a practical alternative, but open to help.",
    learningObjective:
      "Recognize the impact of the change, communicate confirmed options, and avoid unsupported promises.",
    skills: ["Empathy", "Problem Solving", "Professional Tone"],
    openingMessage:
      "Saya sudah mengatur jadwal untuk acara ini, lalu baru tahu waktunya berubah. Apakah ada pilihan lain untuk saya?",
    active: true,
  },
  {
    id: "scenario-04",
    slug: "mediatheque-membership-question",
    title: "Médiathèque Membership Question",
    serviceArea: ServiceArea.MEDIATHEQUE,
    difficulty: ScenarioDifficulty.EASY,
    description:
      "A visitor believes a particular service should be included in their médiathèque membership.",
    customerPersonality:
      "Curious and mildly disappointed, with limited familiarity with membership options.",
    learningObjective:
      "Clarify the membership scope in plain language and offer the closest available option.",
    skills: ["Communication", "Clarity", "Problem Solving"],
    openingMessage:
      "Saya kira layanan ini sudah termasuk dalam keanggotaan médiathèque saya. Bisa dibantu menjelaskan apa saja yang termasuk?",
    active: true,
  },
  {
    id: "scenario-05",
    slug: "campus-france-information-confusion",
    title: "Campus France Information Confusion",
    serviceArea: ServiceArea.CAMPUS_FRANCE,
    difficulty: ScenarioDifficulty.HARD,
    description:
      "A student feels overwhelmed after receiving conflicting information about study requirements.",
    customerPersonality:
      "Anxious, detail-focused, and afraid that one mistake will affect their study plan.",
    learningObjective:
      "Organize a complex question, distinguish confirmed information from items requiring verification, and reduce cognitive overload.",
    skills: ["Empathy", "Problem Solving", "Clarity", "Professional Tone"],
    openingMessage:
      "Saya menerima informasi yang berbeda tentang persyaratan studi di Prancis. Sekarang saya takut salah menyiapkan dokumen. Saya harus mulai dari mana?",
    active: true,
  },
] as const;

const progressByUser: Record<string, readonly number[]> = {
  "demo-staff": [100, 100, 40, 0, 100],
  "staff-ayu": [100, 100, 100, 60, 10],
  "staff-bima": [100, 100, 100, 100, 45],
  "staff-citra": [100, 100, 100, 50, 20],
  "staff-dimas": [100, 100, 75, 30, 0],
  "staff-farah": [100, 100, 100, 100, 65],
  "staff-galih": [100, 100, 100, 70, 35],
  "staff-intan": [100, 100, 100, 100, 80],
  "staff-kevin": [100, 100, 100, 40, 10],
  "staff-larasati": [100, 100, 100, 85, 45],
  "staff-nadia": [100, 100, 100, 55, 25],
  "staff-rafi": [100, 100, 100, 90, 60],
};

type SessionSeed = {
  id: string;
  userId: string;
  scenarioId: string;
  completedAt: string;
  communication: number;
  empathy: number;
  problemSolving: number;
  professionalTone: number;
  clarity: number;
  overallScore: number;
};

const sessions: SessionSeed[] = [
  {
    id: "session-01",
    userId: "demo-staff",
    scenarioId: "scenario-01",
    completedAt: "2026-09-15T09:20:00.000Z",
    communication: 88,
    empathy: 92,
    problemSolving: 76,
    professionalTone: 94,
    clarity: 83,
    overallScore: 87,
  },
  {
    id: "session-02",
    userId: "demo-staff",
    scenarioId: "scenario-03",
    completedAt: "2026-09-12T07:35:00.000Z",
    communication: 86,
    empathy: 90,
    problemSolving: 72,
    professionalTone: 88,
    clarity: 80,
    overallScore: 82,
  },
  {
    id: "session-03",
    userId: "demo-staff",
    scenarioId: "scenario-04",
    completedAt: "2026-09-08T10:10:00.000Z",
    communication: 87,
    empathy: 91,
    problemSolving: 74,
    professionalTone: 90,
    clarity: 82,
    overallScore: 84,
  },
  {
    id: "session-04",
    userId: "demo-staff",
    scenarioId: "scenario-05",
    completedAt: "2026-09-04T08:45:00.000Z",
    communication: 89,
    empathy: 89,
    problemSolving: 71,
    professionalTone: 89,
    clarity: 79,
    overallScore: 80,
  },
  {
    id: "session-05",
    userId: "demo-staff",
    scenarioId: "scenario-02",
    completedAt: "2026-08-30T06:30:00.000Z",
    communication: 90,
    empathy: 93,
    problemSolving: 75,
    professionalTone: 91,
    clarity: 84,
    overallScore: 85,
  },
  {
    id: "session-06",
    userId: "demo-staff",
    scenarioId: "scenario-01",
    completedAt: "2026-08-25T09:05:00.000Z",
    communication: 87,
    empathy: 90,
    problemSolving: 73,
    professionalTone: 88,
    clarity: 81,
    overallScore: 83,
  },
  {
    id: "session-07",
    userId: "demo-staff",
    scenarioId: "scenario-03",
    completedAt: "2026-08-20T11:40:00.000Z",
    communication: 89,
    empathy: 92,
    problemSolving: 77,
    professionalTone: 90,
    clarity: 85,
    overallScore: 87,
  },
  {
    id: "session-08",
    userId: "staff-ayu",
    scenarioId: "scenario-03",
    completedAt: "2026-09-14T05:15:00.000Z",
    communication: 86,
    empathy: 90,
    problemSolving: 79,
    professionalTone: 88,
    clarity: 84,
    overallScore: 86,
  },
  {
    id: "session-09",
    userId: "staff-ayu",
    scenarioId: "scenario-01",
    completedAt: "2026-09-05T04:50:00.000Z",
    communication: 82,
    empathy: 87,
    problemSolving: 75,
    professionalTone: 86,
    clarity: 80,
    overallScore: 82,
  },
  {
    id: "session-10",
    userId: "staff-bima",
    scenarioId: "scenario-04",
    completedAt: "2026-09-13T08:00:00.000Z",
    communication: 91,
    empathy: 89,
    problemSolving: 85,
    professionalTone: 92,
    clarity: 90,
    overallScore: 90,
  },
  {
    id: "session-11",
    userId: "staff-bima",
    scenarioId: "scenario-02",
    completedAt: "2026-09-02T07:10:00.000Z",
    communication: 84,
    empathy: 86,
    problemSolving: 78,
    professionalTone: 87,
    clarity: 82,
    overallScore: 84,
  },
  {
    id: "session-12",
    userId: "staff-citra",
    scenarioId: "scenario-05",
    completedAt: "2026-09-11T06:25:00.000Z",
    communication: 88,
    empathy: 94,
    problemSolving: 81,
    professionalTone: 91,
    clarity: 86,
    overallScore: 88,
  },
  {
    id: "session-13",
    userId: "staff-citra",
    scenarioId: "scenario-01",
    completedAt: "2026-08-29T09:55:00.000Z",
    communication: 83,
    empathy: 88,
    problemSolving: 76,
    professionalTone: 86,
    clarity: 81,
    overallScore: 83,
  },
  {
    id: "session-14",
    userId: "staff-dimas",
    scenarioId: "scenario-02",
    completedAt: "2026-09-10T03:40:00.000Z",
    communication: 79,
    empathy: 82,
    problemSolving: 72,
    professionalTone: 84,
    clarity: 77,
    overallScore: 79,
  },
  {
    id: "session-15",
    userId: "staff-farah",
    scenarioId: "scenario-01",
    completedAt: "2026-09-09T05:20:00.000Z",
    communication: 92,
    empathy: 93,
    problemSolving: 84,
    professionalTone: 94,
    clarity: 89,
    overallScore: 91,
  },
  {
    id: "session-16",
    userId: "staff-farah",
    scenarioId: "scenario-05",
    completedAt: "2026-08-27T08:35:00.000Z",
    communication: 89,
    empathy: 92,
    problemSolving: 82,
    professionalTone: 91,
    clarity: 87,
    overallScore: 89,
  },
  {
    id: "session-17",
    userId: "staff-galih",
    scenarioId: "scenario-03",
    completedAt: "2026-09-07T10:05:00.000Z",
    communication: 85,
    empathy: 90,
    problemSolving: 77,
    professionalTone: 88,
    clarity: 82,
    overallScore: 84,
  },
  {
    id: "session-18",
    userId: "staff-intan",
    scenarioId: "scenario-04",
    completedAt: "2026-09-06T06:45:00.000Z",
    communication: 90,
    empathy: 91,
    problemSolving: 86,
    professionalTone: 92,
    clarity: 91,
    overallScore: 90,
  },
  {
    id: "session-19",
    userId: "staff-kevin",
    scenarioId: "scenario-05",
    completedAt: "2026-09-03T04:30:00.000Z",
    communication: 84,
    empathy: 89,
    problemSolving: 75,
    professionalTone: 87,
    clarity: 80,
    overallScore: 83,
  },
  {
    id: "session-20",
    userId: "staff-larasati",
    scenarioId: "scenario-02",
    completedAt: "2026-09-01T07:50:00.000Z",
    communication: 82,
    empathy: 85,
    problemSolving: 73,
    professionalTone: 86,
    clarity: 79,
    overallScore: 81,
  },
];

async function resetPrototypeData() {
  await prisma.$transaction([
    prisma.assessment.deleteMany(),
    prisma.conversationMessage.deleteMany(),
    prisma.simulationSession.deleteMany(),
    prisma.moduleProgress.deleteMany(),
    prisma.lesson.deleteMany(),
    prisma.scenario.deleteMany(),
    prisma.learningModule.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}

async function seedUsers() {
  await prisma.user.createMany({ data: [...users] });
}

async function seedLearning() {
  for (const moduleSeed of modules) {
    const { lessons, ...learningModule } = moduleSeed;

    await prisma.learningModule.create({
      data: {
        ...learningModule,
        lessons: { create: [...lessons] },
      },
    });
  }

  const staffUsers = users.filter((user) => user.role === UserRole.STAFF);
  const progressRows = staffUsers.flatMap((user) =>
    modules.map((moduleSeed, index) => {
      const progress = progressByUser[user.id]?.[index] ?? 0;
      const completed = progress === 100;

      return {
        id: `progress-${user.id}-${moduleSeed.id}`,
        userId: user.id,
        moduleId: moduleSeed.id,
        progress,
        completed,
        startedAt: progress > 0 ? new Date("2026-08-01T02:00:00.000Z") : null,
        completedAt: completed
          ? new Date(
              `2026-08-${String(10 + index).padStart(2, "0")}T09:00:00.000Z`,
            )
          : null,
      };
    }),
  );

  await prisma.moduleProgress.createMany({ data: progressRows });
}

async function seedScenariosAndSessions() {
  await prisma.scenario.createMany({
    data: scenarios.map((scenario) => ({
      ...scenario,
      skills: [...scenario.skills],
    })),
  });

  const scenarioById = new Map<string, (typeof scenarios)[number]>(
    scenarios.map((scenario) => [scenario.id, scenario]),
  );

  for (const sessionSeed of sessions) {
    const scenario = scenarioById.get(sessionSeed.scenarioId);
    if (!scenario)
      throw new Error(`Unknown scenario: ${sessionSeed.scenarioId}`);

    const completedAt = new Date(sessionSeed.completedAt);
    const startedAt = new Date(completedAt.getTime() - 12 * 60 * 1000);
    const recommendedModuleId =
      sessionSeed.problemSolving < 80 ? "module-04" : "module-05";

    await prisma.simulationSession.create({
      data: {
        id: sessionSeed.id,
        userId: sessionSeed.userId,
        scenarioId: sessionSeed.scenarioId,
        status: SimulationStatus.COMPLETED,
        startedAt,
        completedAt,
        overallScore: sessionSeed.overallScore,
        messages: {
          create: [
            {
              sequence: 1,
              role: ConversationRole.VISITOR,
              content: scenario.openingMessage,
              createdAt: startedAt,
            },
            {
              sequence: 2,
              role: ConversationRole.EMPLOYEE,
              content:
                "Thank you for explaining the situation. I understand why that feels confusing. Let me confirm the current information and give you a clear next step.",
              createdAt: new Date(startedAt.getTime() + 2 * 60 * 1000),
            },
            {
              sequence: 3,
              role: ConversationRole.VISITOR,
              content:
                "Terima kasih. Saya terutama ingin memastikan apa yang harus saya lakukan sekarang.",
              createdAt: new Date(startedAt.getTime() + 5 * 60 * 1000),
            },
            {
              sequence: 4,
              role: ConversationRole.EMPLOYEE,
              content:
                "I will separate what is confirmed from what needs verification, then show you who will handle it and what you should do next.",
              createdAt: new Date(startedAt.getTime() + 8 * 60 * 1000),
            },
          ],
        },
        assessment: {
          create: {
            communication: sessionSeed.communication,
            empathy: sessionSeed.empathy,
            problemSolving: sessionSeed.problemSolving,
            professionalTone: sessionSeed.professionalTone,
            clarity: sessionSeed.clarity,
            overallScore: sessionSeed.overallScore,
            strength:
              "The response acknowledged the visitor's concern and maintained a calm, professional tone.",
            improvement:
              sessionSeed.problemSolving < 80
                ? "State the confirmed next action, owner, and timing more precisely."
                : "Confirm the visitor's understanding before closing the interaction.",
            recommendedModuleId,
          },
        },
      },
    });
  }
}

async function verifySeed() {
  const [
    userCount,
    staffCount,
    moduleCount,
    lessonCount,
    scenarioCount,
    activeScenarioCount,
    sessionCount,
    messageCount,
    assessmentCount,
    completedModules,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: UserRole.STAFF } }),
    prisma.learningModule.count(),
    prisma.lesson.count(),
    prisma.scenario.count(),
    prisma.scenario.count({ where: { active: true } }),
    prisma.simulationSession.count({
      where: { status: SimulationStatus.COMPLETED },
    }),
    prisma.conversationMessage.count(),
    prisma.assessment.count(),
    prisma.moduleProgress.count({ where: { completed: true } }),
  ]);

  const alex = await prisma.user.findUniqueOrThrow({
    where: { email: "alex.staff@ifi.demo" },
    include: {
      moduleProgress: true,
      simulationSessions: {
        where: { status: SimulationStatus.COMPLETED },
        include: { assessment: true },
      },
    },
  });

  const alexProgress = Math.round(
    alex.moduleProgress.reduce((total, item) => total + item.progress, 0) /
      alex.moduleProgress.length,
  );
  const alexCompletedModules = alex.moduleProgress.filter(
    (item) => item.completed,
  ).length;
  const alexAverageScore = Math.round(
    alex.simulationSessions.reduce(
      (total, session) => total + (session.assessment?.overallScore ?? 0),
      0,
    ) / alex.simulationSessions.length,
  );

  const expected = {
    userCount: 14,
    staffCount: 12,
    moduleCount: 5,
    lessonCount: 15,
    scenarioCount: 5,
    activeScenarioCount: 5,
    sessionCount: 20,
    messageCount: 80,
    assessmentCount: 20,
    completedModules: 38,
    alexProgress: 68,
    alexCompletedModules: 3,
    alexSessions: 7,
    alexAverageScore: 84,
  };
  const actual = {
    userCount,
    staffCount,
    moduleCount,
    lessonCount,
    scenarioCount,
    activeScenarioCount,
    sessionCount,
    messageCount,
    assessmentCount,
    completedModules,
    alexProgress,
    alexCompletedModules,
    alexSessions: alex.simulationSessions.length,
    alexAverageScore,
  };

  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `Seed verification failed. Expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}.`,
    );
  }

  console.info("IFI Savoir-Faire Hub prototype data seeded and verified:");
  console.info(actual);
}

async function main() {
  if (process.argv.includes("--if-empty")) {
    const counts = await Promise.all([
      prisma.user.count(),
      prisma.learningModule.count(),
      prisma.scenario.count(),
    ]);
    if (counts.some((count) => count > 0)) {
      console.info("Existing data found; skipping demo seed.");
      return;
    }
  }

  await resetPrototypeData();
  await seedUsers();
  await seedLearning();
  await seedScenariosAndSessions();
  await verifySeed();
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
