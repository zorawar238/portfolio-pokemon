import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nishant Kumar — Web Developer & UI/UX Designer",
  description: "Interactive developer portfolio of Nishant Kumar, focusing on modern web experiences, UI/UX, and Agentic AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} antialiased scroll-smooth`}>
      <body className="h-screen w-screen overflow-hidden flex flex-col relative selection:bg-primary selection:text-white bg-background">
        <Navigation />
        <main className="flex-1 w-full h-full relative">
          {children}
        </main>
      </body>
    </html>
  );
}
