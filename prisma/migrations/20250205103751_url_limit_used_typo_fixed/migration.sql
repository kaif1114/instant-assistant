/*
  Warnings:

  - You are about to drop the column `urlLimitused` on the `Assistants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Assistants" DROP COLUMN "urlLimitused",
ADD COLUMN     "urlLimitUsed" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "primaryColor" SET DEFAULT '#000000';
