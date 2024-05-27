import React from "react";
import { Divider } from "../ui/Divider";

export function Hero() {
  return (
    <>
      <div className="mx-auto flex w-3/4 flex-col items-center gap-3 text-center">
        <div className="text-xl font-bold italic text-gold-light md:text-3xl">
          ~ Sings and plays ~
        </div>
        <div className="text-3xl font-black uppercase text-gold md:text-6xl">
          Jazz Standards
        </div>
        <div className="text-lg font-bold italic text-gold-light md:text-2xl">
          ~ and ~
        </div>
        <div className="text-2xl font-black uppercase text-gold md:text-6xl">
          The Great American Songbook
        </div>
        <div className="flex flex-col items-center gap-5 md:gap-10">
          <div className="text-sm font-bold italic text-gold-light md:text-xl">
            Available for your private events, weddings, dinners, and parties.
          </div>
          <div className="flex flex-col items-center gap-2">
            <a href="mailto:info@garydacanay.com" className="button">
              Email Gary to book
            </a>
            <span className="text-xs text-gold-light md:text-sm">
              (Opens your email client)
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
