import Image from "next/image";

export function SocialMedia() {
  return (
    <div className="flex w-full items-center justify-center gap-6 lg:size-auto">
      {["instagram", "youtube", "spotify", "apple_music"].map((social) => (
        <Image
          key={social}
          src={`/${social}.svg`}
          alt={`${social} logo`}
          className=""
          width={32}
          height={32}
          priority />
      ))}
    </div>
  );
}
