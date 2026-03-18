import { Play } from "lucide-react";
import Image from "next/image";
import styles from "./VideoCard.module.css";

export function VideoCard({
  title,
  videoId,
}: {
  title: string;
  videoId: string;
}) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.media}>
        <Image
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className={styles.overlay}>
          <div className={styles.playBadge}>
            <Play size={18} className={styles.playIcon} />
          </div>
        </div>
      </div>

      <div className={styles.titleBar}>
        <p className={styles.title}>{title}</p>
      </div>
    </a>
  );
}
