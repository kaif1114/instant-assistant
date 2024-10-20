/*
  Warnings:

  - Added the required column `functionality` to the `Assistants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assistants" ADD COLUMN     "functionality" TEXT NOT NULL;
