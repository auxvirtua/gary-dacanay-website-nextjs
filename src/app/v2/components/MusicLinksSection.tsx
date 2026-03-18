import Image from "next/image";
import data from "../../data.json";
import styles from "./MusicLinksSection.module.css";

const platforms = [
  { key: "spotify", label: "Spotify", icon: "/spotify.svg" },
  { key: "apple_music", label: "Apple Music", icon: "/apple_music.svg" },
] as const;

export function MusicLinksSection() {
  return (
    <section id="listen" className={styles.section}>
      <div className={styles.shell}>
        <p className={styles.kicker}>Streaming</p>
        <h2 className={styles.heading}>Listen</h2>
        <p className={styles.description}>
          Stream on your platform of choice
        </p>

        <div className={styles.platforms}>
          {platforms.map(({ key, label, icon }) => (
            <a
              key={key}
              href={data.music[key]}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.platformLink}
            >
              <Image
                src={icon}
                alt={`${label} logo`}
                width={32}
                height={32}
                className={styles.platformIcon}
              />
              <span className={styles.platformLabel}>
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
