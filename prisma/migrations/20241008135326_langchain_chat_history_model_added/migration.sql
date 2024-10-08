-- CreateTable
CREATE TABLE "langchain_chat_histories" (
    "id" INTEGER NOT NULL,
    "session_id" TEXT NOT NULL,
    "message" JSONB NOT NULL,

    CONSTRAINT "langchain_chat_histories_pkey" PRIMARY KEY ("id")
);
