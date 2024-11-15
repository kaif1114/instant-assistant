/*
  Warnings:

  - You are about to drop the column `userEmail` on the `langchain_chat_histories` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `langchain_chat_histories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "langchain_chat_histories" DROP COLUMN "userEmail",
DROP COLUMN "userName";

-- CreateTable
CREATE TABLE "session_details" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,

    CONSTRAINT "session_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_details_session_id_key" ON "session_details"("session_id");

-- AddForeignKey
ALTER TABLE "langchain_chat_histories" ADD CONSTRAINT "langchain_chat_histories_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "session_details"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;
