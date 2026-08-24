"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { SectionHeading } from "./SectionHeading";
import styles from "./HomePage.module.css";

export type Video = {
  title: string;
  id: string;
};

const videoScrollStateKey = "videoShowcaseScrollY";

export function Performances({ videos }: { videos: Video[] }) {
  const searchParams = useSearchParams();
  const requestedVideo = videos.find(
    (video) => video.id === searchParams.get("watch"),
  );
  const initialRequestedVideoRef = useRef(requestedVideo);
  const [activeVideo, setActiveVideo] = useState<Video | null>(
    () => requestedVideo ?? videos[0] ?? null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const videoStageRef = useRef<HTMLDivElement>(null);
  const playerFrameRef = useRef<HTMLIFrameElement>(null);
  const shouldFocusPlayerRef = useRef(false);

  useEffect(() => {
    const syncVideoFromHistory = (event: PopStateEvent) => {
      const requestedId = new URL(window.location.href).searchParams.get("watch");
      const requestedVideo = videos.find((video) => video.id === requestedId);
      const storedScrollPosition = event?.state?.[videoScrollStateKey];

      setActiveVideo(requestedVideo ?? videos[0] ?? null);
      setIsPlaying(false);
      shouldFocusPlayerRef.current = false;

      if (typeof storedScrollPosition === "number") {
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: storedScrollPosition, behavior: "auto" });
        });
      } else if (requestedVideo) {
        window.requestAnimationFrame(() => {
          videoStageRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
        });
      }
    };

    if (initialRequestedVideoRef.current) {
      window.requestAnimationFrame(() => {
        videoStageRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }

    window.addEventListener("popstate", syncVideoFromHistory);

    return () => window.removeEventListener("popstate", syncVideoFromHistory);
  }, [videos]);

  useEffect(() => {
    if (!isPlaying || !shouldFocusPlayerRef.current) {
      return;
    }

    shouldFocusPlayerRef.current = false;
    playerFrameRef.current?.focus();
  }, [activeVideo, isPlaying]);

  const watchHref = (video: Video) => `/?watch=${encodeURIComponent(video.id)}#videos`;

  const pushVideoHistory = (video: Video) => {
    const url = new URL(window.location.href);
    const isCurrentVideo = url.searchParams.get("watch") === video.id;
    const currentState = {
      ...window.history.state,
      [videoScrollStateKey]: window.scrollY,
    };

    window.history.replaceState(currentState, "", window.location.href);

    url.searchParams.set("watch", video.id);
    url.hash = "videos";

    if (isCurrentVideo) {
      window.history.replaceState(currentState, "", url);
    } else {
      window.history.pushState(currentState, "", url);
    }
  };

  const playVideo = (video: Video, shouldFocusPlayer = false) => {
    shouldFocusPlayerRef.current = shouldFocusPlayer;
    setActiveVideo(video);
    setIsPlaying(false);
    pushVideoHistory(video);

    if (window.matchMedia("(max-width: 899px)").matches) {
      videoStageRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
      window.requestAnimationFrame(() => {
        window.history.replaceState(
          {
            ...window.history.state,
            [videoScrollStateKey]: window.scrollY,
          },
          "",
          window.location.href,
        );
        setIsPlaying(true);
      });
      return;
    }

    setIsPlaying(true);
  };

  const handlePlaylistClick = (event: MouseEvent<HTMLAnchorElement>, video: Video) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    playVideo(video, event.detail === 0);
  };

  const handlePlaylistKeyDown = (
    event: KeyboardEvent<HTMLAnchorElement>,
    video: Video,
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    playVideo(video, true);
  };

  return (
    <section id="videos" className={styles.performances} aria-labelledby="performances-title">
      <div className={styles.sectionHeader}>
        <SectionHeading id="performances-title">Videos</SectionHeading>
      </div>

      {activeVideo ? (
        <div className={styles.videoExperience}>
          <div ref={videoStageRef} className={styles.videoStage}>
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
                  onClick={(event) => playVideo(activeVideo, event.detail === 0)}
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
                  <a
                    href={watchHref(video)}
                    className={`${styles.playlistItem} ${isActive ? styles.playlistItemActive : ""}`}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Play ${video.title}`}
                    onClick={(event) => handlePlaylistClick(event, video)}
                    onKeyDown={(event) => handlePlaylistKeyDown(event, video)}
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
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
