import Image from "next/image";
import { Suspense, type CSSProperties } from "react";
import { Mail } from "lucide-react";
import data from "../data.json";
import { bookingHref } from "../content";
import { NavBar } from "./NavBar";
import { NewsletterForm } from "./NewsletterForm";
import { MusicSection } from "./MusicSection";
import { PhotoGallery } from "./PhotoGallery";
import { Performances } from "./Performances";
import { PerformancesSkeleton } from "./PerformancesSkeleton";
import { SectionHeading } from "./SectionHeading";
import styles from "./HomePage.module.css";

const footerLinks = [
  { label: "Email Gary", href: `mailto:${data.email}`, icon: "email", external: false },
  { label: "YouTube", href: data.social.youtube, icon: "/youtube.svg", external: true },
  { label: "Instagram", href: data.social.instagram, icon: "/instagram.svg", external: true },
  { label: "Facebook", href: data.social.facebook, icon: "/facebook.svg", external: true },
  { label: "Spotify", href: data.social.spotify, icon: "/spotify.svg", external: true },
  {
    label: "Apple Music",
    href: data.social.apple_music,
    icon: "/apple_music.svg",
    external: true,
  },
];

export function HomePage() {
  const videos = data.videos.map(([title, id]) => ({ title, id }));

  return (
    <div className={styles.site}>
      <NavBar name={data.name} bookingHref={bookingHref} />

      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="hero-title" className={styles.heroTitle}>
                The Great
                <br />
                American
                <br />
                Songbook,
                <br />
                <span>Live</span>
              </h1>
              <p className={styles.heroSupporting}>{data.hero.supportingCopy}</p>
            </div>

            <div className={styles.heroArtwork}>
              <Image
                src="/images/hero-gary.webp"
                alt="Gary Dacanay holding a sunburst hollow-body guitar"
                fill
                priority
                sizes="(max-width: 899px) 100vw, 56vw"
                className={styles.heroImage}
              />
            </div>
          </div>
        </section>

        <section className={styles.forHire} aria-labelledby="events-title">
          <div className={styles.forHireHeader}>
            <SectionHeading id="events-title">Events</SectionHeading>
          </div>

          <div className={styles.forHireShell}>
            <div className={styles.forHireIntro}>
              <p>
                A polished performance—welcoming as guests arrive, atmospheric through
                dinner, and memorable when the music takes center stage.
              </p>
              <a className={styles.darkButton} href={bookingHref}>
                Check availability
              </a>
            </div>

            <div className={styles.serviceGrid}>
              {data.services.map((service) => (
                <article className={styles.service} key={service.name}>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <MusicSection releases={data.music.releases} />

        <Suspense fallback={<PerformancesSkeleton videos={videos} />}>
          <Performances videos={videos} />
        </Suspense>

        <PhotoGallery />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerRuleFrame} aria-hidden="true">
          <div className={styles.footerRule} />
        </div>

        <section className={styles.newsletterShell} aria-labelledby="newsletter-title">
          <NewsletterForm />
        </section>

        <div className={styles.footerUtility}>
          <div className={styles.footerBottom}>
            <nav className={styles.socialBlock} aria-label="Gary's profiles and contact links">
              <div className={styles.socialLinks}>
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    title={link.label}
                  >
                    {link.icon === "email" ? (
                      <Mail aria-hidden="true" size={22} strokeWidth={1.7} />
                    ) : (
                      <span
                        aria-hidden="true"
                        className={styles.socialIcon}
                        style={{ "--icon": `url(${link.icon})` } as CSSProperties}
                      />
                    )}
                  </a>
                ))}
              </div>
            </nav>
            <span>&copy; {new Date().getFullYear()} {data.name}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
