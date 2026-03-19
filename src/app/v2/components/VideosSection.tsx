"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import data from "../../data.json";
import { VideoCard } from "./VideoCard";
import styles from "./VideosSection.module.css";

const videos = data.videos;
const TITLE_SETTLE_DELAY_MS = 70;

export function VideosSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [desktopSpacerWidth, setDesktopSpacerWidth] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeTitle] = videos[activeIndex];

  const scheduleTitleCommit = useCallback((index: number, immediate = false) => {
    if (settleTimeoutRef.current) {
      clearTimeout(settleTimeoutRef.current);
    }

    if (immediate) {
      setActiveIndex(index);
      return;
    }

    settleTimeoutRef.current = setTimeout(() => {
      setActiveIndex(index);
      settleTimeoutRef.current = null;
    }, TITLE_SETTLE_DELAY_MS);
  }, []);

  const syncDesktopActiveIndex = useCallback((
    container: HTMLDivElement,
    { immediate = false }: { immediate?: boolean } = {},
  ) => {
    const slides = Array.from(container.querySelectorAll<HTMLElement>("[data-desktop-slide]"));
    if (slides.length === 0) return 0;

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

    setStageIndex((current) => (current === closestIndex ? current : closestIndex));
    const closestSlide = slides[closestIndex];
    const centeredThreshold = closestSlide ? closestSlide.offsetWidth * 0.08 : 0;

    scheduleTitleCommit(
      closestIndex,
      immediate || closestDistance <= centeredThreshold,
    );

    return closestIndex;
  }, [scheduleTitleCommit]);

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

    setStageIndex(index);
    setPlayingIndex(null);
  };

  const prev = () => scrollTo(Math.max(0, stageIndex - 1));
  const next = () => scrollTo(Math.min(videos.length - 1, stageIndex + 1));

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
      syncDesktopActiveIndex(desktopContainer, { immediate: true });
    };

    updateDesktopGeometry();
    window.addEventListener("resize", updateDesktopGeometry);

    return () => {
      window.removeEventListener("resize", updateDesktopGeometry);
    };
  }, [syncDesktopActiveIndex]);

  useEffect(() => {
    return () => {
      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="videos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingGroup}>
            <h2 className={styles.title}>{activeTitle}</h2>
            <p className={styles.mobileMeta}>Featured performance</p>
          </div>

          <div className={styles.mobileNav}>
            <button
              type="button"
              onClick={prev}
              disabled={stageIndex === 0}
              aria-label="Previous video"
              className={styles.navBtn}
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={stageIndex === videos.length - 1}
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
              const nextIndex = Math.round(container.scrollLeft / (cardWidth + 16));
              setStageIndex(nextIndex);
              const targetOffset = nextIndex * (cardWidth + 16);
              const isSettled = Math.abs(container.scrollLeft - targetOffset) <= 12;
              scheduleTitleCommit(nextIndex, isSettled);
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
              aria-pressed={i === stageIndex}
              className={i === stageIndex ? styles.dotActive : styles.dot}
            />
          ))}
        </div>

        <div className={styles.desktopShowcase}>
          <div className={styles.desktopTopline}>
            <div className={styles.featuredMeta}>
              <h2 className={styles.featuredTitle}>{activeTitle}</h2>
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
                  className={`${styles.desktopSlide} ${index === stageIndex ? styles.desktopSlideActive : ""}`}
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
                        if (index !== stageIndex) {
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
                  disabled={stageIndex === 0}
                  aria-label="Previous video"
                  className={styles.navBtn}
                >
                  <ChevronLeft size={16} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={stageIndex === videos.length - 1}
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
                    aria-selected={index === stageIndex}
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
