"use client";

import { cn } from "@/lib/utils";
import { ImageIcon, LayoutDashboard, MessageSquare, Music2Icon, PaperclipIcon, Settings, VideoIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


const montserrat = Montserrat({
  weight:"600",
  subsets: ["latin"]
});

// Side bar Routes and links

const routes =[
  {
    label: "Anasayfa",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Konuşma",
    icon: MessageSquare,
    href: "/konusma",
    color: "text-purple-500",
  },
  {
    label: "Fotoğraf",
    icon: ImageIcon,
    href: "/fotograf",
    color: "text-pink-700",
  },
  {
    label: "Gif",
    icon: VideoIcon,
    href: "/gif",
    color: "text-orange-700",
  },
  {
    label: "Müzik",
    icon: Music2Icon,
    href: "/muzik",
    color: "text-green-700",
  },
  {
    label: "PDF ile Konuş",
    icon: PaperclipIcon,
    href: "/pdfilekonus",
    color: "text-yellow-500",
  },
  {
    label: "Ayarlar",
    icon: Settings,
    href: "/ayarlar",
  },
];

const Sidebar = () => {
 const pathname = usePathname();
  return (
    
      <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white"> 
      <div className="px-3 py-2 flext-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-10 h-10 mr-4">
            <Image
            fill
            alt="Logo"
            src="/logo.svg"/>
          </div>
          <h1 className={cn ("text-2xl font-bold", montserrat.className)}>
            Akıllı Sunum
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route)=> (
            <Link 
            href={route.href}
            key={route.href}
            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg",
            pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
            )}>
           

              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>
  )
}
export default Sidebar;