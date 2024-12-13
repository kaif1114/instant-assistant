-- AlterTable
ALTER TABLE "Assistants" ADD COLUMN     "charactersUsed" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "assistantsCreated" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "KnowledgeSource" (
    "id" SERIAL NOT NULL,
    "assistantId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "KnowledgeSource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KnowledgeSource" ADD CONSTRAINT "KnowledgeSource_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "Assistants"("assistantId") ON DELETE RESTRICT ON UPDATE CASCADE;
