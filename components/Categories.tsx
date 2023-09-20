"use client";

import useStore from "@/store/store";
import Category from "./Category";
import { useEffect, useState } from "react";

const Categories = () => {
  const { search } = useStore();
  const [title, setTitle] = useState("World of Wonders");

  const categories = ["animals", "food", "nature", "technology"];

  useEffect(() => {
    if (search) {
      setTitle(() => {
        switch (search) {
          case "animals":
            return "Animals in the Wild";
          case "food":
            return "Food for the Senses";
          case "nature":
            return "Nature's Grandeur";
          case "technology":
            return "Technology's Future";
          default:
            return "World of Wonders";
        }
      });
    }
  }, [search]);

  return (
    <div className=" p-5 container mx-auto flex flex-col gap-5 text-white ">
      <h1 className=" text-3xl font-bold">{title}</h1>
      <div className="flex gap-3 overflow-x-auto mb-2">
        {categories.map((category) => (
          <Category key={category} name={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
