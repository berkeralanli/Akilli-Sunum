import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { v2 } from "@google-cloud/translate";

const translate = new v2.Translate({ projectId: 'fine-command-417618', keyFilename: 'service_account.json' });

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!
});


export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;
  

    // kullanici girisi var mi yok mu 
    if(!userId){
      return new NextResponse("Bulunamadı", { status: 401});
    }

    if (!prompt){
      return new NextResponse("Prompt Gerekli!", { status: 400});
    }

    const [translations] = await translate.translate(prompt, 'en');
    const translatedPrompt = Array.isArray(translations) ? translations[0] : translations;
    

    
    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          fps: 24,
          model: "xl",
          width: 1024,
          height: 576,
          prompt: translatedPrompt,
          batch_size: 1,
          num_frames: 24,
          init_weight: 0.5,
          guidance_scale: 17.5,
          num_inference_steps: 50
        }
      }
    );
return NextResponse.json(response);
  } 
  catch (error) {
    console.log("GIF_ERROR",error);
    return new NextResponse("Sistem Hatası", { status: 500});
  }
}