import Image from "next/image"

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center ">
      
      <div className="w-12 h-12 relative animate-spin">
        <Image 
        alt="logo"
        fill
        src="/logo.svg"
        />

      </div>
      <p className="text-sm text-mute">
      Hazır ol, senin için çalışmaya başladım bile! 🚀
      </p>
    </div>
  );
};