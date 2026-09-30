import { execFileSync } from "node:child_process";

export function resetDemoSeed() {
  execFileSync(process.execPath, ["--import", "tsx", "prisma/seed.ts"], {
    cwd: process.cwd(),
    stdio: "inherit",
  });
}
