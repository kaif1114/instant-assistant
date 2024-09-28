import { PostgresChatMessageHistory } from "@langchain/community/stores/message/postgres";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { NextRequest, NextResponse } from "next/server";
import pg from "pg";
import { llm, poolConfig, promptWithChatHistory } from "./utils";

const pool = new pg.Pool(poolConfig);

const chain = promptWithChatHistory.pipe(llm).pipe(new StringOutputParser());

const chainWithHistory = new RunnableWithMessageHistory({
  runnable: chain,
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
  getMessageHistory: async (sessionId) => {
    const chatHistory = new PostgresChatMessageHistory({
      sessionId,
      pool,
    });
    return chatHistory;
  },
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  // const mainChain = conversationTemplate
  //   .pipe(llm)
  //   .pipe(new StringOutputParser());

  if (body.question) {
    try {
      const response = await chainWithHistory.invoke(
        { input: body.question },
        { configurable: { sessionId: 123 } }
      );

      return NextResponse.json({ response }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }
}
