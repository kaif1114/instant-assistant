/*
  Warnings:

  - Added the required column `avatarUrl` to the `Assistants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assistants" ADD COLUMN     "avatarUrl" TEXT NOT NULL,
ADD COLUMN     "primaryColor" TEXT NOT NULL DEFAULT '#478ACD',
ADD COLUMN     "secondaryColor" TEXT NOT NULL DEFAULT '#0A0A15',
ADD COLUMN     "startingMessage" TEXT NOT NULL DEFAULT 'Hello! How may I help you?';
