-- Add a distinct member role and keep staff training separate from member courses.
ALTER TYPE "UserRole" ADD VALUE 'MEMBER';

CREATE TYPE "ModuleAudience" AS ENUM ('STAFF', 'MEMBER');
ALTER TABLE "LearningModule" ADD COLUMN "audience" "ModuleAudience" NOT NULL DEFAULT 'STAFF';

DROP INDEX "LearningModule_order_key";
DROP INDEX "LearningModule_status_order_idx";
CREATE UNIQUE INDEX "LearningModule_audience_order_key" ON "LearningModule"("audience", "order");
CREATE INDEX "LearningModule_audience_status_order_idx" ON "LearningModule"("audience", "status", "order");
