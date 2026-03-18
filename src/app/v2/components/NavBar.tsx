"use client";

import { useEffect, useState } from "react";
import data from "../../data.json";
import styles from "./NavBar.module.css";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
    >
      <a href="#hero" className={styles.brand}>
        {data.name}
      </a>
      <div className={styles.links}>
        {[
          { label: "About", href: "#about" },
          { label: "Listen", href: "#listen" },
          { label: "Videos", href: "#videos" },
          { label: "Contact", href: "#contact" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={styles.link}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
