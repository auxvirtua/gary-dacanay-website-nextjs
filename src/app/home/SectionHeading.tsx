import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
  id: string;
};

export function SectionHeading({ children, className, id }: SectionHeadingProps) {
  return (
    <div className={`${styles.heading}${className ? ` ${className}` : ""}`}>
      <h2 id={id} className={styles.title}>
        {children}
      </h2>
      <span className={styles.rule} aria-hidden="true" />
    </div>
  );
}
