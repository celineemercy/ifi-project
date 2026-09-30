// Invented prototype bundles and prices. These are not IFI offers or charges.
export const memberPackages = [
  {
    id: "demo-package-first-steps",
    slug: "first-steps",
    title: "French First Steps",
    description:
      "A gentle introduction to greetings and confident first conversations.",
    priceIdr: 79000,
    moduleIds: ["member-module-01"],
    features: [
      "1 self-paced course",
      "3 short lessons",
      "Knowledge-check quiz",
    ],
    sortOrder: 1,
    active: true,
  },
  {
    id: "demo-package-everyday",
    slug: "everyday-french",
    title: "Everyday French Bundle",
    description:
      "Build a foundation, then practise useful phrases for everyday plans.",
    priceIdr: 149000,
    moduleIds: ["member-module-01", "member-module-02"],
    features: [
      "2 self-paced courses",
      "6 short lessons",
      "Quizzes and progress tracking",
    ],
    sortOrder: 2,
    active: true,
  },
  {
    id: "demo-package-complete",
    slug: "french-discovery",
    title: "French Discovery Bundle",
    description:
      "Explore all current language and culture courses in the prototype.",
    priceIdr: 229000,
    moduleIds: ["member-module-01", "member-module-02", "member-module-03"],
    features: [
      "All 3 self-paced courses",
      "9 short lessons",
      "Quizzes and progress tracking",
    ],
    sortOrder: 3,
    active: true,
  },
] as const;
