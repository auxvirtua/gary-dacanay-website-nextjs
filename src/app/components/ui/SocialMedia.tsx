import Image from "next/image";
import data from "../../data.json";

export function SocialMedia() {
  return (
    <div className="flex w-full items-center justify-center gap-6 lg:size-auto">
      {Object.entries(data.social).map(([social, url]) => (
        <a
          key={social}
          href={url}
          title={social}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-light hover:text-gold"
        >
          <Image
            key={social}
            src={`/${social}.svg`}
            alt={`${social} logo`}
            className=""
            width={32}
            height={32}
            priority
          />
        </a>
      ))}
    </div>
  );
}
