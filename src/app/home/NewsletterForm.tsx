"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { subscribe } from "../actions";
import styles from "./HomePage.module.css";

type FormState = {
  kind: "idle" | "success" | "error";
  message: string;
};

export function NewsletterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [state, setState] = useState<FormState>({ kind: "idle", message: "" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    if (typeof email !== "string") return;

    setSubmitting(true);
    setState({ kind: "idle", message: "" });

    try {
      const result = await subscribe(email);
      setState({ kind: result.ok ? "success" : "error", message: result.message });
      if (result.ok) form.reset();
    } catch {
      setState({
        kind: "error",
        message: "We couldn't complete the signup. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.newsletter}>
      <h2 id="newsletter-title">Join the newsletter</h2>
      <p>Occasional messages about upcoming performances, recordings, and new music.</p>
      <form onSubmit={handleSubmit} className={styles.newsletterForm}>
        <label htmlFor="newsletter-email">Email address</label>
        <div>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            disabled={submitting}
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Joining…" : "Join"}
          </button>
        </div>
      </form>
      {state.message ? (
        <p
          className={state.kind === "success" ? styles.formSuccess : styles.formError}
          role={state.kind === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
