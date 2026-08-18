import data from "../data.json";
import styles from "./PosterHome.module.css";

export function PosterHome() {
  return (
    <section className={styles.poster} aria-labelledby="poster-title">
      <div className={styles.copy}>
        <h1 id="poster-title">
          The Great
          <br />
          American
          <br />
          Songbook,
          <br />
          <span>Live</span>
        </h1>
        <p className={styles.supporting}>{data.hero.supportingCopy}</p>
        <p className={styles.location}>Northeast Ohio</p>
      </div>
    </section>
  );
}
