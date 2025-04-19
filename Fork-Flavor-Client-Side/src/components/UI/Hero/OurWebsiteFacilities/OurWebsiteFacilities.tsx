"use client";
import { Image } from "@nextui-org/react";

const OurWebsiteFacilities = () => {
  return (
    <div className="mt-20">
      <h1 className="text-center  text-black text-4xl font-bold">
        Our <span className="text-[#e69f42]">Featured</span>{" "}
      </h1>
      <div className="flex items-center justify-center gap-12">
        <section className="flex justify-center mt-10">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            <div className="card  w-96 shadow-xl border-x-2 border-y-4 border-[#e69f42]">
              <figure>
                <Image
                  alt="Shoes"
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Share and Discover Recipes</h2>
                <p>
                  Easily upload your favorite recipes and explore a rich
                  collection of dishes from home cooks, culinary students, and
                  cooking enthusiasts. Whether you are looking for a quick meal
                  or a gourmet dish, there is something for everyone.
                </p>
                <div className="card-actions justify-end" />
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-xl border-x-2 border-y-4 border-[#e69f42]">
              <figure>
                <Image
                  alt="Shoes"
                  src="https://images.unsplash.com/photo-1605433247501-698725862cea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Interactive Cooking Tools</h2>
                <p>
                  Enhance your cooking experience with built-in tools like
                  interactive ingredient checklists and customizable cooking
                  timers, designed to keep your kitchen tasks organized and
                  hassle-free.
                </p>
                <div className="card-actions justify-end" />
              </div>
            </div>
            <div className="card bg-base-100 w-96 shadow-xl border-x-2 border-y-4 border-[#e69f42]">
              <figure>
                <Image
                  alt="Shoes"
                  src="https://plus.unsplash.com/premium_photo-1682309650634-363db7521e6d?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Social Engagement & Ratings</h2>
                <p>
                  Connect with a vibrant community by commenting on recipes,
                  leaving ratings, upvoting the best dishes, and following other
                  cooks. Stay inspired and share your culinary journey with
                  fellow food lovers.
                </p>
                <div className="card-actions justify-end" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurWebsiteFacilities;
