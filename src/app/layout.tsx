import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import AudioWrapper from "@/components/AudioWrapper";

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

const TITLE = "Nishant Kumar — Web Developer & UI/UX Designer";
const DESCRIPTION = "Interactive developer portfolio of Nishant Kumar, focusing on modern web experiences, UI/UX, and Agentic AI.";

export const metadata: Metadata = {
  // TODO: set metadataBase to the real deployed URL once this is live (e.g. new URL('https://yourdomain.com'))
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: ["/assets/world_map_bg.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/world_map_bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} antialiased scroll-smooth`}>
      <body className="h-screen w-screen overflow-hidden flex flex-col relative selection:bg-primary selection:text-white bg-background">
        <AudioWrapper>
          <Navigation />
          <main className="flex-1 w-full h-full relative">
            {children}
          </main>
        </AudioWrapper>
      </body>
    </html>
  );
}
