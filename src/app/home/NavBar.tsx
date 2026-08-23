"use client";

import { CalendarDays, Images, Music2, Video } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";

type NavigationItem = {
  label: string;
  href: string;
};

const mobileTabIcons = {
  "#music": Music2,
  "#videos": Video,
  "#photographs": Images,
  "#events": CalendarDays,
};

export function NavBar({
  name,
  navigation,
  bookingHref,
}: {
  name: string;
  navigation: NavigationItem[];
  bookingHref: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 899px)");
    let frame: number | null = null;

    const updateActiveTab = () => {
      frame = null;

      if (!mobileQuery.matches) {
        setActiveMobileTab(null);
        return;
      }

      const activationLine = 96;
      const visibleSection = [...navigation]
        .reverse()
        .find((item) => {
          const section = document.querySelector(item.href);
          return section instanceof HTMLElement && section.getBoundingClientRect().top <= activationLine;
        });

      setActiveMobileTab(visibleSection?.href ?? null);
    };

    const requestUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateActiveTab);
    };

    updateActiveTab();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    mobileQuery.addEventListener("change", requestUpdate);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      mobileQuery.removeEventListener("change", requestUpdate);
    };
  }, [navigation]);

  return (
    <>
      <header className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
        <a className={styles.brand} href="#top" aria-label={`${name}, home`}>
          {name}
        </a>

        <nav className={styles.desktopNavigation} aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className={styles.navBooking} href={bookingHref}>
            Check availability
          </a>
        </nav>

        <a className={styles.mobileBooking} href={bookingHref}>
          Check availability
        </a>
      </header>

      <nav className={styles.mobileTabs} aria-label="Explore this page">
        {navigation.map((item) => {
          const Icon = mobileTabIcons[item.href as keyof typeof mobileTabIcons];

          if (!Icon) return null;

          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeMobileTab === item.href ? "location" : undefined}
              onClick={() => setActiveMobileTab(item.href)}
            >
              <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
