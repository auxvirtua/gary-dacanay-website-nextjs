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
              sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 899px) 22rem, 26rem"
              className={styles.artwork}
            />
          </div>

          <div className={styles.releaseDetails}>
            <h3>{release.title}</h3>

            {release.spotifyUrl || release.appleMusicUrl ? (
              <div className={styles.listenOn}>
                <p>Listen on</p>
                <div className={styles.platformLinks}>
                  {release.spotifyUrl ? (
                    <a
                      className={styles.platformLink}
                      href={release.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Listen to ${release.title} on Spotify`}
                    >
                      <Image src="/spotify.svg" alt="" width={20} height={20} />
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
                      <Image src="/apple_music.svg" alt="" width={20} height={20} />
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
