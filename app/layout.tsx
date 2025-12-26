import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Simon Cheam - Full Stack Developer & Agentic Engineer",
  description:
    "Portfolio of Simon Cheam, showcasing full stack development and agentic engineering projects",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <Providers>
          <Navbar />
          <div className="max-w-6xl mx-auto px-4 w-full">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
