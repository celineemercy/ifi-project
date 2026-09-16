import type { Metadata } from "next";

import { FeedbackFoundation } from "@/components/feedback/feedback-foundation";

export const metadata: Metadata = { title: "Share feedback" };

export default function FeedbackPage() {
  return <FeedbackFoundation />;
}
