import Image from "next/image";
import { Suspense } from "react";
import data from "../data.json";
import { bookingHref } from "../content";
import { NavBar } from "./NavBar";
import { NewsletterForm } from "./NewsletterForm";
import { PhotoGallery } from "./PhotoGallery";
import { Performances } from "./Performances";
import { PerformancesSkeleton } from "./PerformancesSkeleton";
import styles from "./HomePage.module.css";

const socialPlatforms = [
  { label: "YouTube", href: data.social.youtube, icon: "/youtube.svg" },
  { label: "Instagram", href: data.social.instagram, icon: "/instagram.svg" },
  { label: "Facebook", href: data.social.facebook, icon: "/facebook.svg" },
];

export function HomePage() {
  const videos = data.videos.map(([title, id]) => ({ title, id }));

  return (
    <div className={styles.site}>
      <NavBar name={data.name} navigation={data.navigation} bookingHref={bookingHref} />

      <main>
        <section id="top" className={styles.hero} aria-labelledby="hero-title">
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
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={bookingHref}>
                  Check availability
                </a>
                <a className={styles.secondaryButton} href="#videos">
                  Watch videos
                </a>
              </div>
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

        <Suspense fallback={<PerformancesSkeleton videos={videos} />}>
          <Performances videos={videos} />
        </Suspense>

        <PhotoGallery />

        <section id="events" className={styles.forHire} aria-labelledby="events-title">
          <div className={styles.forHireShell}>
            <div className={styles.forHireIntro}>
              <h2 id="events-title">Music for Any Room</h2>
              <p>
                A polished performance—welcoming as guests arrive, atmospheric through
                dinner, and memorable when the music takes center stage.
              </p>
              <a className={styles.darkButton} href={bookingHref}>
                Check availability
              </a>
            </div>

            <div className={styles.serviceGrid}>
              {data.services.map((service, index) => (
                <article className={styles.service} key={service.name}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer id="contact" className={styles.footer}>
        <div className={styles.footerMain}>
          <div className={styles.footerBooking}>
            <h2>Bring the songbook to your event</h2>
            <p>
              Share the date, location, occasion, and guest count. Gary will follow up
              with availability.
            </p>
            <a className={styles.primaryButton} href={bookingHref}>
              Check availability
            </a>
            <a className={styles.emailLink} href={`mailto:${data.email}`}>
              {data.email}
            </a>
          </div>

          <div className={styles.footerConnect}>
            <NewsletterForm />
            <div className={styles.socialBlock}>
              <p>Follow Gary</p>
              <div className={styles.socialLinks}>
                {socialPlatforms.map((platform) => (
                  <a
                    key={platform.label}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform.label}
                  >
                    <Image src={platform.icon} alt="" width={24} height={24} />
                    <span>{platform.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>{data.name}</span>
          <span>&copy; {new Date().getFullYear()} {data.name}</span>
        </div>
      </footer>
    </div>
  );
}
