"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const font = Montserrat({
  weight:"600",
  subsets:["latin"]
});

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  

  return(
    <nav className="pt-6 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center p-4">
        <div className="relative h-8 w-8 mr-4">
          <Image
          fill
          alt="logo"
          src={"/logo.svg"}
          />
        </div>
        <h1 className={cn("text=2xl font-bold text-white mt-1", font.className)}>
        Akıllı Sunum        
        </h1>
      </Link>
      <div className="flex pt-2 items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="default" className="rounded-full">
            Şimdi Başla
          </Button>
        </Link>
      </div>
    </nav>
  )
}