import React from "react";
import Image from "next/image";

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
