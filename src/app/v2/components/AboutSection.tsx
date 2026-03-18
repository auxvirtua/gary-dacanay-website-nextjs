import data from "../../data.json";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        {/* Ornament */}
        <div className={styles.rule} />

        <p className={styles.quote}>
          &ldquo;Bringing the warmth and elegance of classic jazz to every
          occasion.&rdquo;
        </p>

        <div className={styles.rule} />

        <p className={styles.body}>
          {data.description}
        </p>

        <div className={styles.actions}>
          <a
            href={`mailto:${data.email}`}
            className={styles.primaryAction}
          >
            Email Gary to Book
          </a>
          <p className={styles.note}>
            Opens your email app
          </p>
        </div>
      </div>
    </section>
  );
}
