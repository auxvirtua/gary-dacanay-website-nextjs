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
        <div className={styles.content}>
          <p className={styles.kicker}>Streaming</p>
          <h2 className={styles.heading}>Listen</h2>
          <p className={styles.description}>
            Stream on your platform of choice.
          </p>
          <div className={styles.highlights} aria-label="Listening highlights">
            <p className={styles.highlight}>Great American Songbook interpretations</p>
            <p className={styles.highlight}>Solo vocal guitar performances</p>
            <p className={styles.highlight}>Available for private events in Northeast Ohio</p>
          </div>
        </div>

        <div className={styles.panel}>
          <p className={styles.panelLabel}>Featured platforms</p>
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
                <span className={styles.platformLabel}>{label}</span>
              </a>
            ))}
          </div>
          <p className={styles.panelNote}>
            For booking inquiries, use the contact section below or email Gary directly.
          </p>
        </div>
      </div>
    </section>
  );
}
