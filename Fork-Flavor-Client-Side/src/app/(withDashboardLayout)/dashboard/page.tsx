/* eslint-disable prettier/prettier */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { useForm } from "react-hook-form";

import { useUser } from "@/src/context/user.provider";
import {
  useBecomePremiumMember,
  useUpdateUserInfo,
  useUserInfo,
} from "@/src/hooks/user.hooks";
import Loader from "@/src/components/Loader/Loader";
import RecipeCard from "@/src/components/UI/RecipeCard/RecipeCard";

const Dashboard = () => {
  const { user } = useUser();

  const { data, isLoading: isSingleUserDataLoading } = useUserInfo(
    user?._id as string
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate: updateUser } = useUpdateUserInfo();

  const { mutate: becomePremiumMember, isPending } = useBecomePremiumMember();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data?.name,
      profilePicture: data?.profilePicture,
      bio: data?.bio,
    },
  });

  const onSubmit = async (formData: any) => {
    updateUser({ id: user?._id as string, payload: formData });
    onOpenChange();
  };

  const [sortedRecipes, setSortedRecipes] = useState<any[]>(
    data?.userPostedRecipeData || []
  );

  const [sortCriterion, setSortCriterion] = useState<string>("upvote");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredRecipes = sortedRecipes.filter(
    (recipe: any) =>
      recipe?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      recipe?.content?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  useEffect(() => {
    if (data?.userPostedRecipeData) {
      const sorted = [...data?.userPostedRecipeData]?.sort((a: any, b: any) => {
        if (sortCriterion === "upvote") {
          return (b?.upvote?.length || 0) - (a?.upvote?.length || 0);
        } else if (sortCriterion === "rating") {
          const avgRatingA =
            a?.rating?.reduce((acc: number, cur: any) => acc + cur?.rating, 0) /
            (a?.rating?.length || 1);
          const avgRatingB =
            b?.rating?.reduce((acc: number, cur: any) => acc + cur?.rating, 0) /
            (b?.rating?.length || 1);

          return avgRatingB - avgRatingA;
        }

        return 0;
      });

      setSortedRecipes(sorted);
    }
  }, [sortCriterion, data]);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const indexOfLastRecipe = currentPage * cardsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - cardsPerPage;
  const currentRecipes = filteredRecipes?.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleBecomePremiumMember = async () => {
    const transactionId = `TXN-${Date.now()}`;
    const payload = {
      transactionId,
      custormerName: user?.name,
      customerEmail: user?.email,
      id: user?._id,
    };

    becomePremiumMember(payload);
  };

  if (isSingleUserDataLoading) {
    return <Loader />;
  }

  return (
    <div className="py-10">
       <h1 className="text-center text-4xl font-bold mb-20">Your <span className="text-[#e69f42]">Profile </span>Details </h1>
      <div className="w-[90%] sm:w-[70%] lg:w-[50%] mx-auto pb-5 rounded-lg bg-blue-400 border-dotted border-orange-500 border-4">
        <div className="flex justify-center items-center py-4">
          <img
            alt="Profile Pic"
            className="rounded-full object-cover h-24 w-24"
            src={data?.userData?.profilePicture}
          />
        </div>

        <div className="mb-5 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
          Name:  {data?.userData?.name}
          </h1>
          <h1 className="text-lg sm:text-xl font-bold text-white">
          Email:  {data?.userData?.email}
          </h1>
        </div>
      <hr />
        {user?.role === "user" && (
          <div className="flex gap-3 px-5 mt-3 py-3">
            <div className=" rounded-lg text-white w-[50%]">
              <div className="text-lg sm:text-xl font-bold text-center">
                Follower
              </div>
              <div className="text-md sm:text-lg font-bold text-center">
                {data?.userData?.followers?.length}
              </div>
            </div>

            <div className="rounded-lg text-white w-[50%]">
              <div className="text-lg sm:text-xl font-bold text-center">
                Following
              </div>
              <div className="text-md sm:text-lg font-bold text-center">
                {data?.userData?.following?.length}
              </div>
            </div>
          </div>
        )}
        <hr />

        <div className=" rounded-lg text-white mt-5 mx-5 p-4 text-lg sm:text-xl font-bold">
          <h1>Your Bio: {data?.userData?.bio}</h1>
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-5 justify-center items-center mt-5">
          <Button className="bg-button text-lg font-bold rounded-none hover:bg-white hover:text-orange-400 hover:border-2 hover:border-orange-400" onPress={onOpen}>
            Edit Your Profile
          </Button>

          {data?.userData?.premiumMembership === false &&
            user?.role === "user" && (
              <Button
                className="bg-white text-blue-500  font-bold text-lg border-none hover:text-xl hover:p-5"
                isDisabled={isPending}
                isLoading={isPending}
                onClick={handleBecomePremiumMember}
              >
                Get The Premium 👑
              </Button>
            )}
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <div className="p-4 text-lg text-white">Edit Your Profile</div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-4 pb-4 flex flex-col gap-3">
  <div className="flex flex-col">
    <h3 className="text-white">Name</h3>
    <input
      defaultValue={data?.userData?.name}
      type="text"
      {...register("name")}
      className="input input-bordered bg-white text-orange-400" // White background and orange text
      placeholder="Enter your name"
    />
  </div>

  <div className="flex flex-col">
    <h3 className="text-white">Profile Picture URL</h3>
    <input
      defaultValue={data?.userData?.profilePicture}
      type="text"
      {...register("profilePicture")}
      className="input input-bordered bg-white text-orange-400" // White background and orange text
      placeholder="Enter profile picture URL"
    />
  </div>

  <div className="flex flex-col">
    <h3 className="text-white">Bio</h3>
    <input
      defaultValue={data?.userData?.bio}
      type="text"
      {...register("bio")}
      className="input input-bordered bg-white text-orange-400" // White background and orange text
      placeholder="Tell us about yourself"
    />
  </div>
</div>


              <div className="flex justify-center pb-4">
                <Button className="bg-button" type="submit">
                  Save Now
                </Button>
              </div>
            </form>
          </ModalContent>
        </Modal>
      </div>

      {user?.role === "user" && (
        <div className="">
          {data?.userPostedRecipeData?.length !== 0 && (
            <div className="text-gray-800 text-center text-3xl sm:text-4xl font-bold mt-10">
               <h1 className="text-center text-4xl font-bold mt-10">Your Create All <span className="text-[#e69f42]">Recipes</span></h1>

               <div className="w-[90%] sm:w-[80%] mt-7 mx-auto mb-7 grid grid-cols-1 md:grid-cols-2 gap-10">
  <div className="flex flex-col">
    <h3 className="text-black">Sort By</h3>
    <select
      className="bg-white border border-orange-400 text-black p-2"
      onChange={(event) => setSortCriterion(event.target.value)}
    >
      <option disabled selected value="">
        Select an option
      </option>
      <option value="upvote">Upvote</option>
      <option value="rating">Rating</option>
    </select>
  </div>

  <div className="flex flex-col">
    <h3 className="text-black">Search Recipe</h3>
    <input
      className="bg-white border border-orange-400 text-black p-2"
      placeholder="Search for a recipe"
      type="text"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
</div>

            </div>
          )}

          <div className="w-[90%] sm:w-[80%] mx-auto mt-10">
            {currentRecipes?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {currentRecipes?.map((recipe: any, index: number) => (
                  <RecipeCard
                    key={index}
                    button={"delete"}
                    isPremiumUser={data?.userData?.premiumMembership}
                    recipe={recipe}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-3xl text-red-500">
                You have no recipes posted yet.
              </div>
            )}

            {currentRecipes?.length > 0 && (
              <div className="flex justify-center mt-10">
                <button
                  className={`mx-2 px-3 py-1 font-bold text-lg rounded ${
                    currentPage === 1 ? "bg-blue-200" : "bg-button text-white"
                  }`}
                  disabled={currentPage === 1}
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                >
                  Previous
                </button>

                {Array.from(
                  {
                    length: Math.ceil(filteredRecipes?.length / cardsPerPage),
                  },
                  (_, index) => (
                    <button
                      key={index + 1}
                      className={`mx-2 px-3 py-1 font-bold text-lg rounded ${
                        currentPage === index + 1
                          ? "bg-button text-white"
                          : "bg-blue-300"
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  className={`mx-2 px-3 py-1 font-bold text-lg rounded ${
                    currentPage ===
                    Math.ceil(filteredRecipes?.length / cardsPerPage)
                      ? "bg-blue-300"
                      : "bg-button text-white"
                  }`}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredRecipes?.length / cardsPerPage)
                  }
                  onClick={() =>
                    currentPage <
                      Math.ceil(filteredRecipes?.length / cardsPerPage) &&
                    paginate(currentPage + 1)
                  }
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
