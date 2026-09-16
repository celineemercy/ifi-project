import type { DefaultSession } from "next-auth";
import type { AppRole } from "@/config/demo-accounts";

declare module "next-auth" {
  interface User {
    role: AppRole;
    department: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: AppRole;
      department: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: AppRole;
    department: string | null;
  }
}
