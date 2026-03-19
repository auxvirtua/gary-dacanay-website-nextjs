import data from "../../data.json";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.intro}>
          <div className={styles.rule} />

          <p className={styles.quote}>
            &ldquo;Bringing the warmth and elegance of classic jazz to every
            occasion.&rdquo;
          </p>

          <div className={styles.rule} />

          <p className={styles.body}>{data.description}</p>
        </div>

        <div className={styles.aside}>
          <p className={styles.panelKicker}>What this means</p>
          <ul className={styles.highlightList}>
            <li className={styles.highlightItem}>
              <span className={styles.highlightLabel}>Sound</span>
              <span className={styles.highlightValue}>
                Warm vocals with tasteful guitar accompaniment
              </span>
            </li>
            <li className={styles.highlightItem}>
              <span className={styles.highlightLabel}>Book for</span>
              <span className={styles.highlightValue}>
                Corporate receptions, weddings, dinners, and parties
              </span>
            </li>
            <li className={styles.highlightItem}>
              <span className={styles.highlightLabel}>Songbook</span>
              <span className={styles.highlightValue}>
                Classic jazz standards and familiar repertoire
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
