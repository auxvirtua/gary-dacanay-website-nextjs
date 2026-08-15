"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import styles from "./MusicSection.module.css";

type MusicRelease = {
  slug: string;
  title: string;
  artwork: string;
  status: string;
  description?: string;
  spotifyUrl?: string;
  featured?: boolean;
};

type SpotifyOEmbed = {
  iframe_url?: string;
};

function embedFallbackUrl(spotifyUrl: string) {
  const trackId = new URL(spotifyUrl).pathname.split("/").pop();
  return `https://open.spotify.com/embed/track/${trackId}`;
}

export function MusicSection({ releases }: { releases: MusicRelease[] }) {
  const release = releases.find((item) => item.featured && item.status === "released");
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isLoadingEmbed, setIsLoadingEmbed] = useState(false);

  if (!release || !release.spotifyUrl) {
    return null;
  }

  const spotifyUrl = release.spotifyUrl;
  const playerId = `spotify-player-${release.slug}`;

  async function revealPlayer() {
    if (embedUrl || isLoadingEmbed) return;

    setIsLoadingEmbed(true);

    try {
      const response = await fetch(
        `https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`,
      );

      if (!response.ok) {
        throw new Error("Spotify oEmbed request failed.");
      }

      const embed = (await response.json()) as SpotifyOEmbed;
      setEmbedUrl(embed.iframe_url ?? embedFallbackUrl(spotifyUrl));
    } catch {
      setEmbedUrl(embedFallbackUrl(spotifyUrl));
    } finally {
      setIsLoadingEmbed(false);
    }
  }

  return (
    <section id="music" className={styles.music} aria-labelledby="music-title">
      <div className={styles.shell}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Music</p>
          <h2 id="music-title">New release</h2>
        </div>

        <article className={styles.release}>
          <a
            className={styles.artworkLink}
            href={release.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${release.title} in Spotify`}
          >
            <Image
              src={release.artwork}
              alt={`Cover art for ${release.title}`}
              fill
              sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 899px) 22rem, 26rem"
              className={styles.artwork}
            />
          </a>

          <div className={styles.releaseDetails}>
            <p className={styles.releaseType}>Single</p>
            <h3>{release.title}</h3>
            {release.description ? <p className={styles.description}>{release.description}</p> : null}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.listenButton}
                aria-controls={playerId}
                aria-expanded={Boolean(embedUrl)}
                disabled={isLoadingEmbed}
                onClick={revealPlayer}
              >
                <Play size={18} fill="currentColor" aria-hidden="true" />
                {isLoadingEmbed ? "Loading player" : "Listen now"}
              </button>
              <a
                className={styles.spotifyLink}
                href={release.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/spotify.svg" alt="" width={20} height={20} />
                Open in Spotify
              </a>
            </div>

            {embedUrl ? (
              <div id={playerId} className={styles.player}>
                <iframe
                  src={embedUrl}
                  title={`Spotify: ${release.title}`}
                  width="100%"
                  height="152"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}
