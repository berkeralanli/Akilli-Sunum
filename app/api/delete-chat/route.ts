import { auth } from "@clerk/nextjs";
import { chats } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const baseUrl = "http://localhost:3000/";

export const DELETE = async (req: Request) => {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const { chatId } = await req.json();

    // Belirli bir sohbete ait tüm mesajları silen API'yi çağır
    const response = await fetch(`${baseUrl}/api/delete-messages`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId }),
    });

    // Auth işlemi başarısız olduğunda (401 hatası döndüğünde) işlemi durdur
    if (!response.ok) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    // Sohbeti veritabanından sil
    await db.delete(chats).where(eq(chats.id, chatId)).returning();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
};
