"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./HomePage.module.css";

type NavigationItem = {
  label: string;
  href: string;
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableItems = mobileNavigationRef.current?.querySelectorAll<HTMLElement>(
        'a[href]',
      );
      if (!focusableItems?.length) return;

      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.requestAnimationFrame(() => {
      mobileNavigationRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      menuButton?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.matchMedia("(min-width: 900px)").matches) setOpen(false);
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
      <a className={styles.brand} href="#top" onClick={() => setOpen(false)}>
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

      <button
        type="button"
        className={styles.menuButton}
        ref={menuButtonRef}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav
        id="mobile-navigation"
        ref={mobileNavigationRef}
        className={`${styles.mobileNavigation} ${open ? styles.mobileNavigationOpen : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className={styles.mobileNavigationLinks}>
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
