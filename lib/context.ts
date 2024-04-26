// @ts-ignore
import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./db/utils";
import { getEmbeddings } from "./db/embedding";
import { match } from "assert";

export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string){
  try {
    const client = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    const pineconeIndex = await client.index("chatpdf");
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
    const queryResult = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (error) {
    console.log("error querying embeddings", error);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string){
  const queryEmbeddings = await getEmbeddings(query)
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey)

  const qualifyingDocs = matches.filter((match) => match.score && match.score > 0.7);
  
  type Metadata = {
    text: string,
    pageNumber: Number
  }

  let docs = qualifyingDocs.map((match) => (match.metadata as unknown as Metadata).text);
  // 5 vectors
  return docs.join("\n").substring(0, 3000);
}