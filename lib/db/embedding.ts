import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    // Türkçe karakterleri işlemek için metni Unicode karakter kodlamasına dönüştür
    const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Dönüştürülen metni kullanarak gömme vektörlerini oluştur
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: normalizedText.replace(/\n/g, " "),
    });

    const result = await response.json();
    return result.data[0].embedding as number[];
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}
