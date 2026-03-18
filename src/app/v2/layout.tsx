import { Cormorant_Garamond, Lato } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${cormorant.variable} ${lato.variable}`}>{children}</div>;
}
