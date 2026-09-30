import { resetDemoSeed } from "./seed";

export default function globalTeardown() {
  resetDemoSeed();
}
