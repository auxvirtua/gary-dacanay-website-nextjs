import Image from "next/image";

export function Video({ title, videoId }: { title: string; videoId: string }) {
  return (
    <div className="h-full w-[320px] snap-center">
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex cursor-pointer flex-col gap-4"
      >
        <div className="overflow-hidden">
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            width={320}
            height={180}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <p className="line-clamp-1 cursor-pointer text-center text-lg font-semibold underline underline-offset-2">
          {title}
        </p>
      </a>
    </div>
  );
}
