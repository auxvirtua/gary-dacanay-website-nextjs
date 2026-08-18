"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Home, Images, Music2, Video, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import data from "../data.json";
import { bookingHref } from "../content";
import { NewsletterForm } from "../home/NewsletterForm";
import styles from "./LivingPosterShell.module.css";

const routes = [
  { label: "Home", href: "/", icon: Home },
  { label: "Music", href: "/music", icon: Music2 },
  { label: "Videos", href: "/videos", icon: Video },
  { label: "Photos", href: "/photos", icon: Images },
];

const platforms = [
  { label: "YouTube", href: data.social.youtube, icon: "/youtube.svg" },
  { label: "Instagram", href: data.social.instagram, icon: "/instagram.svg" },
  { label: "Facebook", href: data.social.facebook, icon: "/facebook.svg" },
  { label: "Spotify", href: data.music.spotify, icon: "/spotify.svg" },
  { label: "Apple Music", href: data.music.apple_music, icon: "/apple_music.svg" },
];

type Drawer = "booking" | "newsletter" | null;

export function LivingPosterShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [drawer, setDrawer] = useState<Drawer>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === "/";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (drawer) {
      if (!dialog.open) dialog.showModal();
      window.requestAnimationFrame(() => closeRef.current?.focus());
    } else if (dialog.open) {
      dialog.close();
    }
  }, [drawer]);

  return (
    <div className={styles.shell} data-home={isHome ? "true" : "false"}>
      {isHome ? (
        <div className={styles.posterBackdrop} aria-hidden="true">
          <Image
            src="/images/hero-gary.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.posterImage}
          />
        </div>
      ) : null}

      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label={`${data.name}, home`}>
          {data.name}
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              aria-current={pathname === route.href ? "page" : undefined}
              onClick={() => setDrawer(null)}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={styles.availabilityButton}
          onClick={() => setDrawer("booking")}
        >
          <CalendarDays size={15} aria-hidden="true" />
          <span>Availability</span>
        </button>
      </header>

      <main className={styles.canvas}>{children}</main>

      <footer className={styles.desktopUtilities}>
        <button type="button" onClick={() => setDrawer("booking")}>
          <span>Plan an event</span>
          <strong>Check availability →</strong>
        </button>
        <button type="button" onClick={() => setDrawer("newsletter")}>
          <span>Stay in tune</span>
          <strong>Join the mailing list</strong>
        </button>
        <PlatformLinks className={styles.desktopPlatforms} />
      </footer>

      <PlatformLinks className={styles.mobilePlatforms} />

      <nav className={styles.mobileTabs} aria-label="Primary navigation">
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <Link
              key={route.href}
              href={route.href}
              aria-current={pathname === route.href ? "page" : undefined}
              onClick={() => setDrawer(null)}
            >
              <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </nav>

      <dialog
        ref={dialogRef}
        className={styles.utilityDialog}
        aria-labelledby="utility-dialog-title"
        onClose={() => setDrawer(null)}
        onCancel={(event) => {
          event.preventDefault();
          setDrawer(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setDrawer(null);
        }}
      >
        <div className={styles.utilityPanel}>
          <button
            ref={closeRef}
            type="button"
            className={styles.dialogClose}
            aria-label="Close panel"
            onClick={() => setDrawer(null)}
          >
            <X size={20} aria-hidden="true" />
          </button>

          {drawer === "booking" ? (
            <div className={styles.bookingPanel}>
              <p className={styles.kicker}>Live music, considered for the room</p>
              <h2 id="utility-dialog-title">Bring the songbook to your event</h2>
              <p className={styles.dialogCopy}>
                Share the date, location, occasion, and guest count. Gary will follow up
                with availability.
              </p>
              <div className={styles.eventTypes} aria-label="Event types">
                {data.services.map((service) => (
                  <span key={service.name}>{service.name}</span>
                ))}
              </div>
              <div className={styles.bookingActions}>
                <a className={styles.primaryAction} href={bookingHref}>
                  Start an inquiry
                </a>
                <a className={styles.emailLink} href={`mailto:${data.email}`}>
                  {data.email}
                </a>
              </div>
            </div>
          ) : drawer === "newsletter" ? (
            <div className={styles.newsletterPanel}>
              <p className={styles.kicker}>New recordings &amp; performances</p>
              <NewsletterForm titleId="utility-dialog-title" />
            </div>
          ) : null}
        </div>
      </dialog>
    </div>
  );
}

function PlatformLinks({ className }: { className: string }) {
  return (
    <div className={className}>
      <span>Follow / listen</span>
      <div>
        {platforms.map((platform) => (
          <a
            key={platform.label}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform.label}
          >
            <Image src={platform.icon} alt="" width={18} height={18} />
          </a>
        ))}
      </div>
    </div>
  );
}
