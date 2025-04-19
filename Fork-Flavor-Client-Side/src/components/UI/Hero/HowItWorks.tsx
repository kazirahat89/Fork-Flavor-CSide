"use client";

import { Image } from "@nextui-org/react";

const HowItWorks = () => {
  return (
    <div className="bg-white">
      <div className="mt-20">
        <h1 className="text-center  text-black text-4xl font-bold">
          How <span className="text-[#e69f42]">It</span> Works
        </h1>
        <div className=" mt-10">
          <div className="hero-content flex-col lg:flex-row ">
            <Image
              className="lg:max-w-xl max-w-sm  rounded-lg shadow-2xl"
              src="https://images.unsplash.com/photo-1556911073-a517e752729c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="ml-12">
              <div className="mb-3">
                <h3 className="text-xl font-bold mb-2">
                  1. 📝 Sign Up & Create a Profile
                </h3>
                <p className="text-gray-500">
                  Register on the platform and set up your personal profile to
                  showcase your culinary interests.
                </p>
              </div>
              <div className="mb-3">
                <h3 className="text-xl font-bold mb-2">
                  2. 🍲 Explore & Discover Recipes
                </h3>
                <p className="text-gray-500">
                  Browse a wide variety of user-submitted recipes, filter by
                  cuisine, category, or ingredients, and find your next dish to
                  try.
                </p>
              </div>
              <div className="mb-3">
                <h3 className="text-xl font-bold mb-2">
                  3. 📸 Submit Your Own Recipes
                </h3>
                <p className="text-gray-500">
                  Share your best recipes with the community by uploading
                  detailed instructions, ingredient lists, and photos of your
                  dishes.
                </p>
              </div>
              <div className="mb-3">
                <h3 className="text-xl font-bold mb-2">
                  4. ⏲️ Use Interactive Cooking Tools
                </h3>
                <p className="text-gray-500">
                  Access helpful tools like ingredient checklists and built-in
                  cooking timers to stay organized and efficient in the kitchen.
                </p>
              </div>
              <div className="mb-3">
                <h3 className="text-xl font-bold mb-2">
                  5. 💬 Engage with the Community
                </h3>
                <p className="text-gray-500">
                  Comment, rate, and upvote recipes you love. Follow other users
                  to stay updated on their latest culinary creations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
