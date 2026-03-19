"use client";

import type { FormEvent } from "react";
import Image from "next/image";
import data from "../../data.json";
import { subscribe } from "../../actions";
import { SocialIconRow } from "./SocialIconRow";
import styles from "./NewsletterSection.module.css";

const platforms = [
  { key: "spotify", label: "Spotify", icon: "/spotify.svg" },
  { key: "apple_music", label: "Apple Music", icon: "/apple_music.svg" },
] as const;

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const email = new FormData(e.currentTarget).get("email") as string;
  try {
    await subscribe(email);
    alert("Subscribed successfully!");
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again.");
  }
};

export function NewsletterSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.introColumn}>
          <div id="listen" className={styles.listenAnchor} />
          <p className={styles.kicker}>Contact & listening</p>
          <h2 className={styles.heading}>Stay in the Loop</h2>
          <p className={styles.copy}>
            Streaming, social links, and a quiet way to stay connected all live here now.
          </p>

          <div className={styles.listenGroup}>
            <div className={styles.streamColumn}>
              <p className={styles.noteLabel}>Stream</p>
              <div className={styles.platforms}>
                {platforms.map(({ key, label, icon }) => (
                  <a
                    key={key}
                    href={data.music[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.platformLink}
                  >
                    <Image
                      src={icon}
                      alt={`${label} logo`}
                      width={30}
                      height={30}
                      className={styles.platformIcon}
                    />
                    <span className={styles.platformLabel}>{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.connectColumn}>
              <p className={styles.noteLabel}>Connect</p>
              <SocialIconRow compact />
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          <p className={styles.formLabel}>Sign up for updates</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Subscribe
            </button>
          </form>
          <div className={styles.contactMeta}>
            <p className={styles.formNote}>Occasional notes only. No noise.</p>
            <a className={styles.emailLink} href={`mailto:${data.email}`}>
              {data.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
