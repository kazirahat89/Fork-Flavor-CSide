import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  becomePremiumMember,
  blockUser,
  createAdmin,
  deleteAdmin,
  deleteUser,
  followUser,
  getAllAdmin,
  getAllUser,
  getUserInfo,
  getUserInformation,
  unblockUser,
  unfollowUser,
  updateAdmin,
  updateUserInfo,
} from "../services/UserServices";

export const useUserInfo = (id: string) => {
  return useQuery({
    queryKey: ["USER", id],
    queryFn: async () => await getUserInfo(id),
  });
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: string; payload: FieldValues }>({
    mutationKey: ["user_update"],

    mutationFn: async ({ id, payload }) => await updateUserInfo(id, payload),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["USER", variables.id],
      });

      toast.success("Profile update successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["FOLLOW_USER"],
    mutationFn: async (id: string) => await followUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_SINGLE_RECIPE"],
      });

      toast.success("You are now following this user.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["UNFOLLOW_USER"],
    mutationFn: async (id: string) => await unfollowUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_SINGLE_RECIPE"],
      });

      toast.success("You have unfollowed this user.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetUserInfo = (id: string) => {
  return useQuery({
    queryKey: ["USER_INFO"],
    queryFn: async () => await getUserInformation(id),
  });
};

export const useBecomePremiumMember = () => {
  return useMutation({
    mutationKey: ["BECOME_PREMIUM_MEMBER"],
    mutationFn: async (payload: any) => await becomePremiumMember(payload),

    onSuccess: (res) => {
      if (res.error) {
        const errorData = res.error;

        if (errorData && "data" in errorData) {
          toast.error((errorData.data as any).message);
        } else {
          toast.error("An unexpected error occurred");
        }
      } else {
        if (res.result === "true") {
          window.location.href = res.payment_url;
        }
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["GET_ALL_USER"],
    queryFn: async () => await getAllUser(),
  });
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["BLOCK_USER"],
    mutationFn: async (id: string) => await blockUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_USER"],
      });

      toast.success("User blocked successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUnblockUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["UNBLOCK_USER"],
    mutationFn: async (id: string) => await unblockUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_USER"],
      });

      toast.success("User unblocked successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (id: string) => await deleteUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_USER"],
      });

      toast.success("User deleted successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllAdmin = () => {
  return useQuery({
    queryKey: ["GET_ALL_ADMIN"],
    queryFn: async () => await getAllAdmin(),
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["CREATE_ADMIN"],
    mutationFn: async (payload: any) => await createAdmin(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_ADMIN"],
      });
    },
  });
};

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: string; payload: any }>({
    mutationKey: ["UPDATE_ADMIN"],
    mutationFn: async ({ id, payload }) => await updateAdmin(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_ADMIN"],
      });

      toast.success("Admin updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_ADMIN"],
    mutationFn: async (id: string) => await deleteAdmin(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ALL_ADMIN"],
      });

      toast.success("Admin deleted successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
