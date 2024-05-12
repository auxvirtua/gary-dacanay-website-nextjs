import data from "../../data.json";

export function Header() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 p-12">
      <div className="text-gold text-7xl font-black uppercase px-[5%]">
        <div className="ml-[-10%]">{data.name.split(" ")[0]}</div>
        <div className="ml-[10%]">{data.name.split(" ")[1]}</div>
      </div>
      <div className="text-gold-light text-4xl font-black uppercase">Northeast Ohio</div>
    </div>
  );
}
