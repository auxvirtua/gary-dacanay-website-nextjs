import React from "react";
import data from "../../data.json";
import Image from "next/image";

export function Hero() {
  return (
    <>
      <Divider />
      <div className="mx-auto flex w-3/4 flex-col items-center gap-5 text-center">
        <div className="text-2xl font-bold italic text-gold-light">
          ~ Sings and plays ~
        </div>
        <div className="text-3xl font-black uppercase text-gold md:text-8xl">
          Jazz Standards
        </div>
        <div className="text-xl font-bold italic text-gold-light md:text-2xl">
          ~ and more from ~
        </div>
        <div className="text-2xl font-black uppercase text-gold md:text-5xl">
          The Great American Songbook
        </div>
        <div className="flex flex-col items-center gap-5 md:gap-10">
          <div className="text-md font-bold italic text-gold-light md:text-xl">
            Available for your private corporate events, weddings, dinners and
            parties
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              className="text-md align-center flex flex-col gap-2 bg-gold px-8 py-4 text-center font-bold text-stone-950 md:text-2xl"
            >
              <span className="flex uppercase">Click here to book</span>
            </button>
            <span className="text-xs font-medium md:text-sm">
              or email Gary directly at{" "}
              <a className="underline" href="mailto:info@garydacanay.com">
                info@garydacanay.com
              </a>
            </span>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
}

export function Videos() {
  return (
    <div className="flex flex-col gap-4 md:p-12">
      {/* <span className="text-center text-xl font-black uppercase text-gold">
        Videos
      </span> */}
      <div className="flex snap-both snap-mandatory flex-nowrap gap-2 overflow-x-auto overscroll-contain p-6 md:p-12">
        {data.videos.map(([title, videoId]) => (
          <Video key={videoId} title={title} videoId={videoId} />
        ))}
      </div>
    </div>
  );
}

export function Video({ title, videoId }: { title: string; videoId: string }) {
  return (
    <div
      className="w-full flex-shrink-0 snap-center sm:w-1/2 lg:w-1/4"
      key={videoId}
    >
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex cursor-pointer flex-col gap-4"
      >
        <div className="overflow-hidden bg-black">
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            width={160}
            height={90}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        {/* <div className="flex aspect-video items-center justify-center overflow-hidden bg-black text-2xl font-black uppercase">
        Play
      </div> */}
        <p className="line-clamp-1 cursor-pointer text-center text-lg font-semibold underline underline-offset-2">
          {title}
        </p>
      </a>
    </div>
  );
}

export function BackgroundImage() {
  return (
    <figure className="relative overflow-hidden">
      <Image
        src="/bg.png"
        alt="Picture of Gary Dacanay holding a guitar in a park with the Orton Effect applied"
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
          position: "absolute",
          mixBlendMode: "lighten",
          filter: "blur(20px)",
          opacity: 0.35,
        }}
        width={500}
        height={300}
      ></Image>
      <Image
        src="/bg.png"
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
        aria-hidden
        alt=""
        width={500}
        height={300}
        className=""
      ></Image>
    </figure>
  );
}

export const Divider = () => (
  <hr className="mx-10 border-2 border-gold-light" />
);

export function Body() {
  return (
    <div className="flex flex-col gap-6 md:gap-12">
      <Hero />
      <Videos />
    </div>
  );
}
