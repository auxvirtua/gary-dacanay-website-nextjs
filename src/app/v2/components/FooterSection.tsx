import data from "../../data.json";
import styles from "./FooterSection.module.css";

export function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <span className={styles.brand}>{data.name}</span>
        <span className={styles.copy}>
          &copy; {new Date().getFullYear()} {data.name}
        </span>
      </div>
    </footer>
  );
}
