import data from "../../data.json";

export function Header() {
  return (
    <div className="flex flex-col items-center justify-between gap-1 py-6 md:gap-4 md:py-12">
      <div className="px-[5%] text-3xl font-black uppercase text-gold md:text-5xl">
        <div>{data.name}</div>
      </div>
      <div className="text-xl font-black uppercase text-gold-light md:text-3xl">
        {data.subdescription}
      </div>
    </div>
  );
}
