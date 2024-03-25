import FileUpload from "@/components/FileUpload";
import Providers from "@/components/Provider";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <Providers>
    <div className="px-4 lg:px-16 flex justify-center items-center h-screen">
      <div className="shadow-md bg-white p-6 rounded-lg md:w-3/4 lg:w-2/3 xl:w-1/2">
        <div className="text-center">
          <h1 className="text-3xl lg:text-5xl font-semibold mb-4">
            Herhangi bir pdf ile sohbet et
          </h1>
          <div className="flex justify-center items-center mb-4">
          </div>
          <Button className="w-full md:w-auto">Sohbete Git</Button>
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
