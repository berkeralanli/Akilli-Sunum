'use client';
import React from 'react';
import TypewriterComponent from 'typewriter-effect';
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import Spline from "@splinetool/react-spline"; // Spline bileşenini import edin

// LandingHero bileşenini oluşturun
export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative">
      {/* 3D sahneyi ekleyin */}
      <div className="absolute inset-0 z-0">
        <Spline className='w-full h-full transparent'  scene='https://prod.spline.design/thTOcJ-TyxpeoWya/scene.splinecode'/>
      </div>

      {/* Metin içeriğini ekleyin */}
      <div className="text-white font-bold py-36 text-center space-y-5 relative z-10">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h1>Yapay zeka ile zenginleştirilmiş sunumlar</h1>
          <div className="p-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-800">
            {/* <TypewriterComponent
              options={{
                strings: [
                  "Sohbet",
                  "Fotoğraf Üretme",
                  "Gif Üretme",
                  "Müzik Üretme",
                  "Pdf ile Konuşma",
                ],
                autoStart: true,
                loop: true
              }}
            /> */}
          </div>
        </div>
        <div className="text-sm md:text-xl font-light text-zinc-500">Yapay Zeka kullanarak 10 kat daha hızlı içerik oluşturun</div>
        <div className='mt-4'>
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button variant={"default"} className='md:text-lg p-4 md:p-6 rounded-full font-semibold'>
              Ücretsiz Üretmeye Başlayın
              <ArrowRight className="w-5 h-5"/>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};


