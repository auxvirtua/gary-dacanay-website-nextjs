import data from "../../data.json";
import { SocialIconRow } from "./SocialIconRow";
import styles from "./FooterSection.module.css";

export function FooterSection() {
  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <span className={styles.brand}>
          {data.name}
        </span>

        <SocialIconRow />

        <span className={styles.copy}>
          &copy; {new Date().getFullYear()} {data.name}
        </span>
      </div>
    </footer>
  );
}
