import Image from "next/image"

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center ">
      
      <div className="w-12 h-12 relative animate-spin">
        <Image 
        alt="logo"
        fill
        src="/logo2.png"
        style={{color: "red"}}
        />

      </div>
      <p className="text-sm text-mute">
        Akıllı-Sunum düşünüyor...
      </p>
    </div>
  );
};