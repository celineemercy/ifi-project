-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STAFF', 'MANAGER', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "ModuleStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "ServiceArea" AS ENUM ('COURSES', 'CULTURE', 'MEDIATHEQUE', 'CAMPUS_FRANCE', 'ADMINISTRATION');

-- CreateEnum
CREATE TYPE "ScenarioDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "SimulationStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "ConversationRole" AS ENUM ('VISITOR', 'EMPLOYEE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'STAFF',
    "department" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningModule" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "learningObjective" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "status" "ModuleStatus" NOT NULL DEFAULT 'DRAFT',
    "quiz" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "example" TEXT,
    "order" INTEGER NOT NULL,
    "durationMinutes" INTEGER NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModuleProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scenario" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "serviceArea" "ServiceArea" NOT NULL,
    "difficulty" "ScenarioDifficulty" NOT NULL,
    "description" TEXT NOT NULL,
    "customerPersonality" TEXT NOT NULL,
    "learningObjective" TEXT NOT NULL,
    "skills" TEXT[],
    "openingMessage" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimulationSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scenarioId" TEXT NOT NULL,
    "status" "SimulationStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "overallScore" INTEGER,

    CONSTRAINT "SimulationSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversationMessage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "role" "ConversationRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversationMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "communication" INTEGER NOT NULL,
    "empathy" INTEGER NOT NULL,
    "problemSolving" INTEGER NOT NULL,
    "professionalTone" INTEGER NOT NULL,
    "clarity" INTEGER NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "strength" TEXT NOT NULL,
    "improvement" TEXT NOT NULL,
    "recommendedModuleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_department_idx" ON "User"("department");

-- CreateIndex
CREATE UNIQUE INDEX "LearningModule_slug_key" ON "LearningModule"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LearningModule_order_key" ON "LearningModule"("order");

-- CreateIndex
CREATE INDEX "LearningModule_status_order_idx" ON "LearningModule"("status", "order");

-- CreateIndex
CREATE INDEX "Lesson_moduleId_idx" ON "Lesson"("moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_moduleId_order_key" ON "Lesson"("moduleId", "order");

-- CreateIndex
CREATE INDEX "ModuleProgress_userId_completed_idx" ON "ModuleProgress"("userId", "completed");

-- CreateIndex
CREATE INDEX "ModuleProgress_moduleId_completed_idx" ON "ModuleProgress"("moduleId", "completed");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleProgress_userId_moduleId_key" ON "ModuleProgress"("userId", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Scenario_slug_key" ON "Scenario"("slug");

-- CreateIndex
CREATE INDEX "Scenario_serviceArea_active_idx" ON "Scenario"("serviceArea", "active");

-- CreateIndex
CREATE INDEX "Scenario_difficulty_idx" ON "Scenario"("difficulty");

-- CreateIndex
CREATE INDEX "SimulationSession_userId_status_idx" ON "SimulationSession"("userId", "status");

-- CreateIndex
CREATE INDEX "SimulationSession_scenarioId_completedAt_idx" ON "SimulationSession"("scenarioId", "completedAt");

-- CreateIndex
CREATE INDEX "ConversationMessage_sessionId_idx" ON "ConversationMessage"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "ConversationMessage_sessionId_sequence_key" ON "ConversationMessage"("sessionId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "Assessment_sessionId_key" ON "Assessment"("sessionId");

-- CreateIndex
CREATE INDEX "Assessment_recommendedModuleId_idx" ON "Assessment"("recommendedModuleId");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "LearningModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleProgress" ADD CONSTRAINT "ModuleProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleProgress" ADD CONSTRAINT "ModuleProgress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "LearningModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimulationSession" ADD CONSTRAINT "SimulationSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimulationSession" ADD CONSTRAINT "SimulationSession_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationMessage" ADD CONSTRAINT "ConversationMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SimulationSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SimulationSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_recommendedModuleId_fkey" FOREIGN KEY ("recommendedModuleId") REFERENCES "LearningModule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
