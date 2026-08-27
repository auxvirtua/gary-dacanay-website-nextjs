"use client";

import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";

export function NavBar({
  name,
  bookingHref,
}: {
  name: string;
  bookingHref: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
      <div className={styles.navContent}>
        <span className={styles.brand}>{name}</span>

        <a className={styles.mobileBooking} href={bookingHref}>
          Check availability
        </a>
      </div>
    </header>
  );
}
