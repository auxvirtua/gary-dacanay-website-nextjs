import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between lg:justify-normal lg:gap-4 p-24">
      {/* Header */}
      <div className="z-10 w-full items-center justify-between text-sm lg:flex">
        {/* Left */}
        <div className="flex flex-col lg:flex-row w-full items-center justify-center lg:static lg:w-auto gap-2">
          <p className="text-2xl font-black uppercase bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent">Gary Dacanay</p>

          <p className="font-semibold">For bookings, contact <a href="mailto:info@garydacanay.com">info@garydacanay.com</a></p>
        </div>
        {/* Right */}
        <div className="flex gap-3 w-full items-center justify-center lg:size-auto">
          <Image
              src="/instagram.svg"
              alt="Instagram Logo"
              className=""
              width={24}
              height={24}
              priority
            />
          <Image
              src="/youtube.svg"
              alt="YouTube Logo"
              className=""
              width={24}
              height={24}
              priority
            />
          <Image
              src="/spotify.svg"
              alt="Spotify Logo"
              className=""
              width={24}
              height={24}
              priority
            />
          <Image
              src="/apple_music.svg"
              alt="Apple Music Logo"
              className=""
              width={24}
              height={24}
              priority
            />
        </div>
      </div>

      {/* Bio */}
      <div className="lg:w-1/2 leading-loose">
        <p>Gary Dacanay, a music professional in Northeast Ohio for over 20 years, sings and plays guitar on your favorite Jazz Standards and the Great American Songbook at your special events - weddings, dinners, cocktail parties, and corporate events.</p>
      </div>

      {/* Modules */}
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {/* Videos */}
        <div
          className="group border border-transparent px-4 py-2 bg-slate-100 dark:bg-slate-900"
        >
          <h2 className="flex items-center mb-3 text-2xl font-semibold uppercase gap-2">
            <span className="text-xl font-black uppercase bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent">Videos</span>
            <span className="block h-1 w-8 bg-gradient-to-r from-amber-800 to-amber-600 flex-1" />
          </h2>
        </div>
      </div>
    </main>
  );
}
