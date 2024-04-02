import FileUpload from "@/components/FileUpload";
import Providers from "@/components/Provider";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowBigUp } from "lucide-react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <Providers>
    <div className="px-4 lg:px-16 flex justify-center items-center h-screen">
      <div className="shadow-md bg-white p-6 rounded-lg md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="text-center">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-4">
            Herhangi bir pdf ile sohbet et
          </h1>
          <div className="flex justify-center items-center mb-2">
          </div>
          <div className="flex justify-center items-center">
            {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button >
                    Sohbete Git
                  </Button>
                </Link>
                </>
            )}
            </div>
        </div>
        <p className="text-center max-w-md mx-auto mt-4">
          Yapay zeka ile pdfinize soru sorun, hızlı ve net cevaplar alın.
          Sunumlarınızı kolay ve etkili şekilde hazırlayın.
        </p>
        <div className="mt-6">
          <FileUpload />
        </div>
      </div>
      <Toaster/>
    </div>
    
    </Providers>
  );
}
