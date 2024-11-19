/*
  Warnings:

  - A unique constraint covering the columns `[assistantId]` on the table `session_details` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assistantId` to the `session_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session_details" ADD COLUMN     "assistantId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "session_details_assistantId_key" ON "session_details"("assistantId");

-- AddForeignKey
ALTER TABLE "session_details" ADD CONSTRAINT "session_details_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "Assistants"("assistantId") ON DELETE RESTRICT ON UPDATE CASCADE;
