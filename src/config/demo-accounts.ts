export type AppRole = "SUPER_ADMIN" | "MANAGER" | "STAFF";

export type DemoAccount = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  department: string | null;
  passwordHash: string;
};

export const demoAccounts: DemoAccount[] = [
  {
    id: "demo-admin",
    name: "IFI Savoir-Faire Admin",
    email: "admin@ifi.demo",
    role: "SUPER_ADMIN",
    department: null,
    passwordHash:
      "$2b$10$IxP4pkOsNeZk9tcPrYLueulfy9ZeQN//kpJU24UNCydkrqr1WjIrG",
  },
  {
    id: "demo-manager",
    name: "IFI Learning Manager",
    email: "manager@ifi.demo",
    role: "MANAGER",
    department: null,
    passwordHash:
      "$2b$10$un8RS8VJRZTxRnRYGUb5xuSafWaeyZwrpH1t0b5L8FfsTeCcgEZea",
  },
  {
    id: "demo-staff",
    name: "Alex",
    email: "alex.staff@ifi.demo",
    role: "STAFF",
    department: "Courses",
    passwordHash:
      "$2b$10$n5NoKO1u8kw89sNaAnqqtuC5o0q.i6BGlEedrBGjP.Slnvm8Bqt5e",
  },
];

export const demoPassword = "demo123";
