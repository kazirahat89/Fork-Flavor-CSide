/* eslint-disable prettier/prettier */
"use server";

import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/AxiosInstance";

export const createRecipe = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/recipe/create-recipe",
      userData
    );

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const deleteRecipe = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/recipe/delete-recipe/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getAllRecipe = async () => {
  try {
    const { data } = await axiosInstance.get(`/recipe/get-all-recipe`);

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getSingleRecipe = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/recipe/get-single-recipe/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const upvoteRecipe = async (id: string) => {
  try {
    const { data } = await axiosInstance.post(`/recipe/upvote-recipe/${id}`);

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const downvoteRecipe = async (id: string) => {
  try {
    const { data } = await axiosInstance.post(`/recipe/downvote-recipe/${id}`);

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const rateRecipe = async (id: string, payload: any) => {
  try {
    const { data } = await axiosInstance.post(
      `/recipe/rate-recipe/${id}`,
      payload
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const commentRecipe = async (id: string, payload: any) => {
  try {
    const { data } = await axiosInstance.post(
      `/recipe/comment-recipe/${id}`,
      payload
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const editCommentRecipe = async (
  recipeId: string,
  commentId: string,
  payload: any
) => {
  try {
    const { data } = await axiosInstance.post(
      `/recipe/update-comment-recipe/${recipeId}/${commentId}`,
      payload
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getAllRecipiesForAdmin = async () => {
  try {
    const { data } = await axiosInstance.get(
      `/recipe/get-all-recipies-for-admin`
    );

    return data.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const unpublishRecipe = async (recipeId: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/recipe/unpublish-recipe/${recipeId}`
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const publishRecipe = async (recipeId: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/recipe/publish-recipe/${recipeId}`
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
