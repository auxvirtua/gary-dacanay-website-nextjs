import { Header } from "./components/feature/Header";
import { Body } from "./components/feature/Body";
import { Footer } from "./components/feature/Footer";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col border-gold-light bg-stone-950 md:border-[40px]">
      <Header />
      <Body />
      <Footer />
    </main>
  );
}
