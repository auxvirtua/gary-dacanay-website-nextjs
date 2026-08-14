"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import styles from "./HomePage.module.css";

type Video = {
  title: string;
  id: string;
};

export function Performances({ videos }: { videos: Video[] }) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(videos[0] ?? null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = (video: Video) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  return (
    <section id="videos" className={styles.performances} aria-labelledby="performances-title">
      <div className={styles.sectionHeader}>
        <h2 id="performances-title">Videos</h2>
      </div>

      {activeVideo ? (
        <div className={styles.videoExperience}>
          <div className={styles.videoStage}>
            <div className={styles.featuredMedia}>
              {isPlaying ? (
                <iframe
                  key={activeVideo.id}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className={styles.featuredPlay}
                  aria-label={`Play ${activeVideo.title}`}
                  onClick={() => setIsPlaying(true)}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${activeVideo.id}/maxresdefault.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 899px) 100vw, 64vw"
                  />
                  <span className={styles.featuredPlayIcon} aria-hidden="true">
                    <Play size={28} fill="currentColor" />
                  </span>
                </button>
              )}
            </div>

            <h3 className={styles.activeVideoTitle}>{activeVideo.title}</h3>
          </div>

          <ol className={styles.videoPlaylist} aria-label="Performance videos">
            {videos.map((video, index) => {
              const isActive = video.id === activeVideo.id;

              return (
                <li key={video.id}>
                  <button
                    type="button"
                    className={`${styles.playlistItem} ${isActive ? styles.playlistItemActive : ""}`}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Play ${video.title}`}
                    onClick={() => playVideo(video)}
                  >
                    <span className={styles.playlistThumbnail}>
                      <Image
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt=""
                        fill
                        sizes="(max-width: 560px) 35vw, (max-width: 899px) 18vw, 10rem"
                      />
                    </span>
                    <span className={styles.playlistNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{video.title}</strong>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
