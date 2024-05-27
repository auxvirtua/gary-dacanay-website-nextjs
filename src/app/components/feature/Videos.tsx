import React, { Suspense } from "react";
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
          <Suspense key={videoId} fallback={<div>Loading...</div>}>
            <Video key={videoId} title={title} videoId={videoId} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
