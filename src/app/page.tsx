import { Header } from "./components/feature/Header";
import { Body } from "./components/feature/Body";
import { Footer } from "./components/feature/Footer";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col bg-stone-950 border-gold-light border-[40px]">
      <Header />
      <Body />
      <Footer />
    </main>
  );
}
