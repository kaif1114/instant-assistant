/*
  Warnings:

  - A unique constraint covering the columns `[assistantId]` on the table `Assistants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assistantId` to the `Assistants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assistants" ADD COLUMN     "assistantId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Assistants_assistantId_key" ON "Assistants"("assistantId");
