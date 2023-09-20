const Categories = () => {
  return (
    <div className=" p-5 container mx-auto overflow-x-auto flex flex-col gap-5 text-white ">
      <h1 className=" text-3xl font-bold">Animals in the wild</h1>
      <div className="flex gap-3">
        <button className=" text-white font-semibold border border-white px-5 py-1.5 rounded-md  hover:bg-white hover:text-slate-600 transition ">
          Elephants
        </button>
        <button className=" text-white font-semibold border border-white px-5 py-1.5 rounded-md  hover:bg-white hover:text-slate-600 transition ">
          Lions
        </button>
        <button className=" text-white font-semibold border border-white px-5 py-1.5 rounded-md  hover:bg-white hover:text-slate-600 transition ">
          Rats
        </button>
      </div>
    </div>
  );
};

export default Categories;
