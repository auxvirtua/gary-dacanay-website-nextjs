import type { Metadata } from "next";
import { Bebas_Neue, Instrument_Serif, Inter } from "next/font/google";
import "./styles.css";
import data from "./data.json";
import { siteUrl } from "./content";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${data.name} | Jazz Vocalist & Guitarist for Hire`,
  description: data.description,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: data.name,
    title: `${data.name} | Jazz Vocalist & Guitarist for Hire`,
    description: data.description,
    images: [
      {
        url: "/images/og-gary-dacanay.webp",
        width: 1200,
        height: 630,
        alt: `${data.name} with a hollow-body guitar`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${data.name} | Jazz Vocalist & Guitarist for Hire`,
    description: data.description,
    images: ["/images/og-gary-dacanay.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${serif.variable} ${sans.variable}`}>
        {children}
      </body>
    </html>
  );
}
