"use client";
import { Image } from "@nextui-org/react";

const AboutUs = () => {
  return (
    <div>
      <div className="hero bg-base-200 my-20">
        <div className="hero-content flex-col lg:flex-row-reverse gap-20">
          <div className="relative lg:max-w-xl max-w-sm rounded-lg shadow-2xl">
            <Image
              alt="Recipe Sharing Community"
              className="rounded-lg"
              src="https://images.unsplash.com/photo-1512058454905-6b841e7ad132?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold">
              About Our{" "}
              <span className="text-[#e69f42] font-bold">
                {" "}
                Recipe Sharing Community
              </span>
            </h1>
            <p className="py-6 text-gray-500">
              A platform designed for food lovers, home cooks, and culinary
              enthusiasts to share, discover, and explore new recipes from all
              over the world. Our mission is to create a space where people can
              come together to celebrate their love for cooking, exchange ideas,
              and inspire one another with delicious dishes.
            </p>

            <p className="py-6 text-gray-500">
              Whether you are a seasoned chef or just starting your culinary
              journey, our platform provides the tools to help you succeed in
              the kitchen. From interactive ingredient checklists and cooking
              timers to recipe ratings and social engagement, we’ve created
              features that make cooking more fun and organized.
            </p>

            <p className="text-gray-500">
              At{" "}
              <span className="text-[#e69f42] font-bold">
                The Recipe Sharing Community
              </span>
              , we believe that food brings people together. Our community
              fosters creativity, learning, and a shared passion for culinary
              arts. We’re constantly improving the platform to offer more value,
              including exclusive content through our premium membership, where
              users can access unique recipes, create private collections, and
              enjoy a richer cooking experience.
            </p>

            <p className="text-gray-500">
              Join us today and become a part of a vibrant community that makes
              cooking and sharing recipes easier and more enjoyable than ever
              before!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
