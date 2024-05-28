import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import data from "./data.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: data.name,
  description: data.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-stone-950 text-gold dark:text-gold-light">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
