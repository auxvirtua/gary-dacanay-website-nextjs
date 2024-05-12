import React from "react";
import data from "../../data.json";
import { Video } from "../index";
import Image from "next/image";

export function Hero() {
  return (
    <div className="mx-auto flex w-3/4 flex-col items-center gap-5 text-center">
      <div className="text-gold-light text-2xl font-bold italic">
        Sings and plays...
      </div>
      <div className="text-gold text-8xl font-black uppercase">
        Jazz Standards
      </div>
      <div className="text-gold-light text-2xl font-bold italic">from</div>
      <div className="text-gold text-6xl font-black uppercase">
        The Great American Songbook
      </div>
      <div className="flex flex-col items-center gap-10">
        <div className="text-gold-light text-xl font-bold italic">
          Available for your private corporate events, weddings, dinners and
          parties
        </div>
        <div>
          <button
            type="button"
            className="bg-gold flex flex-col items-center gap-2 px-8 py-4 text-2xl font-bold text-stone-950"
          >
            <span className="uppercase">Click here to book</span>
          </button>
          <span className="text-sm font-medium">
            or email Gary directly at{" "}
            <a className="underline" href="mailto:info@garydacanay.com">
              info@garydacanay.com
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export function Videos() {
  return (
    <div className="flex flex-col gap-4 p-12">
      <span className="text-gold text-3xl font-black uppercase">Videos</span>
      <div className="flex snap-both snap-mandatory flex-nowrap gap-4 overflow-x-auto overscroll-contain py-6 px-12">
        {data.videos.map(([title, videoId]) => (
          <div className="w-1/3 flex-shrink-0 snap-start" key={videoId}>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer flex flex-col gap-4"
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
              <div className="flex aspect-video items-center justify-center overflow-hidden bg-black text-2xl font-black uppercase">
                Play
              </div>
              <p className="line-clamp-1 cursor-pointer font-semibold underline underline-offset-2">
                {title}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BackgroundImage() {
  return (
    <figure className="relative h-[600px] overflow-hidden">
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
  <hr className="border-gold-light mx-10 border-2" />
);

export function Body() {
  return (
    <div className="flex h-screen flex-col overflow-auto lg:h-auto lg:overflow-visible">
      <div className="flex flex-col gap-12">
        <Divider />
        <Hero />
        <Divider />
        {/* <BackgroundImage /> */}
      </div>
      <Videos />
    </div>
  );
}
