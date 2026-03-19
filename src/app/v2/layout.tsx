import { Bodoni_Moda, Manrope } from "next/font/google";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lato",
});

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${display.variable} ${sans.variable}`}>{children}</div>;
}
