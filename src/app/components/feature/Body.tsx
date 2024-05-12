import React from "react";
import data from "../../data.json";
import { Video } from "../index";
import Image from "next/image";

export function Hero() {
  return (
    <div className="flex gap-5 flex-col text-center w-3/4 items-center mx-auto">
        <div className="text-gold-light font-bold text-2xl italic">
          Sings and plays...
        </div>
        <div className="text-gold text-7xl font-black uppercase">Jazz Standards</div>
        <div className="text-gold-light font-bold text-2xl italic">
          from
        </div>
        <div className="text-gold text-5xl uppercase font-black">
          The Great American Songbook
        </div>
      <div className="flex flex-col items-center gap-10">
        <div className="text-gold-light text-xl italic font-bold">
          Available for your private corporate events, weddings, dinners and parties
        </div>
        <button type="button" className="text-gold-light text-1xl italic font-bold border-gold border-2 px-8 py-4">
        Book Now
      </button>
      </div>
    </div>
  );
}

export function Videos() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-gold text-3xl font-black uppercase">Videos</span>
      <div className="grid snap-both snap-mandatory grid-flow-row grid-cols-3 gap-4 overflow-x-auto overscroll-contain">
        {data.videos.map(([title, videoId]) => (
          <Video key={videoId} title={title} videoId={videoId} />
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

export function Body() {
  return (
    <div className="flex h-screen flex-col gap-8 overflow-auto lg:h-auto lg:overflow-visible">
      <hr className="border-gold-light border-2 mx-10" />
      <div className="flex flex-col gap-4">
        <Hero />
        <hr className="border-gold-light border-2 mx-10" />
        {/* <BackgroundImage /> */}
      </div>
      <Videos />
    </div>
  );
}
