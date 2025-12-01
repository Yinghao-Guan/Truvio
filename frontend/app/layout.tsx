import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 👇 1. 引入组件
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Veru - AI Citation Auditor",
  description: "Detect AI hallucinations in academic citations instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* 👇 2. 放入组件 (通常放在 body 底部) */}
        <Analytics />
      </body>
    </html>
  );
}