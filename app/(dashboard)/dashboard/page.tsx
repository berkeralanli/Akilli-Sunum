"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, ImageIcon, MessageSquare, Music2Icon, PaperclipIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Konuşma",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor:"bg-violet-500/10",
    href: "/konusma"
  },
  {
    label: "Fotoğraf",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor:"bg-pink-500/10",
    href: "/fotograf"
  },
  {
    label: "Gif",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor:"bg-orange-500/10",
    href: "/gif"
  },
  {
    label: "Müzik",
    icon: Music2Icon,
    color: "text-green-700",
    bgColor:"bg-green-500/10",
    href: "/muzik"
  },
  {
    label: "PDF ile Konuş",
    icon: PaperclipIcon,
    color: "text-yellow-500",
    bgColor:"bg-yellow-500/10",
    href: "/pdfilekonus"
  }
]

const DashboardPage = () => {
  const router = useRouter();
return (
  <div>
    <div className="mb-8 space-y-4">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h2 className="text-2xl md:text-4xl font-bold text-center">
      Yapay zeka ile zenginleştirilmiş, etkileyici sunumlar.
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
        Yapay Zeka desteğiyle sunumlarınızı bir üst seviyeye taşıyın
        </p>
        </div>  
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tools.map((tool) => (
            <Card  
            onClick={()=>router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />

                </div>
                <div className="font-semibold"
                >
                  {tool.label}
                </div>

              </div>
              <ArrowRight className="w-5 h-5"/>
            </Card>
          )
          )}

        </div>
  </div>
  );
}
export default DashboardPage;