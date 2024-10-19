-- AlterTable
ALTER TABLE "Assistants" ADD COLUMN     "Status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "Type" TEXT NOT NULL DEFAULT 'support';
