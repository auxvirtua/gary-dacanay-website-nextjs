"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./artwork-review.module.css";

const candidates = {
  youtube: {
    label: "Candidate A · YouTube",
    detail: "Indoor performance frame · black hollow-body guitar",
    src: "/images/artwork-candidates/hero-youtube.png",
  },
  bg: {
    label: "Candidate B · bg.png",
    detail: "High-resolution portrait · sunburst hollow-body guitar",
    src: "/images/artwork-candidates/hero-bg.png",
  },
} as const;

type CandidateKey = keyof typeof candidates;

function HeroCopy() {
  return (
    <div className={styles.heroCopy}>
      <p className={styles.eyebrow}>Jazz vocalist + guitarist</p>
      <h2 className={styles.heroTitle}>
        The Great American Songbook, <em>Live.</em>
      </h2>
      <p className={styles.supportingCopy}>
        Timeless jazz for concerts, weddings, dinners, and private events.
      </p>
      <div className={styles.actions} aria-hidden="true">
        <span className={styles.primaryAction}>Book Gary</span>
        <span className={styles.secondaryAction}>Watch &amp; listen</span>
      </div>
    </div>
  );
}

function Artwork({ src, sizes }: { src: string; sizes: string }) {
  return (
    <div className={styles.artwork}>
      <Image src={src} alt="" fill priority sizes={sizes} className={styles.artworkImage} />
      <span className={styles.stamp} aria-hidden="true">
        Available
        <br />
        for your
        <br />
        event
      </span>
    </div>
  );
}

export function ArtworkReview() {
  const [selected, setSelected] = useState<CandidateKey>("youtube");
  const candidate = candidates[selected];

  return (
    <div className={styles.page}>
      <header className={styles.reviewHeader}>
        <p className={styles.kicker}>July 2026 redesign · artwork checkpoint</p>
        <h1>Choose the hero portrait</h1>
        <p>
          Both candidates use the same crop target, palette, lighting, halftone, and
          paper treatment. Only the primary source photograph changes.
        </p>
      </header>

      <section className={styles.standalone} aria-labelledby="standalone-title">
        <div className={styles.sectionHeading}>
          <span>01</span>
          <h2 id="standalone-title">Standalone artwork</h2>
        </div>
        <div className={styles.candidateGrid}>
          {Object.entries(candidates).map(([key, item]) => (
            <figure className={styles.candidate} key={key}>
              <div className={styles.candidateImage}>
                <Image
                  src={item.src}
                  alt={`${item.label} hero artwork`}
                  fill
                  loading="eager"
                  sizes="(max-width: 800px) 100vw, 50vw"
                />
              </div>
              <figcaption>
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.context} aria-labelledby="context-title">
        <div className={styles.sectionHeading}>
          <span>02</span>
          <h2 id="context-title">Same artwork, in context</h2>
        </div>

        <div className={styles.switcher} aria-label="Select artwork candidate">
          {(Object.keys(candidates) as CandidateKey[]).map((key) => (
            <button
              type="button"
              key={key}
              aria-pressed={selected === key}
              onClick={() => setSelected(key)}
            >
              {candidates[key].label}
            </button>
          ))}
        </div>

        <p className={styles.selectionNote}>{candidate.detail}</p>

        <div className={styles.desktopPreview}>
          <div className={styles.previewNav}>
            <span>Gary Dacanay</span>
            <span>Listen&nbsp;&nbsp;&nbsp; About&nbsp;&nbsp;&nbsp; For hire&nbsp;&nbsp;&nbsp; Book</span>
          </div>
          <div className={styles.desktopHero}>
            <HeroCopy />
            <Artwork src={candidate.src} sizes="55vw" />
          </div>
        </div>

        <div className={styles.mobilePreview}>
          <div className={styles.mobileNav}>
            <span>Gary Dacanay</span>
            <span>Menu</span>
          </div>
          <HeroCopy />
          <Artwork src={candidate.src} sizes="390px" />
        </div>
      </section>
    </div>
  );
}
