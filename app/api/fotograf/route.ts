import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai"
import { v2 } from "@google-cloud/translate";

const translate = new v2.Translate({ projectId: 'fine-command-417618', keyFilename: 'service_account.json' });

const openai = new OpenAI ({
  apiKey: process.env.OPENAI_API_KEY
})


export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    // kullanici girisi var mi yok mu 
    if(!userId){
      return new NextResponse("Bulunamadı", { status: 401});
    }

    if (!openai.apiKey) {
      return  new NextResponse("OpenAi anahtarı doğrulanamadı", {status: 500});
    }

    if (!prompt){
      return new NextResponse("Prompt Gerekli!", { status: 400});
    }
    if (!amount){
      return new NextResponse("Sayı Gerekli!", { status: 400});
    }
    if (!resolution){
      return new NextResponse("Çözünürlük Gerekli!", { status: 400});
    }
    const [translations] = await translate.translate(prompt, 'en');
    const translatedPrompt = Array.isArray(translations) ? translations[0] : translations;

// openai image generator dall-e-3 
    const response = await openai.images.generate({
      model:"dall-e-2",
      prompt:translatedPrompt,
      n: parseInt(amount, 10),
      size: resolution
      });


return NextResponse.json(response.data);
  } 
  
  catch (error) {
    console.log("IMAGE_ERROR",error);
    return new NextResponse("Sistem Hatası", { status: 500});
  }
}