"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./HomePage.module.css";

type Video = {
  title: string;
  id: string;
};

export function Performances({ videos }: { videos: Video[] }) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activeVideo && dialog && !dialog.open) dialog.showModal();
  }, [activeVideo]);

  const closeModal = () => dialogRef.current?.close();

  return (
    <section id="listen" className={styles.performances} aria-labelledby="performances-title">
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.sectionKicker}>Selected performances</p>
          <h2 id="performances-title">Press Play.</h2>
        </div>
        <p>
          Three standards, performed with the intimacy and warmth Gary brings to a live
          room.
        </p>
      </div>

      <div className={styles.videoGrid}>
        {videos.map((video, index) => (
          <article className={styles.videoCard} key={video.id}>
            <button
              type="button"
              aria-label={`Play ${video.title}`}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActiveVideo(video);
              }}
            >
              <span className={styles.videoMedia}>
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
                <span className={styles.videoOverlay}>
                  <Play size={24} fill="currentColor" />
                </span>
              </span>
              <span className={styles.videoMeta}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{video.title}</strong>
                <span>Watch performance</span>
              </span>
            </button>
          </article>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.videoDialog}
        aria-label={activeVideo ? `Video: ${activeVideo.title}` : "Performance video"}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeModal();
        }}
        onClose={() => {
          setActiveVideo(null);
          requestAnimationFrame(() => triggerRef.current?.focus());
        }}
      >
        <div className={styles.dialogPanel}>
          <div className={styles.dialogHeader}>
            <h3>{activeVideo?.title}</h3>
            <button type="button" onClick={closeModal} aria-label="Close video">
              <X size={22} />
            </button>
          </div>
          {activeVideo ? (
            <div className={styles.videoEmbed}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : null}
        </div>
      </dialog>
    </section>
  );
}
