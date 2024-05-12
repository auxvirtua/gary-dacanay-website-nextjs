import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gary Dacanay",
  description: "Playing Jazz Standards from The Great American Songbook at your private corporate events, weddings, dinners and parties in Northeast Ohio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-stone-950 dark:text-gold-light text-gold">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
