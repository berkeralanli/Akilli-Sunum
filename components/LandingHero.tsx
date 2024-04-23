'use client';
import React from 'react';
import TypewriterComponent from 'typewriter-effect';
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import Spline from "@splinetool/react-spline";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D görsel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Spline className="h-full w-full" scene="https://prod.spline.design/17zxtAjpSVCzymzp/scene.splinecode" />
      </div>
      {/* Metin içeriği */}
      <div className="absolute z-10 flex flex-col justify-center items-center p-10 md:p-20 text-white">
        <div className="text-center space-y-4">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
            <h1>Yapay zeka ile zenginleştirilmiş sunumlar</h1>
            <div className="p-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-800">
            <TypewriterComponent 
                options={{
                  strings: [
                    "Sohbet Et",
                    "Fotoğraf Üret",
                    "Gif Üret",
                    "Müzik Üret",
                    "Pdf'e Soru Sor",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
          <div className="text-sm md:text-xl font-light pt-2 text-zinc-500">Yapay Zeka kullanarak 10 kat daha hızlı içerik oluşturun</div>
          <div className='pt-4'>
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button variant={"default"} className='md:text-lg p-4 md:p-6 rounded-full font-semibold'>
                Ücretsiz Üretmeye Başlayın
                <ArrowRight className="w-5 h-5"/>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
