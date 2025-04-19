"use client";

import Lottie from "lottie-react";

import loader from "../../public/loadingAnimation.json";

const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <Lottie animationData={loader} className="w-[300px]" loop={true} />
    </div>
  );
};

export default Loader;
