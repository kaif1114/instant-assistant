-- AlterTable
ALTER TABLE "Assistants" ALTER COLUMN "secondaryColor" SET DEFAULT '#f2f2f2';

-- CreateTable
CREATE TABLE "PricingPlans" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "charactersLimit" INTEGER NOT NULL,
    "assistantsLimit" INTEGER NOT NULL,

    CONSTRAINT "PricingPlans_pkey" PRIMARY KEY ("id")
);
