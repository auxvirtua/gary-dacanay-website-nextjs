import Image from "next/image";
import data from "../data.json";
import styles from "./MusicView.module.css";

export function MusicView() {
  const release = data.music.releases.find(
    (item) => item.featured && item.status === "released",
  );

  if (!release) return null;

  return (
    <section className={styles.view} aria-labelledby="music-title">
      <div className={styles.artwork}>
        <Image
          src={release.artwork}
          alt={`Cover art for ${release.title}`}
          fill
          priority
          sizes="(max-width: 700px) 82vw, 40vw"
        />
      </div>

      <div className={styles.details}>
        <p className={styles.kicker}>Featured recording · Single</p>
        <h1 id="music-title">{release.title}</h1>
        <p className={styles.description}>
          Gary’s intimate vocal-and-guitar interpretation of a timeless standard.
          Choose a service to listen in full.
        </p>
        <div className={styles.listenLinks}>
          {release.spotifyUrl ? (
            <a href={release.spotifyUrl} target="_blank" rel="noopener noreferrer">
              <Image src="/spotify.svg" alt="" width={22} height={22} />
              <span>Listen on Spotify</span>
            </a>
          ) : null}
          {release.appleMusicUrl ? (
            <a href={release.appleMusicUrl} target="_blank" rel="noopener noreferrer">
              <Image src="/apple_music.svg" alt="" width={22} height={22} />
              <span>Listen on Apple Music</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
