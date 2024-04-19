import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

export const DELETE = async (req: Request) => {
  const { chatId } = await req.json();

  try {
    // Belirli bir sohbete ait tüm mesajları sil
    await db.delete(messages)
      .where(eq(messages.chatId, chatId))
      .execute();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
};
