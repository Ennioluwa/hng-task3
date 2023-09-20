"use client";

import useStore from "@/store/store";

const Category = ({ name }: { name: string }) => {
  console.log(name);

  const { search, setSearch } = useStore();
  const handleSearch = () => {
    setSearch(name.toLowerCase());
  };
  return (
    <button
      onClick={handleSearch}
      className={`${
        search === name.toLowerCase()
          ? "bg-white text-slate-600"
          : "text-white bg-slate-600"
      } font-semibold border border-white px-5 py-1.5 rounded-md  hover:bg-white hover:text-slate-600 transition `}
    >
      {name}
    </button>
  );
};

export default Category;
