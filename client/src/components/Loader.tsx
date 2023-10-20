import React from "react";
import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-black/10 z-50">
      <FadeLoader color="#2ecc71" />
    </div>
  );
};

export default Loader;
