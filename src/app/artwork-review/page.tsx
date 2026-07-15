import { Bebas_Neue, Instrument_Serif } from "next/font/google";
import { ArtworkReview } from "./ArtworkReview";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-review-display",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-review-serif",
});

export default function ArtworkReviewPage() {
  return (
    <main className={`${display.variable} ${serif.variable}`}>
      <ArtworkReview />
    </main>
  );
}
