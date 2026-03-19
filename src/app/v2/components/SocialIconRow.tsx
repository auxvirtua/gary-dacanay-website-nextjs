import Image from "next/image";
import data from "../../data.json";
import styles from "./SocialIconRow.module.css";

const allLinks = {
  ...data.social,
  ...data.music,
} as Record<string, string>;

const toLabel = (value: string) =>
  value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export function SocialIconRow({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.row} ${compact ? styles.compact : ""}`}>
      {Object.entries(allLinks).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          aria-label={toLabel(platform)}
          title={toLabel(platform)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <Image
            src={`/${platform}.svg`}
            alt={`${platform} logo`}
            width={32}
            height={32}
            className={styles.icon}
          />
          <span className={styles.label}>{toLabel(platform)}</span>
        </a>
      ))}
    </div>
  );
}
