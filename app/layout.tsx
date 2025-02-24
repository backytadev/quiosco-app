import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/themes/ThemeProvider";
import { TanstackProvider } from "@/components/providers/tanstack-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiosco Fresh Coffee - App",
  description: "Quiosco de comida rápida y postres + Punto de venta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/logo-light.svg"
        />
        <link rel="icon" type="image/sv" sizes="16x16" href="/logo-light.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <TanstackProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
