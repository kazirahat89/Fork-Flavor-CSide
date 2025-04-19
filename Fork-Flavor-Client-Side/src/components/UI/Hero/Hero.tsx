"use client";

import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-[800px]"
        style={{
          backgroundImage:
            "url(https://raw.githubusercontent.com/codewithsadee/grilli/refs/heads/master/assets/images/hero-slider-1.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-20" />
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md lg:max-w-4xl">
            <h1 className="mb-5 text-6xl font-extrabold">
              Share Your Recipes & Discover New Flavors & Connect with Food
              Lovers
            </h1>
            <p className="mb-5">
              Join a community of passionate cooks to share, discover, and
              organize your favorite recipes. Unlock exclusive content, connect
              with others, and elevate your culinary skills!
            </p>
            <Link
              className="w-full md:w-auto mb-14 inline-flex items-center justify-center py-3 px-7 text-lg font-semibold text-center text-white rounded bg-button shadow-xs hover:bg-button-dark transition-all duration-500"
              href={"/recipe"}
            >
              Explore Recipies
              <svg
                className="ml-2"
                fill="none"
                height="20"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
