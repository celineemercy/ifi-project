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
    name: "IFI Pulse Admin",
    email: "admin@ifi-pulse.demo",
    role: "SUPER_ADMIN",
    department: null,
    passwordHash:
      "$2b$10$llgqzaFC9DvHweQE32577eVDHHqpoVN2fJRBoa/ocwYFU9lsgHKlG",
  },
  {
    id: "demo-manager",
    name: "IFI Service Manager",
    email: "manager@ifi-pulse.demo",
    role: "MANAGER",
    department: null,
    passwordHash:
      "$2b$10$oKyaLOxEZtlxhs1wJ3C15eRNYAtyZekNO7zjeiIT3F/wiUL9Fb3Pa",
  },
  {
    id: "demo-staff",
    name: "IFI Courses Staff",
    email: "staff@ifi-pulse.demo",
    role: "STAFF",
    department: "Courses",
    passwordHash:
      "$2b$10$QLEFQ.0f6YYl2Wgl0jYNQ.bogCxf6MlgQ6hvddEhEUEb0ZpeFfGEi",
  },
];

export const demoPassword = "PulseDemo2026!";
