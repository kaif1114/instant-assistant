import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

export const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-3-small",
});

export const pinecone = new PineconeClient();

export const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);
const asd = pineconeIndex.namespace("123");

export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,

  maxConcurrency: 5,
});

export const retriever = vectorStore.asRetriever({
  k: 1,
});
