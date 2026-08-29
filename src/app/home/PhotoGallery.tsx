"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import styles from "./HomePage.module.css";

type PhotoLayout = "featured" | "supporting" | "portrait" | "landscape" | "square";

type Photo = {
  alt: string;
  height: number;
  layout: PhotoLayout;
  objectPosition?: string;
  src: string;
  width: number;
};

const photos: Photo[] = [
  {
    src: "/images/photos/web/balcony.webp",
    alt: "Gary Dacanay standing with a sunburst hollow-body guitar inside an ornate atrium.",
    width: 1467,
    height: 2200,
    layout: "featured",
    objectPosition: "50% 30%",
  },
  {
    src: "/images/photos/web/jump.webp",
    alt: "Gary Dacanay leaping with a sunburst hollow-body guitar beneath an ornate glass ceiling.",
    width: 1467,
    height: 2200,
    layout: "supporting",
    objectPosition: "50% 44%",
  },
  {
    src: "/images/photos/web/city-1.webp",
    alt: "Gary Dacanay smiling with his guitar outside a downtown venue.",
    width: 1467,
    height: 2200,
    layout: "supporting",
  },
  {
    src: "/images/photos/web/city-2.webp",
    alt: "Gary Dacanay holding a sunburst hollow-body guitar outside a live music venue.",
    width: 1467,
    height: 2200,
    layout: "portrait",
  },
];

const openingPhotos = photos.filter(
  (photo) => photo.layout === "featured" || photo.layout === "supporting",
);

export function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeGallery = () => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }

    setActiveIndex(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const openGallery = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActiveIndex(index);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeIndex === null) {
      if (dialog.open) dialog.close();
      return;
    }

    if (!dialog.open) dialog.showModal();
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((index) => (index === null ? index : (index - 1 + photos.length) % photos.length));
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((index) => (index === null ? index : (index + 1) % photos.length));
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const handleDialogClose = () => {
    setActiveIndex(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const handleDialogCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    closeGallery();
  };

  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  return (
    <section
      className={styles.photographs}
      aria-labelledby="photographs-title"
    >
      <div className={styles.photoGallery}>
        <div className={styles.photoHeader}>
          <SectionHeading className={styles.photoHeading} id="photographs-title">
            Photos
          </SectionHeading>
          <button
            type="button"
            className={styles.photoOpenButton}
            onClick={(event) => openGallery(0, event.currentTarget)}
          >
            See More
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.7} />
          </button>
        </div>

        <div className={styles.photoSpread}>
          {openingPhotos.map((photo) => {
            const index = photos.indexOf(photo);
            const isFeatured = photo.layout === "featured";

            return (
              <button
                key={photo.src}
                type="button"
                className={`${styles.photoPreview} ${
                  isFeatured ? styles.photoPreviewFeatured : styles.photoPreviewSupporting
                }`}
                aria-label={`View photograph ${index + 1} of ${photos.length}: ${photo.alt}`}
                onClick={(event) => openGallery(index, event.currentTarget)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes={
                    isFeatured
                      ? "(max-width: 899px) 100vw, (max-width: 1280px) 62vw, 50rem"
                      : "(max-width: 899px) 50vw, (max-width: 1280px) 31vw, 25rem"
                  }
                  style={{ objectPosition: photo.objectPosition }}
                />
              </button>
            );
          })}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.photoDialog}
        aria-label="Photograph viewer"
        onCancel={handleDialogCancel}
        onClose={handleDialogClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeGallery();
        }}
      >
        {activePhoto && activeIndex !== null ? (
          <div className={styles.photoDialogFrame}>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.photoDialogClose}
              aria-label="Close photograph viewer"
              onClick={closeGallery}
            >
              <X size={24} aria-hidden="true" />
            </button>

            <p className={styles.photoCounter} aria-live="polite">
              {activeIndex + 1} / {photos.length}
            </p>

            <button
              type="button"
              className={`${styles.photoDialogNavigation} ${styles.photoDialogPrevious}`}
              aria-label="View previous photograph"
              onClick={() =>
                setActiveIndex((index) =>
                  index === null ? index : (index - 1 + photos.length) % photos.length,
                )
              }
            >
              <ChevronLeft size={28} aria-hidden="true" />
            </button>

            <div className={styles.photoLightboxStage}>
              <Image
                key={activePhoto.src}
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="100vw"
                className={styles.photoLightboxImage}
                draggable={false}
              />
            </div>

            <button
              type="button"
              className={`${styles.photoDialogNavigation} ${styles.photoDialogNext}`}
              aria-label="View next photograph"
              onClick={() =>
                setActiveIndex((index) =>
                  index === null ? index : (index + 1) % photos.length,
                )
              }
            >
              <ChevronRight size={28} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
