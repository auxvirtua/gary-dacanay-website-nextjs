"use client";

import type { FormEvent } from "react";
import { subscribe } from "../../actions";
import styles from "./NewsletterSection.module.css";

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
        <p className={styles.kicker}>Newsletter</p>
        <h2 className={styles.heading}>Stay in the Loop</h2>
        <p className={styles.copy}>
          Join the mailing list for updates on performances, new music, and
          more.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className={styles.input}
          />
          <button
            type="submit"
            className={styles.button}
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
