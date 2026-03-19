"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import data from "../../data.json";
import { VideoCard } from "./VideoCard";
import styles from "./VideosSection.module.css";

const videos = data.videos;

export function VideosSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [featuredTitle, featuredVideoId] = videos[0];
  const supportingVideos = videos.slice(1);

  const scrollTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (!card) return;
    container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(videos.length - 1, activeIndex + 1));

  return (
    <section id="videos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingGroup}>
            <h2 className={styles.title}>Videos</h2>
            <p className={styles.eyebrow}>Live performances &amp; recordings</p>
          </div>

          <div className={styles.mobileNav}>
            <button
              type="button"
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="Previous video"
              className={styles.navBtn}
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={activeIndex === videos.length - 1}
              aria-label="Next video"
              className={styles.navBtn}
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          role="region"
          aria-label="Video carousel"
          className={styles.track}
          onScroll={(e) => {
            const container = e.currentTarget;
            const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth ?? 0;
            if (cardWidth > 0) {
              setActiveIndex(Math.round(container.scrollLeft / (cardWidth + 16)));
            }
          }}
        >
          {videos.map(([title, videoId]) => (
            <div key={videoId} className={styles.slide}>
              <VideoCard title={title} videoId={videoId} />
            </div>
          ))}
        </div>

        <div className={styles.dots} role="tablist" aria-label="Video slides">
          {videos.map(([title], i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to video ${i + 1}: ${title}`}
              aria-pressed={i === activeIndex}
              className={i === activeIndex ? styles.dotActive : styles.dot}
            />
          ))}
        </div>

        <div className={styles.desktopShowcase}>
          <div className={styles.featuredMeta}>
            <h3 className={styles.featuredTitle}>{featuredTitle}</h3>
            <p className={styles.featuredDescription}>Featured performance</p>
          </div>

          <div className={styles.featuredFrame}>
            <a
              href={`https://www.youtube.com/watch?v=${featuredVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.featuredMedia}
            >
              <VideoCard title={featuredTitle} videoId={featuredVideoId} />
            </a>
          </div>

          <div className={styles.supportingColumn}>
            <div className={styles.supportingIntro}>
              <p className={styles.supportingLabel}>Additional recordings</p>
            </div>

            <div className={styles.supportingGrid}>
              {supportingVideos.map(([title, videoId]) => (
                <VideoCard key={videoId} title={title} videoId={videoId} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
