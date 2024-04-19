'use client'
import { DrizzleChat } from '@/lib/db/schema';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { LayoutDashboard, MessageCircle, PlusCircle, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};


const routes =[
  {
    label: "Anasayfa",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500"
  },
];

function ChatSideBar({chats, chatId}: Props) {
  const pathname = usePathname();

  const handleDeleteChat = async (chatId: number) => {
    try {
      await fetch('/api/delete-chat', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId }),
      });
    } catch (error) {
      console.error('Chat silinirken bir hata oluştu:', error);
    }
  };
  return (
    <div className='relative'>
      <div className='w-full h-screen p-4 text-gray-200 bg-gray-900'>
        <Link href='/pdfilekonus'>
          <Button className='w-full border-dashed border-white border'>
            <PlusCircle className='mr-2 w-4 h-4'/>
            Yeni Sohbet
          </Button>
        </Link>
  
        <div className="flex max-h-screen overflow-scroll pb-20 flex-col gap-2 mt-4">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`} className='relative'>
              <div
                className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                  "bg-purple-600 text-white": chat.id === chatId,
                  "hover:text-white": chat.id !== chatId,
                })}
              >
                <MessageCircle className="mr-2" />
                <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                  {chat.pdfName}
                </p>
                <div className="pr-1 pl-1 hover:bg-rose-600 rounded">
                  <Button onClick={()=> handleDeleteChat(chat.id)} className='relative bg-transparent hover:bg-transparent mt-2 p-0 h-4 w-4  '>
                    <Trash />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='flex justify-center absolute bottom-4 w-full'>
        <div className='flex items-center text-sm text-slate-500'>
          <div>
            {routes.map((route)=> (
              <Link 
                href={route.href}
                key={route.href}
                className={cn("text-base flex p-2 w-full cursor-pointer hover:text-white hover:bg-white/10 rounded-lg",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                )}
              >
                <div className="flex items-center justify-center">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
