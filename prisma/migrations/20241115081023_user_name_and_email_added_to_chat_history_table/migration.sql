-- AlterTable
ALTER TABLE "langchain_chat_histories" ADD COLUMN     "userEmail" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "userName" TEXT NOT NULL DEFAULT 'Guest';
