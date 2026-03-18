import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { MusicLinksSection } from "./components/MusicLinksSection";
import { VideosSection } from "./components/VideosSection";
import { NewsletterSection } from "./components/NewsletterSection";
import { FooterSection } from "./components/FooterSection";
import styles from "./page.module.css";

export default function V2Page() {
  return (
    <main className={styles.page}>
      <NavBar />
      <HeroSection />
      <AboutSection />
      <MusicLinksSection />
      <VideosSection />
      <NewsletterSection />
      <FooterSection />
    </main>
  );
}
