"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import data from "../../data.json";
import { VideoCard } from "./VideoCard";
import styles from "./VideosSection.module.css";

const videos = data.videos;

export function VideosSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [desktopSpacerWidth, setDesktopSpacerWidth] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const [activeTitle] = videos[activeIndex];

  const syncDesktopActiveIndex = (container: HTMLDivElement) => {
    const slides = Array.from(container.querySelectorAll<HTMLElement>("[data-desktop-slide]"));
    if (slides.length === 0) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((current) => (current === closestIndex ? current : closestIndex));
  };

  const scrollTo = (index: number) => {
    const desktopContainer = desktopScrollRef.current;
    const mobileContainer = mobileScrollRef.current;

    if (desktopContainer) {
      const slides = desktopContainer.querySelectorAll<HTMLElement>("[data-desktop-slide]");
      const card = slides[index];
      if (card) {
        const left =
          card.offsetLeft - (desktopContainer.clientWidth - card.offsetWidth) / 2;
        desktopContainer.scrollTo({ left, behavior: "smooth" });
      }
    } else if (mobileContainer) {
      const card = mobileContainer.children[index] as HTMLElement;
      if (card) {
        mobileContainer.scrollTo({
          left: card.offsetLeft - mobileContainer.offsetLeft,
          behavior: "smooth",
        });
      }
    }

    setActiveIndex(index);
    setPlayingIndex(null);
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(videos.length - 1, activeIndex + 1));

  useEffect(() => {
    const desktopContainer = desktopScrollRef.current;
    if (!desktopContainer) return;

    const updateDesktopGeometry = () => {
      const slides = desktopContainer.querySelectorAll<HTMLElement>("[data-desktop-slide]");
      const firstSlide = slides[0];
      if (!firstSlide) return;

      const spacerWidth = Math.max(
        0,
        (desktopContainer.clientWidth - firstSlide.offsetWidth) / 2,
      );

      setDesktopSpacerWidth(spacerWidth);
      syncDesktopActiveIndex(desktopContainer);
    };

    updateDesktopGeometry();
    window.addEventListener("resize", updateDesktopGeometry);

    return () => {
      window.removeEventListener("resize", updateDesktopGeometry);
    };
  }, []);

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
          ref={mobileScrollRef}
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
          <div className={styles.desktopTopline}>
            <div className={styles.featuredMeta}>
              <h3 className={styles.featuredTitle}>{activeTitle}</h3>
              <p className={styles.featuredDescription}>Featured performance</p>
            </div>
          </div>

          <div className={styles.stageWrap}>
            <div
              ref={desktopScrollRef}
              className={styles.desktopTrack}
              role="region"
              aria-label="Desktop video stage"
              onScroll={(e) => {
                const container = e.currentTarget;
                syncDesktopActiveIndex(container);
              }}
            >
              <div
                className={styles.desktopSpacer}
                aria-hidden="true"
                style={{ width: desktopSpacerWidth }}
              />
              {videos.map(([title, videoId], index) => (
                <div
                  key={videoId}
                  data-desktop-slide
                  className={`${styles.desktopSlide} ${index === activeIndex ? styles.desktopSlideActive : ""}`}
                >
                  {playingIndex === index ? (
                    <div className={styles.embedShell}>
                      <iframe
                        className={styles.embed}
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={styles.stageButton}
                      onClick={() => {
                        if (index !== activeIndex) {
                          scrollTo(index);
                          return;
                        }
                        setPlayingIndex(index);
                      }}
                      aria-label={`Play ${title}`}
                    >
                      <span className={styles.desktopPoster}>
                        <Image
                          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                          alt={title}
                          fill
                          sizes="(min-width: 1200px) 66vw, 88vw"
                          className={styles.desktopPosterImage}
                        />
                      </span>
                      <span className={styles.stagePlay}>Play performance</span>
                    </button>
                  )}
                </div>
              ))}
              <div
                className={styles.desktopSpacer}
                aria-hidden="true"
                style={{ width: desktopSpacerWidth }}
              />
            </div>

            <div className={styles.desktopControls}>
              <div className={styles.desktopNav}>
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

              <div className={styles.desktopPager} role="tablist" aria-label="Desktop video slides">
                {videos.map(([title], index) => (
                  <button
                    key={title}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    aria-label={`Show ${title}`}
                    className={index === activeIndex ? styles.desktopDotActive : styles.desktopDot}
                    onClick={() => scrollTo(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
