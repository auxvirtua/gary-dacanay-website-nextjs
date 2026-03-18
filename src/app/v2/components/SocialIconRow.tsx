import Image from "next/image";
import data from "../../data.json";
import styles from "./SocialIconRow.module.css";

const allLinks = {
  ...data.social,
  ...data.music,
} as Record<string, string>;

export function SocialIconRow() {
  return (
    <div className={styles.row}>
      {Object.entries(allLinks).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          title={platform.replace("_", " ")}
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
        </a>
      ))}
    </div>
  );
}
