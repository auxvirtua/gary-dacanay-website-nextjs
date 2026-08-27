"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import styles from "./HomePage.module.css";

export type Video = {
  title: string;
  id: string;
};

export function Performances({ videos }: { videos: Video[] }) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(() => videos[0] ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerFrameRef = useRef<HTMLIFrameElement>(null);
  const shouldFocusPlayerRef = useRef(false);

  useEffect(() => {
    if (!isPlaying || !shouldFocusPlayerRef.current) {
      return;
    }

    shouldFocusPlayerRef.current = false;
    playerFrameRef.current?.focus();
  }, [activeVideo, isPlaying]);

  const selectVideo = (video: Video) => {
    if (video.id === activeVideo?.id) {
      return;
    }

    setActiveVideo(video);
    setIsPlaying(false);
  };

  const playActiveVideo = (shouldFocusPlayer = false) => {
    shouldFocusPlayerRef.current = shouldFocusPlayer;
    setIsPlaying(true);
  };

  return (
    <section className={styles.performances} aria-labelledby="performances-title">
      <div className={styles.sectionHeader}>
        <SectionHeading id="performances-title">Videos</SectionHeading>
      </div>

      {activeVideo ? (
        <div className={styles.videoExperience}>
          <div className={styles.videoStage}>
            <div className={styles.featuredMedia}>
              {isPlaying ? (
                <iframe
                  ref={playerFrameRef}
                  key={activeVideo.id}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0&playsinline=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className={styles.featuredPlay}
                  aria-label={`Play ${activeVideo.title}`}
                  onClick={(event) => playActiveVideo(event.detail === 0)}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${activeVideo.id}/maxresdefault.jpg`}
                    alt=""
                    fill
                    sizes="(max-width: 899px) 100vw, 60vw"
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
            {videos.map((video) => {
              const isActive = video.id === activeVideo.id;

              return (
                <li key={video.id}>
                  <button
                    type="button"
                    className={`${styles.playlistItem} ${isActive ? styles.playlistItemActive : ""}`}
                    aria-pressed={isActive}
                    aria-label={`Select ${video.title}`}
                    onClick={() => selectVideo(video)}
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
