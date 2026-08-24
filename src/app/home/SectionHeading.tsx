import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  children: ReactNode;
  id: string;
};

export function SectionHeading({ children, id }: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <h2 id={id} className={styles.title}>
        {children}
      </h2>
      <span className={styles.rule} aria-hidden="true" />
    </div>
  );
}
