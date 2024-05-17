import Image from "next/image";

export function Video({ title, videoId }) {
  return (
    <div className="w-full flex-shrink-0 snap-center md:w-1/3 lg:w-1/5 landscape:w-1/3">
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
            width={160}
            height={90}
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
