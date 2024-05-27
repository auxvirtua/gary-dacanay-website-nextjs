import React from "react";
import { Divider } from "../ui/Divider";

export function Hero() {
  return (
    <>
      <div className="mx-auto flex w-3/4 flex-col items-center gap-3 text-center">
        <div className="text-xl font-bold italic text-gold-light md:text-3xl">
          ~ Sings and plays Jazz Standards and the Great American Songbook ~
        </div>
        <div className="text-sm font-bold italic text-gold-light md:text-xl">
          Available for your private corporate events, weddings, dinners and
          parties
        </div>
        <div className="flex flex-col items-center gap-5 md:gap-10">
          <div className="flex flex-col items-center gap-2">
            <button type="button">
              <span className="flex uppercase">Click here to book</span>
            </button>
            <span className="text-sm font-medium md:text-lg">
              or email Gary directly at{" "}
              <a className="underline" href="mailto:info@garydacanay.com">
                info@garydacanay.com
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
