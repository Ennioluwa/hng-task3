import Categories from "@/components/Categories";
import Gallery from "@/components/Gallery";
import Navbar from "@/components/Navbar";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-slate-600 min-h-screen overflow-hidden flex flex-col">
      <Navbar />
      <Categories />
      <Gallery />
    </div>
  );
}
