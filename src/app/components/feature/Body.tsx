import React from "react";
import data from "../../data.json";
import { Video } from "../index";
import Image from "next/image";

function Bio() {
  return (
    <div className="flex gap-5 font-black flex-col">
        <div className="text-gold-light text-4xl uppercase italic">
          Sings and plays...
        </div>
        <div className="text-gold text-7xl uppercase">Jazz Standards</div>
        <div className="text-gold-light text-4xl uppercase">
          from The Great American Songbook
        </div>
      <div className="flex gap-10 font-black">
        <div className="text-gold text-2xl">
          ...at private and corporate events, weddings, dinners and parties
        </div>
      </div>
    </div>
  );
}

export function Venues() {
  return (
    <div className="flex gap-10 font-black">
      <div className="text-gold text-2xl">
        ...at private and corporate events, weddings, dinners and parties
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
    <div className="flex h-screen flex-col gap-8 overflow-auto p-12 lg:h-auto lg:overflow-visible">
      <div className="flex gap-4">
        <Bio />
        {/* <hr className="border-gold-light" /> */}
        <BackgroundImage />
      </div>
      <Videos />
    </div>
  );
}
