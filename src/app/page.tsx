import Image from "next/image";
import data from "./data.json";

enum VideoQuality {
  Low = "low",
  Medium = "medium",
  High = "high",
  Max = "max",
}

function getThumbnail(videoId: string, quality: VideoQuality): string | null {
  // iterate through the quality options
  // and return the first one that is available
  // in the order of max, high, medium, low
  // if none are available, return null

  const qualities = Object.values(VideoQuality);
  const index = qualities.indexOf(quality);

  for (let i = index; i < qualities.length; i++) {
    const quality = qualities[i];
    const thumbnail = `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
    return thumbnail;
  }

  return null; // Return null if no thumbnail is found
}

export default function Home() {
  return (
    <main className="max-w-screen flex max-h-screen flex-col justify-between gap-4 overflow-hidden p-12 lg:max-h-none lg:justify-normal lg:p-24">
      {/* Header */}
      <div className="z-10 flex w-full flex-col items-center justify-between gap-4 text-sm lg:flex lg:flex-row">
        {/* Left */}
        <div className="flex w-full flex-col items-center justify-center gap-2 lg:w-auto lg:flex-row">
          {/* Name */}
          <p className="bg-[#FFD700] bg-clip-text text-2xl font-black uppercase text-transparent">
            {data.name}
          </p>
          {/* Bookings Link */}
          <p className="text-center font-semibold lg:text-left">
            For bookings, contact{" "}
            <a href={`mailto:${data.email}`}>{data.email}</a>
          </p>
        </div>
        {/* Right */}
        <div className="flex w-full items-center justify-center gap-3 lg:size-auto">
          {["instagram", "youtube", "spotify", "apple_music"].map((social) => (
            <Image
              key={social}
              src={`/${social}.svg`}
              alt={`${social} logo`}
              className=""
              width={24}
              height={24}
              priority
            />
          ))}
        </div>
      </div>

      <div className="h-screen overflow-auto lg:h-auto lg:overflow-visible">
        {/* Bio */}
        <div className="self-center text-justify lg:w-1/2">
          <p>{data.bio}</p>
        </div>

        {/* Modules */}
        <div className="mb-32 flex text-center lg:text-left">
          {/* Videos Container */}
          <div className="group overflow-x-hidden border border-transparent bg-stone-100 px-4 py-2 dark:bg-stone-900">
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold uppercase">
              <span className="bg-[#FFD700] bg-clip-text text-xl font-black uppercase text-transparent">
                Videos
              </span>
              <span className="block h-1 w-8 flex-1 bg-[#FFD700]" />
            </h2>
            {/* Videos List */}
            <div className="grid snap-both snap-mandatory grid-flow-col gap-4 overflow-x-auto overscroll-contain">
              {data.videos.map(([title, videoId]) => (
                <div key={videoId} className="snap-center">
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <div className="w-fit overflow-hidden bg-black">
                      <Image
                        src={getThumbnail(videoId, VideoQuality.Medium)}
                        alt={title}
                        width={240}
                        height={135}
                        priority
                      />
                    </div>
                    {/* <Image
                    src={getThumbnail(videoId, VideoQuality.Medium)}
                    alt={title}
                    width={640}
                    height={360}
                    priority
                  /> */}
                  </a>
                  <p className="font-semibold">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </main>
  );
}
