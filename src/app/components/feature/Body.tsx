import React from "react";
import { Hero } from "./Hero";
import { Videos } from "./Videos";

export function Body() {
  return (
    <div className="flex flex-col gap-6 md:gap-12">
      <Hero />
      <Videos />
    </div>
  );
}
