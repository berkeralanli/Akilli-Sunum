import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { trTR } from "@clerk/localizations";
import { ClerkProvider } from '@clerk/nextjs'
import Providers from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Akıllı Sunum",
  description: "Yapay zeka ile zenginleştirilmiş, etkileyici sunumlar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={trTR}>
      <Providers>
   <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </Providers>
    </ClerkProvider>
  );
}
