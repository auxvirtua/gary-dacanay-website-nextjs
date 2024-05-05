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
    <main className="flex min-h-screen flex-col justify-between lg:justify-normal lg:gap-4 p-24">
      {/* Header */}
      <div className="z-10 w-full items-center justify-between text-sm lg:flex">
        {/* Left */}
        <div className="flex flex-col lg:flex-row w-full items-center justify-center lg:static lg:w-auto gap-2">
          <p className="text-2xl font-black uppercase bg-[#FFD700] bg-clip-text text-transparent">${data.name}</p>

          <p className="font-semibold">For bookings, contact <a href={`mailto:${data.email}`}>{data.email}</a></p>
        </div>
        {/* Right */}
        <div className="flex gap-3 w-full items-center justify-center lg:size-auto">
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
          ))
          }
        </div>
      </div>

      {/* Bio */}
      <div className="lg:w-1/3 leading-loose">
        <p>{data.bio}</p>
      </div>

      {/* Modules */}
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {/* Videos */}
        <div
          className="group border border-transparent px-4 py-2 bg-stone-100 dark:bg-stone-900"
        >
          <h2 className="flex items-center mb-3 text-2xl font-semibold uppercase gap-2">
            <span className="text-xl font-black uppercase bg-[#FFD700] bg-clip-text text-transparent">Videos</span>
            <span className="block h-1 w-8 bg-[#FFD700] flex-1" />
          </h2>
          {data.videos.map(([title, videoId]) => (
            <div key={videoId} className="flex flex-col gap-2">
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Image
                  src={getThumbnail(videoId, VideoQuality.Medium)}
                  alt={title}
                  width={640}
                  height={360}
                  priority
                />
              </a>
              <p className="font-semibold">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
