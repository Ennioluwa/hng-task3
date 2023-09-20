"use client";

import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({ subsets: ["latin"] });

import { UserButton } from "@clerk/nextjs";
import useStore from "@/store/store";

const Navbar = () => {
  const { search, setSearch } = useStore();

  console.log(search, "navbar");

  return (
    <nav className="container mx-auto  p-5 bg-slate-600 text-white  flex flex-col gap-5">
      <div className="flex justify-between items-center gap-5 lg:gap-10">
        <h1 className={`${dancing.className} font-bold text-2xl`}>
          Image Gallery
        </h1>
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Enter search text!"
          className=" hidden grow sm:block px-3 py-1.5 outline-none border-none ring-[1px] rounded-md bg-white text-black"
        />
        <div className="h-8 w-8 rounded-full bg-slate-400">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Enter search text!"
        className=" block px-3 py-1.5 outline-none border-none ring-[1px] rounded-md bg-white text-black sm:hidden w-full"
      />
    </nav>
  );
};

export default Navbar;
