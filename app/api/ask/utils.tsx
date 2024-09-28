import { ChatGroq } from "@langchain/groq";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

export const llm = new ChatGroq({
  model: "llama-3.2-11b-text-preview",
  temperature: 1,
});

export const conversationTemplate = ChatPromptTemplate.fromMessages([
  ["system", "You are assistant"],
  ["human", "{input}"],
]);

export const promptWithChatHistory = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a friendly chat assistant. You chat with users and answer their question from your knowledge or provided chat history.",
  ],
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
]);

export const poolConfig = {
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "postgres",
};
