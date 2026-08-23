import Image from "next/image";
import styles from "./MusicSection.module.css";

type MusicRelease = {
  slug: string;
  title: string;
  artwork: string;
  status: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  featured?: boolean;
};

export function MusicSection({ releases }: { releases: MusicRelease[] }) {
  const release = releases.find((item) => item.featured && item.status === "released");

  if (!release) {
    return null;
  }

  return (
    <section id="music" className={styles.music} aria-labelledby="music-title">
      <div className={styles.shell}>
        <h2 id="music-title" className={styles.title}>Music</h2>

        <article className={styles.release}>
          <div className={styles.artworkFrame}>
            <Image
              src={release.artwork}
              alt={`Cover art for ${release.title}`}
              fill
              sizes="(max-width: 640px) 5.5rem, 22rem"
              className={styles.artwork}
            />
          </div>

          <div className={styles.releaseDetails}>
            <h3>{release.title}</h3>

            {release.spotifyUrl || release.appleMusicUrl ? (
              <div className={styles.listenOn}>
                <div className={styles.platformLinks}>
                  {release.spotifyUrl ? (
                    <a
                      className={styles.platformLink}
                      href={release.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Listen to ${release.title} on Spotify`}
                    >
                      <span
                        aria-hidden="true"
                        className={`${styles.platformIcon} ${styles.spotifyIcon}`}
                      />
                      Spotify
                    </a>
                  ) : null}
                  {release.appleMusicUrl ? (
                    <a
                      className={styles.platformLink}
                      href={release.appleMusicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Listen to ${release.title} on Apple Music`}
                    >
                      <span
                        aria-hidden="true"
                        className={`${styles.platformIcon} ${styles.appleMusicIcon}`}
                      />
                      Apple Music
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}
