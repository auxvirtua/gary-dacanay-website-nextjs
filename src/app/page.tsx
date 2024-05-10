import Image from "next/image";
import data from "./data.json";
import { getVideoThumbnail } from "./utilities/video";
import { VideoQuality } from "./enums";

function Video({ title, videoId }) {
  return (
    <div>
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
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
        <p className="font-semibold line-clamp-1 underline underline-offset-2 cursor-pointer">{title}</p>
      </a>
    </div>
  );
}

function VideoList() {
  return (
    <div className="grid snap-both snap-mandatory grid-flow-row grid-cols-3 gap-4 overflow-x-auto overscroll-contain">
      {data.videos.map(([title, videoId]) => (
        <Video key={videoId} title={title} videoId={videoId} />
      ))}
    </div>
  );
}

function MailingListSignup() {
  return (
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
  );
}

function Bio() {
  return (
    <div className="self-center text-justify leading-8 text-xl">
      Singing and playing your favorite Jazz Standards and songs from The
      Great American Songbook in Northeast Ohio for over 20 years. Available
      for private or corporate events, weddings, dinners, and parties. For
      bookings, contact <a className="underline cursor-pointer" href={`mailto:${data.email}`}>{data.email}</a>
    </div>
  );
}

function Header() {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 text-sm lg:flex lg:flex-row p-12">
      <p className="bg-[hsl(45,90%,60%)] bg-clip-text text-6xl font-black uppercase text-transparent">
        {data.name}
      </p>
    </div>
  );
}

function Body() {
  return (
    <div className="flex h-screen flex-col gap-8 overflow-auto lg:h-auto lg:w-2/3 lg:overflow-visible p-12">
      <Bio />
      <div className="flex text-center lg:text-left">
        <div className="group flex flex-col gap-4 overflow-x-hidden bg-stone-800 p-6">
          <h2 className="flex items-center gap-2 text-2xl font-semibold uppercase">
            <span className="bg-[hsl(45,90%,60%)] bg-clip-text text-3xl font-black uppercase text-transparent">
              Videos
            </span>
          </h2>
          <VideoList />
          <MailingListSignup />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="max-w-screen flex max-h-screen flex-col justify-between gap-12 overflow-hidden bg-stone-900 lg:min-h-screen lg:justify-normal">
      {/* Header */}
      <Header />
      {/* Body */}
      <Body />
    </main>
  );
}
