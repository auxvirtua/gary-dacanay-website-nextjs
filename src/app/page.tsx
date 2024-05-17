import { Header } from "./components/feature/Header";
import { Footer } from "./components/feature/Footer";
import { Divider } from "./components/ui/Divider";
import { Hero } from "./components/feature/Hero";
import { Videos } from "./components/feature/Videos";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col border-gold-light bg-stone-950">
      <Header />
      <div className="flex flex-col gap-6 md:gap-12">
        <Divider />
        <Hero />
        <Divider />
        <Videos />
      </div>
      <Divider />
      <Footer />
    </main>
  );
}
