import React from "react";
import data from "../../data.json";
import { Video } from "../ui/Video";

export function Videos() {
  return (
    <div className="flex flex-col gap-3 px-12">
      <span className="text-xl font-black uppercase text-gold md:text-3xl">
        Videos
      </span>
      <div className="flex snap-both snap-mandatory flex-nowrap gap-6 overflow-x-auto overscroll-contain pb-6">
        {data.videos.map(([title, videoId]) => (
          <Video key={videoId} title={title} videoId={videoId} />
        ))}
      </div>
    </div>
  );
}
