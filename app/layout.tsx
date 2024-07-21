import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Sistema de Facturación',
  description: 'Sisfact by Sebastián López',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      {/* <body className={inter.className}> */}
      <body className="h-full">
        <Providers>{children}</Providers>        
      </body>
    </html>
  );
}
