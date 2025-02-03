import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import { Document } from "langchain/document";

export const llm = new ChatGroq({
  model: "llama-3.1-8b-instant",
  temperature: 1,
  streaming: true,
});

export const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  `Given the question. Convert it to a standalone simple question 
  Question : {question}`
);

export const poolConfig = {
  host: process.env.PG_HOST,
  port: 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: "postgres",
};

export function getMatchingDoc(documents: Document[]): string {
  if (documents.length > 0) {
    return `${documents[0].pageContent} }`;
  } else return "";
}
