"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  type SyntheticEvent,
  type TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { photos } from "./media";
import styles from "./PhotosView.module.css";

const clampZoom = (value: number) => Math.min(3, Math.max(1, value));

export function PhotosView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pinchRef = useRef<{ distance: number; zoom: number } | null>(null);

  const activePhoto = photos[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (lightboxOpen) {
      if (!dialog.open) dialog.showModal();
      window.requestAnimationFrame(() => closeRef.current?.focus());
    } else if (dialog.open) {
      dialog.close();
    }
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setZoom(1);
        setActiveIndex((index) => (index - 1 + photos.length) % photos.length);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setZoom(1);
        setActiveIndex((index) => (index + 1) % photos.length);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen]);

  const selectPhoto = (index: number, scrollMobile = false) => {
    const wrappedIndex = (index + photos.length) % photos.length;
    setZoom(1);
    setActiveIndex(wrappedIndex);
    if (scrollMobile) {
      scrollerRef.current?.scrollTo({
        left: wrappedIndex * scrollerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setZoom(1);
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const handleDialogClose = () => {
    setLightboxOpen(false);
    setZoom(1);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const handleDialogCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    closeLightbox();
  };

  const touchDistance = (event: TouchEvent) => {
    const [first, second] = Array.from(event.touches);
    if (!first || !second) return 0;
    return Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
  };

  const handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 2) {
      pinchRef.current = { distance: touchDistance(event), zoom };
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length !== 2 || !pinchRef.current) return;
    event.preventDefault();
    const distance = touchDistance(event);
    setZoom(clampZoom(pinchRef.current.zoom * (distance / pinchRef.current.distance)));
  };

  return (
    <section className={styles.view} aria-labelledby="photos-title">
      <div className={styles.header}>
        <h1 id="photos-title" className={styles.visuallyHidden}>
          Photographs
        </h1>
        <PhotoControls
          activeIndex={activeIndex}
          onPrevious={() => selectPhoto(activeIndex - 1, true)}
          onNext={() => selectPhoto(activeIndex + 1, true)}
          onExpand={() => setLightboxOpen(true)}
        />
      </div>

      <button
        type="button"
        className={styles.desktopStage}
        aria-label={`View photograph ${activeIndex + 1} full screen`}
        onClick={(event) => openLightbox(activeIndex, event.currentTarget)}
      >
        <Image
          key={activePhoto.src}
          src={activePhoto.src}
          alt={activePhoto.alt}
          fill
          priority
          sizes="(max-width: 1120px) 92vw, 70vh"
          style={{ objectPosition: activePhoto.objectPosition }}
        />
      </button>

      <div
        ref={scrollerRef}
        className={styles.mobileScroller}
        onScroll={(event) => {
          const width = event.currentTarget.clientWidth;
          if (width) setActiveIndex(Math.round(event.currentTarget.scrollLeft / width));
        }}
      >
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={styles.mobileSlide}
            aria-label={`View photograph ${index + 1} full screen`}
            onClick={(event) => openLightbox(index, event.currentTarget)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading={index < 2 ? "eager" : "lazy"}
              sizes="(max-width: 760px) 100vw, 1px"
              style={{ objectPosition: photo.objectPosition }}
            />
          </button>
        ))}
      </div>

      <div className={styles.thumbnails} aria-label="Photograph thumbnails">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            aria-current={index === activeIndex ? "true" : undefined}
            aria-label={`View photograph ${index + 1}`}
            onClick={() => selectPhoto(index)}
          >
            <Image
              src={photo.src}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 1120px) 22vw, 10vw"
              style={{ objectPosition: photo.objectPosition }}
            />
          </button>
        ))}
      </div>

      <div className={styles.mobileControls}>
        <PhotoControls
          activeIndex={activeIndex}
          onPrevious={() => selectPhoto(activeIndex - 1, true)}
          onNext={() => selectPhoto(activeIndex + 1, true)}
          onExpand={() => setLightboxOpen(true)}
        />
      </div>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label="Photograph viewer"
        onClose={handleDialogClose}
        onCancel={handleDialogCancel}
      >
        <div className={styles.lightboxFrame}>
          <div className={styles.lightboxToolbar}>
            <span aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </span>
            <div>
              <button
                type="button"
                aria-label="Zoom out"
                disabled={zoom <= 1}
                onClick={() => setZoom((value) => clampZoom(value - 0.5))}
              >
                <ZoomOut size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Reset zoom"
                disabled={zoom === 1}
                onClick={() => setZoom(1)}
              >
                <RotateCcw size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Zoom in"
                disabled={zoom >= 3}
                onClick={() => setZoom((value) => clampZoom(value + 0.5))}
              >
                <ZoomIn size={20} aria-hidden="true" />
              </button>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close photograph viewer"
                onClick={closeLightbox}
              >
                <X size={21} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className={styles.lightboxStage}
            onDoubleClick={() => setZoom((value) => (value === 1 ? 2 : 1))}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => {
              pinchRef.current = null;
            }}
          >
            <div className={styles.lightboxImage} style={{ transform: `scale(${zoom})` }}>
              <Image
                key={activePhoto.src}
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="100vw"
                draggable={false}
              />
            </div>
          </div>

          <div className={styles.lightboxNavigation}>
            <button
              type="button"
              aria-label="Previous photograph"
              onClick={() => selectPhoto(activeIndex - 1)}
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <span>Pinch or double-tap to zoom</span>
            <button
              type="button"
              aria-label="Next photograph"
              onClick={() => selectPhoto(activeIndex + 1)}
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}

function PhotoControls({
  activeIndex,
  onPrevious,
  onNext,
  onExpand,
}: {
  activeIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onExpand: () => void;
}) {
  return (
    <div className={styles.controls}>
      <span aria-live="polite">
        {String(activeIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
      </span>
      <button type="button" aria-label="Previous photograph" onClick={onPrevious}>
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button type="button" aria-label="Next photograph" onClick={onNext}>
        <ChevronRight size={20} aria-hidden="true" />
      </button>
      <button type="button" aria-label="View photograph full screen" onClick={onExpand}>
        <Maximize2 size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
