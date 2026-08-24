import Image from "next/image";
import type { Video } from "./Performances";
import styles from "./HomePage.module.css";

const watchHref = (video: Video) =>
  `/?watch=${encodeURIComponent(video.id)}#videos`;

export function PerformancesSkeleton({ videos }: { videos: Video[] }) {
  return (
    <section
      id="videos"
      className={styles.performances}
      aria-labelledby="performances-title"
      aria-busy="true"
    >
      <span className={styles.visuallyHidden} role="status">
        Loading selected video
      </span>

      <div className={styles.sectionHeader}>
        <h2 id="performances-title">Videos</h2>
      </div>

      <div className={styles.videoExperience}>
        <div className={styles.videoStage}>
          <div
            className={`${styles.featuredMedia} ${styles.skeletonMedia}`}
            aria-hidden="true"
          />

          <h3
            className={`${styles.activeVideoTitle} ${styles.skeletonTitle}`}
            aria-hidden="true"
          >
            <span className={styles.skeletonTitleLine} />
            <span className={styles.skeletonTitleLine} />
          </h3>
        </div>

        <ol className={styles.videoPlaylist} aria-label="Performance videos">
          {videos.map((video) => (
            <li key={video.id}>
              <a
                href={watchHref(video)}
                className={styles.playlistItem}
                aria-label={`Play ${video.title}`}
              >
                <span className={styles.playlistThumbnail}>
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 560px) 35vw, (max-width: 899px) 42vw, 7rem"
                  />
                </span>
                <strong>{video.title}</strong>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
