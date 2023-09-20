"use client";

import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className=" grow h-full flex flex-col justify-center items-center">
      <BeatLoader size={50} color="white" />
    </div>
  );
};

export default Loader;
