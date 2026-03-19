import { ArrowDown } from "lucide-react";
import data from "../../data.json";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.shell}>
        <div className={styles.main}>
          <div className={styles.ornamentRow}>
            <div className={styles.rule} />
            <span className={styles.eyebrow}>{data.subdescription}</span>
            <div className={styles.rule} />
          </div>

          <h1 className={styles.title}>
            Gary
            <br />
            Dacanay
          </h1>

          <div className={styles.subtitleRow}>
            <div className={styles.rule} />
            <span className={styles.subtitle}>
              Jazz Standards &amp; The Great American Songbook
            </span>
            <div className={styles.rule} />
          </div>

          <p className={styles.supportingCopy}>
            Elegant live jazz for private corporate events, weddings, dinners,
            and intimate celebrations across Northeast Ohio.
          </p>

          <div className={styles.actions}>
            <a href={`mailto:${data.email}`} className={styles.primaryAction}>
              Book Gary
            </a>
          </div>
        </div>

        <aside className={styles.aside} aria-label="Quick facts">
          <p className={styles.panelKicker}>Quick facts</p>
          <ul className={styles.factList}>
            <li className={styles.factItem}>
              <span className={styles.factLabel}>Style</span>
              <span className={styles.factValue}>{data.subdescription}</span>
            </li>
            <li className={styles.factItem}>
              <span className={styles.factLabel}>Repertoire</span>
              <span className={styles.factValue}>
                Jazz standards from The Great American Songbook
              </span>
            </li>
            <li className={styles.factItem}>
              <span className={styles.factLabel}>Events</span>
              <span className={styles.factValue}>
                Corporate events, weddings, dinners, and parties
              </span>
            </li>
            <li className={styles.factItem}>
              <span className={styles.factLabel}>Region</span>
              <span className={styles.factValue}>Northeast Ohio</span>
            </li>
          </ul>
        </aside>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <ArrowDown size={18} className={styles.scrollIcon} />
      </div>
    </section>
  );
}
