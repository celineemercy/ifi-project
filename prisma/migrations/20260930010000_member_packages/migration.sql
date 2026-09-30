CREATE TABLE "LearningPackage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceIdr" INTEGER NOT NULL,
    "moduleIds" TEXT[],
    "features" TEXT[],
    "sortOrder" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LearningPackage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DemoPurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "confirmedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DemoPurchase_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "LearningPackage_slug_key" ON "LearningPackage"("slug");
CREATE UNIQUE INDEX "LearningPackage_sortOrder_key" ON "LearningPackage"("sortOrder");
CREATE UNIQUE INDEX "DemoPurchase_userId_packageId_key" ON "DemoPurchase"("userId", "packageId");
CREATE INDEX "DemoPurchase_userId_confirmedAt_idx" ON "DemoPurchase"("userId", "confirmedAt");

ALTER TABLE "DemoPurchase" ADD CONSTRAINT "DemoPurchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DemoPurchase" ADD CONSTRAINT "DemoPurchase_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "LearningPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
