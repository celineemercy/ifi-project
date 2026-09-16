import { FeedbackFoundation } from "@/components/feedback/feedback-foundation";

export default async function TouchpointFeedbackPage({
  params,
}: {
  params: Promise<{ touchpoint: string }>;
}) {
  const { touchpoint } = await params;
  return <FeedbackFoundation touchpoint={touchpoint} />;
}
