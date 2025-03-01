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
  title: "Quiosco Fresh Coffee - Gestión Completa de Pedidos",
  description:
    "Sistema integral para negocios de comida rápida. Recibe pedidos, envíalos a cocina y gestiona su entrega desde un panel de comida terminada. Optimiza tu flujo de trabajo y mejora la experiencia del cliente.",
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
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/svg"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
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
