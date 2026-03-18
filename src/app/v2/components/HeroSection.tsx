import { ArrowDown } from "lucide-react";
import data from "../../data.json";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section
      id="hero"
      className={styles.hero}
    >
      {/* Decorative top rule */}
      <div className={styles.ornamentRow}>
        <div className={styles.rule} />
        <span className={styles.eyebrow}>
          {data.subdescription}
        </span>
        <div className={styles.rule} />
      </div>

      {/* Name */}
      <h1 className={styles.title}>
        Gary
        <br />
        Dacanay
      </h1>

      {/* Decorative bottom rule */}
      <div className={styles.subtitleRow}>
        <div className={styles.rule} />
        <span className={styles.subtitle}>
          Jazz Standards &amp; The Great American Songbook
        </span>
        <div className={styles.rule} />
      </div>

      {/* CTAs */}
      <div className={styles.actions}>
        <a
          href="#about"
          className={styles.secondaryAction}
        >
          Explore
        </a>
        <a
          href={`mailto:${data.email}`}
          className={styles.primaryAction}
        >
          Book Gary
        </a>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <ArrowDown size={18} className={styles.scrollIcon} />
      </div>
    </section>
  );
}
