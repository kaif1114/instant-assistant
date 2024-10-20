import { PostgresChatMessageHistory } from "@langchain/community/stores/message/postgres";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
  RunnableWithMessageHistory,
} from "@langchain/core/runnables";
import { NextRequest, NextResponse } from "next/server";
import pg from "pg";
import {
  getMatchingDoc,
  llm,
  poolConfig,
  standaloneQuestionPrompt,
} from "./utils";
import { embeddings, pineconeIndex } from "@/app/pinecone-config";
import { PineconeStore } from "@langchain/pinecone";
import { AskRequestSchema } from "@/app/schemas";
import prisma from "@/prisma/client";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

const pool = new pg.Pool(poolConfig);

const standaloneQuestionChain = RunnableSequence.from([
  standaloneQuestionPrompt,
  llm,
  new StringOutputParser(),
]);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = AskRequestSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const assistant = await prisma.assistants.findUnique({
    where: { assistantId: body.assistantId },
  });

  const promptWithChatHistory = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a friendly chat assistant. You chat with users and answer their questions from your knowledge, provided context and provided chat history, whatever is relevant to the question asked. Your details are provided below.
      Name: ${assistant?.name}
      Description: ${assistant?.description}
      Functionality: ${assistant?.functionality}
      Type: ${assistant?.Type}
      `,
    ],
    new MessagesPlaceholder("chat_history"),
    ["system", "{context}"],
    ["user", "{input}"],
  ]);
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

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: body.assistantId,
    maxConcurrency: 5,
  });

  const retriever = vectorStore.asRetriever({
    k: 1,
  });

  const retrieverChain = RunnableSequence.from([
    (prevResult) => prevResult.standalone_question,
    retriever,
    getMatchingDoc,
  ]);

  const mainChain = RunnableSequence.from([
    {
      standalone_question: standaloneQuestionChain,
      original_inputs: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      input: ({ original_inputs }) => original_inputs.question,
    },

    (values) => {
      return chainWithHistory.invoke(
        { input: values.input, context: values.context },
        { configurable: { sessionId: body.sessionId } }
      );
    },
  ]);

  try {
    const response = await mainChain.invoke({ question: body.question });
    return NextResponse.json({ message: response }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
