import styles from "./HomePage.module.css";

export function NavBar({ name }: { name: string }) {
  return (
    <header className={styles.masthead}>
      <span className={styles.brand}>{name}</span>
    </header>
  );
}
