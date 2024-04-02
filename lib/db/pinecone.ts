import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "../s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter";
import md5 from 'md5';
import { getEmbeddings } from "./embedding";
import { convertToAscii } from "./utils";


export const getPineconeClient = () => {
  return new Pinecone({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string){
  // 1. pdf i indirip okunabilir hale getiriyoruz.
  
  console.log("s3 sisteme indiriliyor")
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("S3 den indirilemedi");
  }
  const loader = new PDFLoader(file_name);
  const pages =  (await loader.load()) as PDFPage[];

  // 2. pdf i sayfa ve segmentlerine ayiriyoruz.

  const documents = await Promise.all(pages.map(page=>prepareDocument(page)))

  //  3. vektor haline getirip dokumanlari gomuyoruz

  const vectors = await Promise.all(documents.flat().map(embedDocument));
  // 4. Pinecone a upload ediyoruz 

  const client = await getPineconeClient();
  const pineconeIndex = await client.index("chatpdf");
  const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

  console.log("inserting vectors into pinecone");
  await namespace.upsert(vectors);

  return documents[0];

}

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}
export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage){
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
   // split the docs
   const splitter = new RecursiveCharacterTextSplitter();
   const docs = await splitter.splitDocuments([
     new Document({
       pageContent,
       metadata: {
         pageNumber: metadata.loc.pageNumber,
         text: truncateStringByBytes(pageContent, 36000),
       },
     }),
   ]);
   return docs;
}