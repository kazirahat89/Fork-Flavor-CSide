/* eslint-disable prettier/prettier */
"use client";

import { useParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Avatar,
  Image,
  Modal,
  ModalContent,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { FaCirclePlus } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  useCommentRecipe,
  useDownvoteRecipe,
  useEditCommentRecipe,
  useGetSingleRecipe,
  useRateRecipe,
  useUpvoteRecipe,
} from "@/src/hooks/recipe.hooks";
import Loader from "@/src/components/Loader/Loader";
import { useFollowUser, useUnfollowUser } from "@/src/hooks/user.hooks";
import { useUser } from "@/src/context/user.provider";

const RecipeDetails = () => {
  const params = useParams();
  const { id } = params;

  const { user } = useUser();

  const { data, isLoading } = useGetSingleRecipe(id as string);

  const {
    mutate: upvoteRecipe,
    isPending: isUpvotePending,
    data: upvoteRecipeData,
  } = useUpvoteRecipe();

  const {
    mutate: downvoteRecipe,
    isPending: isDownvotePending,
    data: downVoteRecipeData,
  } = useDownvoteRecipe();

  const { mutate: followUser, isPending: isFollowUserPending } =
    useFollowUser();

  const { mutate: unfollowUser, isPending: isUnfollowUserPending } =
    useUnfollowUser();

  const { mutate: rateRecipe, isPending: isRateRecipePending } =
    useRateRecipe();

  const { mutate: commentRecipe, isPending: isCommentRecipePending } =
    useCommentRecipe();

  const { mutate: editComment, isPending: isEditCommentPending } =
    useEditCommentRecipe();

  const recipe = data?.data?.result;
  const postOwner = data?.data?.postOwner;

  // Calculate average rating from the `rating` array
  const calculateAverageRating = (
    ratings: { id: string; rating: number }[]
  ) => {
    if (!ratings || ratings?.length === 0) return 0.0;

    const totalRating = ratings?.reduce((acc, curr) => acc + curr?.rating, 0);

    return totalRating / ratings?.length;
  };

  const averageRating = calculateAverageRating(recipe?.rating || []);

  const handleUpvote = async (id: string) => {
    upvoteRecipe(id);
  };

  const handleDownvote = async (id: string) => {
    downvoteRecipe(id);
  };

  const handleFollow = async () => {
    followUser(postOwner?._id);
  };

  const handleUnfollow = async () => {
    unfollowUser(postOwner?._id);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm();

  // Handle rating form submission
  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      rating: Number(data.rating),
    };

    rateRecipe({ id: recipe?._id as string, payload: formattedData });
    onOpenChange();
  };

  // Handle Comment Submit
  const { control, handleSubmit: handleCommentSubmit, reset } = useForm();

  const onCommentSubmit = async (data: any) => {
    commentRecipe({ id: recipe?._id as string, payload: data });
    reset();
  };

  const {
    isOpen: isCommentModalOpen,
    onOpen: onCommentModalOpen,
    onOpenChange: onCommentModalOpenChange,
  } = useDisclosure();

  const [commentToEdit, setCommnetToEdit] = useState("");
  const [commentId, setCommnetId] = useState("");

  const handleOpenCommentEditModal = (id: string, comment: string) => {
    setCommnetToEdit(comment);
    setCommnetId(id);
    onCommentModalOpen();
  };

  const handleUpdateComment = async (e: FormEvent) => {
    e.preventDefault();

    editComment({
      recipeId: recipe?._id,
      commentId,
      payload: { comment: commentToEdit },
    });

    onCommentModalOpenChange();
  };

  useEffect(() => {
    if (upvoteRecipeData && !upvoteRecipeData.success) {
      toast.error(upvoteRecipeData.message);
    } else if (upvoteRecipeData && upvoteRecipeData.success) {
      toast.success("Recipe upvotted successfully!");
    }
  }, [upvoteRecipeData]);

  useEffect(() => {
    if (downVoteRecipeData && !downVoteRecipeData.success) {
      toast.error(downVoteRecipeData.message);
    } else if (downVoteRecipeData && downVoteRecipeData.success) {
      toast.success("Recipe downvotted successfully!");
    }
  }, [downVoteRecipeData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="">
        <h1 className="text-center text-6xl font-bold mt-10">Details Of <span className="text-[#e69f42]">{recipe?.title}</span></h1>
      <div className="w-[90%] mx-auto py-10 md:w-[80%]">
        {" "}
        {/* Responsive width */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
          {/* Recipe Image */}
          <div className="relative bg-white" >
            <img
              alt={recipe?.title}
              className="w-full h-[300px] md:h-[500px] object-cover" // Responsive height
              src={recipe?.image}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
            <div className="border-2 border-button mt-3 p-3 rounded-lg inline-flex justify-center items-center gap-2 md:gap-5 text-gray-900">
              <Avatar src={postOwner?.profilePicture} />

              <div>
                <h1 className="text-lg md:text-xl text-white">
                  Posted by{" "}
                  <span className="text-blue-700">{postOwner?.name}</span>
                </h1>

                <h1 className="text-md md:text-lg text-white font-bold">{postOwner?.email}</h1>
              </div>

              {user?.email === postOwner?.email ? (
                ""
              ) : (
                <Button
                  className={`text-sm md:text-lg bg-blue-500 font-bold ${user?.role === "admin" && "hidden"}`}
                  endContent={<FaCirclePlus />}
                  isDisabled={isFollowUserPending || isUnfollowUserPending}
                  isLoading={isFollowUserPending || isUnfollowUserPending}
                  onClick={
                    postOwner?.followers?.includes(user?._id)
                      ? handleUnfollow
                      : handleFollow
                  }
                >
                  {postOwner?.followers?.includes(user?._id)
                    ? " Unfollow"
                    : "Follow Now"}
                </Button>
              )}
            </div>
              {/* Responsive text size */}
            </div>
          </div>

          {/* Recipe Content */}
      <div className="lg:flex justify-between mx-28">
      <div className="p-4 md:p-8">
            {" "}
            {/* Responsive padding */}
            {/* Recipe Title and Details */}
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {recipe?.title}
              </h2>
              <div className="text-[#e69f42] text-lg md:text-xl font-bold">
                Rating {averageRating?.toFixed(1)} ⭐
              </div>
            </div>
           
            {/* Recipe Description */}
            <div
              dangerouslySetInnerHTML={{ __html: recipe?.content }}
              className="mt-4 text-gray-700 text-md md:text-lg leading-relaxed"
            />
          
          </div>

     

      

          <div className={`mt-10 pb-5 ${user?.role === "admin" && "hidden"}`}>
          <div
            className={`pb-5 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-5 ${user?.role === "admin" && "hidden"}`}
          >
            <Button
              className="text-lg md:text-xl rounded-full border-none h-50"
              color="warning"
              isDisabled={isUpvotePending || isDownvotePending}
              isLoading={isUpvotePending}
              variant="bordered"
              onClick={() => handleUpvote(recipe?._id)}
            >
             <Image alt="" className="w-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJjVFFA5i4QJKHyITzyQUMaXur-yihIzjZyg&s" />({recipe?.upvote?.length})
            </Button>

            <Button
              className="text-lg md:text-xl rounded-full border-none h-50"
              color="danger"
              isDisabled={isUpvotePending || isDownvotePending}
              isLoading={isDownvotePending}
           
              variant="bordered"
              onClick={() => handleDownvote(recipe?._id)}
            >
             <Image alt="" className="w-12" src="https://cdn-icons-png.flaticon.com/512/3670/3670156.png" /> ({recipe?.downvote?.length})
            </Button>

          </div>
              {user?.email !== postOwner?.email && (
            <div
              className={`pb-5 flex justify-center items-center gap-3 md:gap-5 ${user?.role === "admin" && "hidden"}`}
            >
              <Button className="bg-white border-2 py-5 ml-3 border-[#e69f42] text-lg font-bold" onPress={onOpen}>
              <h3 className="font-bold text-black">Rating Now</h3>
               <Image alt="rate icon" className="w-14 p-3" src="https://cdn-icons-png.flaticon.com/512/1168/1168845.png" />
              </Button>

              <Modal
                className="p-3 bg-blue-500"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
              >
                <ModalContent>
                  <form
                    className="flex flex-col gap-5 text-white"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* Select for rating */}
                    <select 
  className="select select-bordered max-w-xs bg-[#e69f42]" 
  {...register("rating", { required: true })} // Handle form registration and validation
>
  <option disabled selected>Rate This Recipe </option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
</select>


                    {/* Submit button */}
                    <Button
                      className="bg-white text-[#e69f42] border-[#e69f42] hover:text-white hover:bg-[#e69f42] rounded-none"
                      isDisabled={isRateRecipePending}
                      isLoading={isRateRecipePending}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                </ModalContent>
              </Modal>
            </div>
          )} 
            {recipe?.comments?.length === 0 ? (
              <div className="text-2xl text-center font-bold text-blue-500">
                Comments in this post.
              </div>
            ) : (
              recipe?.comments?.map((comment: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-center text-gray-900 p-3 rounded-lg border-2 border-blue-500 w-full md:w-[70%] lg:w-[400px] mx-auto mb-5"
                >
                  <div className="flex gap-3">
                    <Avatar
                      className="flex-shrink-0"
                      src={
                        comment?.profilePicture ||
                        "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      }
                    />
                    <div className="flex flex-col">
                      <h1 className="font-bold text-lg">
                        {comment?.name || "Unknown User"}
                      </h1>
                      <h1 className="text-lg">
                        {comment?.comment || "No comment text provided."}
                      </h1>
                    </div>
                  </div>

                  {user?._id === comment?.id && (
                    <div>
                      <Button
                        isIconOnly
                        aria-label="Edit"
                        className="bg-button"
                        onPress={() =>
                          handleOpenCommentEditModal(
                            comment?._id,
                            comment?.comment
                          )
                        }
                      >
                      Edit
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}

            <div className="w-full md:w-[70%] mx-auto mt-10">
              <form
                className="flex flex-col gap-5"
                onSubmit={handleCommentSubmit(onCommentSubmit)}
              >
             <Controller
  control={control}
  defaultValue=""
  name="comment"
  render={({ field }) => (
    <textarea
      {...field}
      required
      className="textarea textarea-bordered w-full bg-white text-black border-2 border-orange-400" // White background and black text
      placeholder="Comment now!!! for this recipe" // Placeholder text
    />
  )}
/>


                <Button
                  className="bg-button text-lg font-bold rounded-none hover:bg-white hover:text-orange-400 hover:border-2 hover:border-orange-400"
                  isDisabled={isCommentRecipePending}
                  isLoading={isCommentRecipePending}
                  type="submit"
                >
                  Comment Done
                </Button>
              </form>

              <Modal
                isOpen={isCommentModalOpen}
                onOpenChange={onCommentModalOpenChange}
              >
                <ModalContent>
                  <form
                    className="p-5 flex flex-col gap-5 bg-primary"
                    onSubmit={handleUpdateComment}
                  >
                    
                    <Textarea
                      required
                      label="Edit Comment"
                      value={commentToEdit}
                      onChange={(e) => setCommnetToEdit(e.target.value)}
                    />

                    <Button
                      className="bg-button text-lg font-bold"
                      isDisabled={isEditCommentPending}
                      isLoading={isEditCommentPending}
                      type="submit"
                    >
                      Edit Comment
                    </Button>
                  </form>
                </ModalContent>
              </Modal>
            </div>
          </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
