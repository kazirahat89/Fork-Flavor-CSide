/* eslint-disable prettier/prettier */
"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getUserInfo = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/user/get-single-user/${id}`);

    return res.data.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const updateUserInfo = async (id: string, payload: any) => {
  try {
    const res = await axiosInstance.put(`/user/update-user/${id}`, payload);

    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const followUser = async (id: string) => {
  try {
    const res = await axiosInstance.post(`/user/follow-user/${id}`);

    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const unfollowUser = async (id: string) => {
  try {
    const res = await axiosInstance.post(`/user/unfollow-user/${id}`);

    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getUserInformation = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/user/get-user-info/${id}`);

    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const becomePremiumMember = async (payload: any) => {
  try {
    const res = await axiosInstance.post(
      `/user/become-premium-member`,
      payload
    );

    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getAllUser = async () => {
  try {
    const res = await axiosInstance.get(`/user/get-all-user`);

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const blockUser = async (id: string) => {
  try {
    const res = await axiosInstance.post(`/user/block-user/${id}`);

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const unblockUser = async (id: string) => {
  try {
    const res = await axiosInstance.post(`/user/unblock-user/${id}`);

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/user/delete-user/${id}`);

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getAllAdmin = async () => {
  try {
    const res = await axiosInstance.get(`/user/get-all-admin`);

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const createAdmin = async (payload: any) => {
  try {
    const res = await axiosInstance.post(`/user/create-admin`, payload);

    return res.data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const updateAdmin = async (id: string, payload: any) => {
  try {
    const res = await axiosInstance.post(`/user/update-admin/${id}`, payload);

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteAdmin = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/user/delete-admin/${id}`);

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
