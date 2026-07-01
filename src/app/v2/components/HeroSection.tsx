import { ArrowDown } from "lucide-react";
import data from "../../data.json";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div id="about" className={styles.aboutAnchor} />
      <div className={styles.shell}>
        <div className={styles.eyebrowBand}>
          <div className={styles.rule} />
          <span className={styles.eyebrow}>{data.subdescription}</span>
        </div>

        <h1 className={styles.title}>Elegant live jazz for gatherings that want soul.</h1>

        <div className={styles.detailBlock}>
          <p className={styles.quote}>
            &ldquo;Bringing the warmth and elegance of classic jazz to every occasion.&rdquo;
          </p>

          <p className={styles.supportingCopy}>
            From private dinners and weddings to corporate receptions and intimate
            celebrations, the repertoire draws from jazz standards and the Great American
            Songbook to create a warm, polished atmosphere across Northeast Ohio.
          </p>

          <div className={styles.actions}>
            <a href={`mailto:${data.email}`} className={styles.primaryAction}>
              Book Gary
            </a>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <ArrowDown size={18} className={styles.scrollIcon} />
      </div>
    </section>
  );
}
