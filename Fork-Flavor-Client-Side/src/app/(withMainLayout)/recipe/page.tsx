/* eslint-disable prettier/prettier */
"use client";


import { useState, useEffect } from "react";

import RecipeCard from "@/src/components/UI/RecipeCard/RecipeCard";
import { useGetAllRecipe } from "@/src/hooks/recipe.hooks";
import Loader from "@/src/components/Loader/Loader";
import { useGetUserInfo } from "@/src/hooks/user.hooks";
import { useUser } from "@/src/context/user.provider";

const RecipePage = () => {
  const { user } = useUser();

  const { data: allRecipe, isLoading } = useGetAllRecipe();

  const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfo(
    user?._id as string
  );

  const [sortedRecipes, setSortedRecipes] = useState<any[]>([]);
  const [sortCriterion, setSortCriterion] = useState<string>("upvote");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    if (!searchQuery) {
      setSortedRecipes(allRecipe?.data || []);
    } else {
      const filteredRecipes = allRecipe?.data.filter(
        (recipe: any) =>
          recipe?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe?.content?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSortedRecipes(filteredRecipes);
    }
  };

  useEffect(() => {
    if (allRecipe?.data?.length > 0) {
      const sorted = [...allRecipe?.data].sort((a: any, b: any) => {
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
  }, [sortCriterion, allRecipe]);

  if (isLoading || isUserInfoLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div
        className="h-[200px] "
        
      >
        <div className="h-full w-full flex items-center justify-center ">
        <h1 className="text-center text-6xl font-bold mt-10">All <span className="text-[#e69f42]">Recipes</span></h1>

        </div>
      </div>

      <div className="bg-[#F5EDED]">
        <div className="py-10">
          <div className="max-w-screen-xl mx-auto mb-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {/* Select for sorting */}
            <select 
  className="select select-bordered w-full  bg-[#e69f42] text-black" // Custom background and text color
  onChange={(event) => setSortCriterion(event.target.value)} // Handle change event
>
  <option disabled selected>Shot with Vote And Ratings</option>
  <option value="hanSolo">Vote</option>
  <option value="greedo">Ratings</option>
</select>

{/* Search input */}
<label className="input input-bordered flex items-center gap-2 bg-[#e69f42] text-black ">
  <input 
    className="grow bg-[#e69f42] text-white" // Custom background and text color 
    placeholder="Search"
    type="text" 
    value={searchQuery} // Controlled input value
    onChange={(e) => {
      setSearchQuery(e.target.value); // Handle input change
      handleSearch(); // Trigger search function
    }} 
  />
  <kbd className="kbd kbd-sm">⌘</kbd>
  <kbd className="kbd kbd-sm">K</kbd>
</label>


          </div>

          <div className="w-[60%] mx-auto mt-10">
            {sortedRecipes?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedRecipes?.map((recipe: any, index: number) => (
                  <RecipeCard
                    key={index}
                    button={"show details"}
                    isPremiumUser={userInfo?.premiumMembership}
                    recipe={recipe}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-3xl text-red-500">
                No Recipe Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
