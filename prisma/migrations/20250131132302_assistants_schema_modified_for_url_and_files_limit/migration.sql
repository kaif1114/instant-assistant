-- AlterTable
ALTER TABLE "Assistants" ADD COLUMN     "fileLimitUsed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "urlLimitused" INTEGER NOT NULL DEFAULT 0;
