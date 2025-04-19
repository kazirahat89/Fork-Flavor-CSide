import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  commentRecipe,
  createRecipe,
  deleteRecipe,
  downvoteRecipe,
  editCommentRecipe,
  getAllRecipe,
  getAllRecipiesForAdmin,
  getSingleRecipe,
  publishRecipe,
  rateRecipe,
  unpublishRecipe,
  upvoteRecipe,
} from "../services/RecipeServices";

export const useCreateRecipe = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_RECIPE"],
    mutationFn: async (userData) => await createRecipe(userData),
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_RECIPE"],
    mutationFn: async (id: string) => await deleteRecipe(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["USER"],
      });

      toast.success("Recipe deletion successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllRecipe = () => {
  return useQuery({
    queryKey: ["GET_ALL_RECIPE"],
    queryFn: async () => await getAllRecipe(),
  });
};

export const useGetSingleRecipe = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_RECIPE"],
    queryFn: async () => await getSingleRecipe(id),
  });
};

export const useUpvoteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["UPVOTE_RECIPE"],
    mutationFn: async (id: string) => await upvoteRecipe(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_SINGLE_RECIPE"],
      });
    },
  });
};

export const useDownvoteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["DOWNVOTE_RECIPE"],
    mutationFn: async (id: string) => await downvoteRecipe(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_SINGLE_RECIPE"],
      });
    },
  });
};

export const useRateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: string; payload: FieldValues }>({
    mutationKey: ["RATE_RECIPE"],

    mutationFn: async ({ id, payload }) => await rateRecipe(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_SINGLE_RECIPE"],
      });

      toast.success("Recipe rated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCommentRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: string; payload: FieldValues }>({
    mutationKey: ["COMMENT_RECIPE"],

    mutationFn: async ({ id, payload }) => await commentRecipe(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_SINGLE_RECIPE"],
      });

      toast.success("Comment has been added.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditCommentRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    Error,
    { recipeId: string; commentId: string; payload: FieldValues }
  >({
    mutationKey: ["UPDATE_COMMENT_RECIPE"],

    mutationFn: async ({ recipeId, commentId, payload }) =>
      await editCommentRecipe(recipeId, commentId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_SINGLE_RECIPE"],
      });

      toast.success("Comment has been updated.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllRecipiesForAdmin = () => {
  return useQuery({
    queryKey: ["GET_ALL_RECIPIES_FOR_ADMIN"],
    queryFn: async () => await getAllRecipiesForAdmin(),
  });
};

export const useUnpublishRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["UNPUBLISH_RECIPE"],

    mutationFn: async (recipeId: string) => await unpublishRecipe(recipeId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_RECIPIES_FOR_ADMIN"],
      });

      toast.success("Recipe has been unpublished.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const usePublishRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["PUBLISH_RECIPE"],

    mutationFn: async (recipeId: string) => await publishRecipe(recipeId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_RECIPIES_FOR_ADMIN"],
      });

      toast.success("Recipe has been published.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteRecipeFromAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_RECIPE_FROM_ADMIN"],
    mutationFn: async (id: string) => await deleteRecipe(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_RECIPIES_FOR_ADMIN"],
      });

      toast.success("Recipe deletion successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
