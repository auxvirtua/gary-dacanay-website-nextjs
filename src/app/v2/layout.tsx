import { Instrument_Serif, Inter } from "next/font/google";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${display.variable} ${sans.variable}`}>{children}</div>;
}
