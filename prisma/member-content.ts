import { ModuleAudience, ModuleStatus } from "../src/generated/prisma/client";

// Original, source-informed prototype lessons. These are not official IFI materials.
export const memberModules = [
  {
    id: "member-module-01",
    slug: "french-first-steps",
    title: "French First Steps: Bonjour!",
    shortTitle: "French First Steps",
    description:
      "Start speaking with simple greetings, introductions, and polite phrases.",
    learningObjective:
      "Greet someone, introduce yourself, and choose a polite form of address in French.",
    order: 1,
    durationMinutes: 18,
    status: ModuleStatus.PUBLISHED,
    audience: ModuleAudience.MEMBER,
    quiz: [
      {
        id: "member-greetings-1",
        question: "Which phrase means 'Hello' in French?",
        options: ["Merci", "Bonjour", "Au revoir"],
        correctIndex: 1,
        explanation:
          "Bonjour is a greeting. Merci means thank you; au revoir means goodbye.",
      },
      {
        id: "member-greetings-2",
        question: "Which phrase politely introduces your name?",
        options: ["Je m'appelle Maya", "Je suis merci", "À bientôt Maya"],
        correctIndex: 0,
        explanation: "Je m'appelle means 'my name is'.",
      },
      {
        id: "member-greetings-3",
        question:
          "Which word is normally the polite 'you' for someone you do not know?",
        options: ["Tu", "Moi", "Vous"],
        correctIndex: 2,
        explanation:
          "Vous is the usual polite form in a first or formal interaction.",
      },
    ],
    lessons: [
      {
        id: "member-lesson-01-01",
        title: "Say bonjour",
        summary: "Open a conversation with confidence.",
        content:
          "Bonjour means hello or good day. In the evening, bonsoir is a common greeting. When leaving, say au revoir. A greeting is a small but important first step in a French conversation.",
        example:
          "Bonjour ! — Hello! | Bonsoir ! — Good evening! | Au revoir ! — Goodbye!",
        order: 1,
        durationMinutes: 6,
      },
      {
        id: "member-lesson-01-02",
        title: "Introduce yourself",
        summary: "Share your name and ask for someone else's.",
        content:
          "Use 'Je m'appelle…' to say your name. Ask 'Comment vous appelez-vous ?' in a polite conversation. You can answer with your own name, then say 'Enchanté(e)' to express that you are pleased to meet someone.",
        example:
          "Bonjour, je m'appelle Maya. Et vous ? — Hello, my name is Maya. And you?",
        order: 2,
        durationMinutes: 6,
      },
      {
        id: "member-lesson-01-03",
        title: "Be polite with vous",
        summary: "Choose an appropriate form of 'you'.",
        content:
          "French has two common forms for 'you': tu and vous. Vous is a safe, polite choice when meeting an adult for the first time. Tu is often used with friends, family, or people who invite you to use it.",
        example: "Comment allez-vous ? — How are you?",
        order: 3,
        durationMinutes: 6,
      },
    ],
  },
  {
    id: "member-module-02",
    slug: "french-in-everyday-life",
    title: "French in Everyday Life",
    shortTitle: "Everyday French",
    description:
      "Practise useful phrases for questions, directions, and everyday plans.",
    learningObjective:
      "Ask a simple question, request directions politely, and understand a basic time expression.",
    order: 2,
    durationMinutes: 21,
    status: ModuleStatus.PUBLISHED,
    audience: ModuleAudience.MEMBER,
    quiz: [
      {
        id: "member-everyday-1",
        question: "How can you politely ask where the library is?",
        options: [
          "Où est la bibliothèque, s'il vous plaît ?",
          "Je m'appelle bibliothèque",
          "Au revoir bibliothèque",
        ],
        correctIndex: 0,
        explanation:
          "Où est…? asks where something is; s'il vous plaît adds 'please'.",
      },
      {
        id: "member-everyday-2",
        question: "What does 'à gauche' mean?",
        options: ["Straight ahead", "On the left", "Tomorrow"],
        correctIndex: 1,
        explanation: "À gauche means on the left; à droite means on the right.",
      },
      {
        id: "member-everyday-3",
        question: "Which phrase means 'at three o'clock'?",
        options: ["Trois jours", "À trois heures", "Jeudi trois"],
        correctIndex: 1,
        explanation: "À trois heures means at three o'clock.",
      },
    ],
    lessons: [
      {
        id: "member-lesson-02-01",
        title: "Ask a question",
        summary: "Use a short, useful question pattern.",
        content:
          "Où est…? means 'Where is…?' and is helpful in unfamiliar places. Add s'il vous plaît to make the request polite. If you did not understand the answer, say 'Pouvez-vous répéter ?' to ask someone to repeat it.",
        example:
          "Où est la médiathèque, s'il vous plaît ? — Where is the media library, please?",
        order: 1,
        durationMinutes: 7,
      },
      {
        id: "member-lesson-02-02",
        title: "Follow directions",
        summary: "Recognize left, right, and straight ahead.",
        content:
          "Three useful direction phrases are à gauche (to the left), à droite (to the right), and tout droit (straight ahead). You do not need a long sentence to confirm what you heard: repeat the direction and say merci.",
        example:
          "Tout droit, puis à droite. — Straight ahead, then to the right.",
        order: 2,
        durationMinutes: 7,
      },
      {
        id: "member-lesson-02-03",
        title: "Talk about time",
        summary: "Make simple plans using à and heures.",
        content:
          "Use 'à' before a time: à deux heures means at two o'clock. The word demain means tomorrow and aujourd'hui means today. Combine them with a time when arranging a simple plan.",
        example:
          "À demain, à trois heures ! — See you tomorrow at three o'clock!",
        order: 3,
        durationMinutes: 7,
      },
    ],
  },
  {
    id: "member-module-03",
    slug: "explore-french-culture",
    title: "Explore French Culture",
    shortTitle: "French Culture",
    description:
      "Use language learning as a doorway to cultural events, films, and conversation.",
    learningObjective:
      "Describe an interest, invite someone to an activity, and respond respectfully to a different perspective.",
    order: 3,
    durationMinutes: 18,
    status: ModuleStatus.PUBLISHED,
    audience: ModuleAudience.MEMBER,
    quiz: [
      {
        id: "member-culture-1",
        question: "Which phrase means 'I like cinema'?",
        options: ["Je regarde demain", "J'aime le cinéma", "Où est cinéma ?"],
        correctIndex: 1,
        explanation: "J'aime means 'I like'.",
      },
      {
        id: "member-culture-2",
        question: "Which question invites someone to an exhibition?",
        options: [
          "Tu veux voir l'exposition ?",
          "Je m'appelle exposition",
          "Merci exposition",
        ],
        correctIndex: 0,
        explanation:
          "Tu veux voir…? asks 'Do you want to see…?' Use vous instead of tu when appropriate.",
      },
      {
        id: "member-culture-3",
        question:
          "What is a respectful response when someone has a different view of a film?",
        options: [
          "Stop the discussion",
          "Ask why they see it differently",
          "Assume they are wrong",
        ],
        correctIndex: 1,
        explanation:
          "Curious questions make cultural exchange more meaningful.",
      },
    ],
    lessons: [
      {
        id: "member-lesson-03-01",
        title: "Share an interest",
        summary: "Talk about something you enjoy.",
        content:
          "J'aime means 'I like'. Use it with a simple topic such as le cinéma (cinema), la musique (music), or la lecture (reading). You can ask 'Et vous ?' to keep the conversation going.",
        example: "J'aime le cinéma. Et vous ? — I like cinema. And you?",
        order: 1,
        durationMinutes: 6,
      },
      {
        id: "member-lesson-03-02",
        title: "Make an invitation",
        summary: "Invite someone to explore a cultural activity.",
        content:
          "Use 'Vous voulez voir…?' when politely inviting someone to see something. 'Une exposition' means an exhibition and 'un film' means a film. A short invitation is enough to begin a plan.",
        example:
          "Vous voulez voir l'exposition ? — Would you like to see the exhibition?",
        order: 2,
        durationMinutes: 6,
      },
      {
        id: "member-lesson-03-03",
        title: "Listen across cultures",
        summary: "Be curious when perspectives differ.",
        content:
          "A cultural conversation is not a test of who is right. Ask what someone noticed and explain your own impression with care. Phrases such as 'C'est intéressant' can acknowledge another perspective before you respond.",
        example: "C'est intéressant. Pourquoi ? — That's interesting. Why?",
        order: 3,
        durationMinutes: 6,
      },
    ],
  },
] as const;
