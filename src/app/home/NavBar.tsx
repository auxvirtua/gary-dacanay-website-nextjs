"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

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
          Book
        </a>
      </nav>

      <button
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav
        id="mobile-navigation"
        className={`${styles.mobileNavigation} ${open ? styles.mobileNavigationOpen : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className={styles.mobileBooking} href={bookingHref} onClick={() => setOpen(false)}>
          Book Gary
        </a>
      </nav>
    </header>
  );
}
