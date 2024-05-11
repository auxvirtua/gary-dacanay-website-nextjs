import { Header } from "./components/feature/Header";
import { Body } from "./components/feature/Body";
import { Footer } from "./components/feature/Footer";

export default function Page() {
  return (
    <main className="max-w-fit mx-auto min-h-screen flex flex-col bg-stone-950 border-gold-light border-[20px]">
      <Header />
      <Body />
      <Footer />
    </main>
  );
}
