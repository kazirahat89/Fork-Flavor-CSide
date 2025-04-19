"use client";

/* eslint-disable prettier/prettier */
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

import { useDeleteRecipe } from "@/src/hooks/recipe.hooks";

const RecipeCard = ({
  recipe,
  button,
  isPremiumUser,
}: {
  recipe: {
    _id: string;
    title: string;
    image: string;
    content: string;
    isPremium: boolean;
    rating: { id: string; rating: number }[];
  };
  button: string;
  isPremiumUser: boolean;
}) => {
  const ratings = recipe?.rating;
  const averageRating =
    ratings?.length > 0
      ? ratings?.reduce(
          (sum: number, item: { rating: number }) => sum + item?.rating,
          0
        ) / ratings?.length
      : 0;

  const { mutate: deleteRecipe } = useDeleteRecipe();

  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);

  const handleDeleteRecipe = (id: string) => {
    setRecipeToDelete(id);

    Swal.fire({
      title: "Are you sure you want to delete this recipe?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecipe(id, {
          onSuccess: () => setRecipeToDelete(null),
          onError: () => setRecipeToDelete(null),
        });
      } else {
        setRecipeToDelete(null);
      }
    });
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Recipe Image */}
      <img
        alt={recipe?.title}
        className={`w-full h-56 object-cover ${
          recipe?.isPremium && !isPremiumUser ? "filter blur-sm" : ""
        }`}
        src={recipe?.image}
      />

      {/* Overlay for Premium Content */}
      {recipe?.isPremium && !isPremiumUser && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-xl font-bold">
              Buy premium membership to view this
            </h2>
          </div>
        </div>
      )}

      {/* Recipe Content */}
      {!recipe?.isPremium || isPremiumUser ? (
        <div className="p-6">
          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-1">
            {recipe?.title}
          </h3>

          {/* Average Rating */}
          <div className="mt-4 text-[#e69f42] text-lg font-bold">
            Rating {averageRating?.toFixed(1)} ⭐
          </div>

          <div className="text-center mt-4">
            {button === "delete" && (
              <Button
                className="bg-red-500 text-lg w-full rounded-none"
                isDisabled={recipeToDelete === recipe?._id}
                isLoading={recipeToDelete === recipe?._id}
                onClick={() => handleDeleteRecipe(recipe?._id)}
              >
                Delete The Recipe
              </Button>
            )}

            {button === "show details" && (
              <Link href={`/recipe/${recipe?._id}`}>
                <Button className="bg-white text-[#e69f42] border-[#e69f42] hover:text-white hover:bg-[#e69f42] border-2 text-lg w-full">See Details</Button>
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RecipeCard;
