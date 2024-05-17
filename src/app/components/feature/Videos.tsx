import React from "react";
import data from "../../data.json";
import { Video } from "../ui/Video";

export function Videos() {
  return (
    <div className="flex flex-col md:p-6">
      <span className="text-center text-xl font-black uppercase text-gold md:text-3xl">
        Videos
      </span>
      <div className="flex snap-both snap-mandatory flex-nowrap gap-2 overflow-x-auto overscroll-contain py-6">
        {data.videos.map(([title, videoId]) => (
          <Video key={videoId} title={title} videoId={videoId} />
        ))}
      </div>
    </div>
  );
}
