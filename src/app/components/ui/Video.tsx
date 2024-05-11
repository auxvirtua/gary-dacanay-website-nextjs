import Image from "next/image";
import { getVideoThumbnail } from "../../utilities/video";
import { VideoQuality } from "../../enums";

export function Video({ title, videoId }) {
  return (
    <div>
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        {/* <div className="overflow-hidden bg-black">
          <Image
            src="https://via.placeholder.com/160x90?text=No+thumbnail"
            alt={title}
            width={160}
            height={90}
            layout="responsive"
            priority />
        </div> */}
        <div className="overflow-hidden bg-black aspect-video flex justify-center items-center font-black uppercase text-2xl">
          Play
        </div>
        <p className="line-clamp-1 cursor-pointer font-semibold underline underline-offset-2">
          {title}
        </p>
      </a>
    </div>
  );
}
