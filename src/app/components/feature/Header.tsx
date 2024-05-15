import data from "../../data.json";

export function Header() {
  return (
    <div className="flex flex-col items-center justify-between gap-2 p-8 md:gap-4 md:p-12">
      <div className="px-[5%] text-3xl font-black uppercase text-gold md:text-7xl">
        <div className="ml-[-10%]">{data.name.split(" ")[0]}</div>
        <div className="ml-[10%]">{data.name.split(" ")[1]}</div>
      </div>
      <div className="text-xl font-black uppercase text-gold-light md:text-4xl">
        Northeast Ohio
      </div>
    </div>
  );
}
