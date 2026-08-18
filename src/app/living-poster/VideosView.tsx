"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import data from "../data.json";
import styles from "./VideosView.module.css";

const videos = data.videos.map(([title, id]) => ({ title, id }));

export function VideosView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedIndex = videos.findIndex((video) => video.id === searchParams.get("watch"));
  const activeIndex = requestedIndex >= 0 ? requestedIndex : 0;
  const activeVideo = videos[activeIndex];
  const [playingId, setPlayingId] = useState<string | null>(null);

  const selectVideo = (index: number, play = false) => {
    const wrappedIndex = (index + videos.length) % videos.length;
    const video = videos[wrappedIndex];
    router.push(`/videos?watch=${encodeURIComponent(video.id)}`, { scroll: false });
    setPlayingId(play ? video.id : null);
  };

  return (
    <section className={styles.view} aria-labelledby="videos-title">
      <div className={styles.primary}>
        <div className={styles.frame}>
          {playingId === activeVideo.id ? (
            <iframe
              key={activeVideo.id}
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0&playsinline=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className={styles.playButton}
              aria-label={`Play ${activeVideo.title}`}
              onClick={() => setPlayingId(activeVideo.id)}
            >
              <Image
                src={`https://img.youtube.com/vi/${activeVideo.id}/maxresdefault.jpg`}
                alt=""
                fill
                priority
                sizes="(max-width: 1120px) 100vw, 68vw"
              />
              <span aria-hidden="true">
                <Play size={26} fill="currentColor" />
              </span>
            </button>
          )}
        </div>

        <div className={styles.caption}>
          <h1 id="videos-title">{activeVideo.title}</h1>
          <div className={styles.controls}>
            <span aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Previous video"
              onClick={() => selectVideo(activeIndex - 1)}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next video"
              onClick={() => selectVideo(activeIndex + 1)}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <ol className={styles.playlist} aria-label="Performance videos">
        {videos.map((video, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={video.id}>
              <button
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => selectVideo(index, true)}
              >
                <span className={styles.thumbnail}>
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(max-width: 760px) 6rem, (max-width: 1120px) 44vw, 8rem"
                  />
                </span>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <strong>{video.title}</strong>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
