import Image from "next/image";
import data from "./data.json";
import { getVideoThumbnail } from "./utilities/video";
import { VideoQuality } from "./enums";

export default function Home() {
  return (
    <main className="max-w-screen lg:p-18 flex max-h-screen flex-col justify-between gap-2 overflow-hidden bg-stone-900 p-12 lg:min-h-screen lg:justify-normal">
      {/* Header */}
      <div className="flex w-full flex-col items-center justify-between gap-4 text-sm lg:flex lg:flex-row">
        {/* Name */}
        <p className="bg-[hsl(45,68%,50%)] bg-clip-text text-4xl font-black uppercase text-transparent">
          {data.name}
        </p>
        {/* Right */}
        <div className="flex w-full items-center justify-center gap-6 lg:size-auto">
          {["instagram", "youtube", "spotify", "apple_music"].map((social) => (
            <Image
              key={social}
              src={`/${social}.svg`}
              alt={`${social} logo`}
              className=""
              width={32}
              height={32}
              priority
            />
          ))}
        </div>
      </div>

      <div className="flex h-screen flex-col gap-8 overflow-auto lg:h-auto lg:w-1/2 lg:overflow-visible">
        {/* Bio */}
        <div className="self-center text-justify leading-8">
          Singing and playing your favorite Jazz Standards and songs from The
          Great American Songbook in Northeast Ohio for over 20 years. Available
          for private or corporate events, weddings, dinners, and parties. For
          bookings, contact <a href={`mailto:${data.email}`}>{data.email}</a>
        </div>

        {/* Modules */}
        <div className="flex text-center lg:text-left">
          {/* Videos */}
          <div className="group flex flex-col gap-4 overflow-x-hidden bg-stone-800 p-4">
            <h2 className="flex items-center gap-2 text-2xl font-semibold uppercase">
              <span className="bg-[hsl(45,68%,50%)] bg-clip-text text-xl font-black uppercase text-transparent">
                Videos
              </span>
              {/* span with gold gradient */}
              {/* <span className="block h-0.5 w-8 flex-1 bg-[hsl(45,68%,50%)] opacity-25" /> */}
            </h2>
            {/* Video List */}
            <div className="grid snap-both snap-mandatory grid-flow-row grid-cols-3 gap-4 overflow-x-auto overscroll-contain">
              {data.videos.map(([title, videoId]) => (
                <div key={videoId} className="snap-center">
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <div className="overflow-hidden bg-black">
                      <Image
                        src={getVideoThumbnail(videoId, VideoQuality.Medium)}
                        alt={title}
                        width={160}
                        height={90}
                        priority
                      />
                    </div>
                    <p className="font-semibold">{title}</p>
                  </a>
                </div>
              ))}
            </div>
            {/* Mailing list signup */}
            <div className="mt-4 flex gap-2">
              <p className="font-semibold">Sign up for my mailing list</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-black dark:border-white"
                />
                <button className="border border-black dark:border-white">
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </main>
  );
}
