/* eslint-disable prettier/prettier */
"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import Swal from "sweetalert2";

import Loader from "@/src/components/Loader/Loader";
import {
  useBlockUser,
  useDeleteUser,
  useGetAllUser,
  useUnblockUser,
} from "@/src/hooks/user.hooks";

const ManageUsers = () => {
  const { data: userInfo, isLoading } = useGetAllUser();
  const { mutate: unblockUser } = useUnblockUser();
  const { mutate: blockUser } = useBlockUser();
  const { mutate: deleteUser } = useDeleteUser();

  const [loadingBlockStatus, setLoadingBlockStatus] = useState<string | null>(
    null
  );

  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleAction = async (id: string, status: boolean) => {
    setLoadingBlockStatus(id);

    if (status === true) {
      Swal.fire({
        title: "Are you sure you want to unblock this user?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, unblock user!",
      }).then((result) => {
        if (result.isConfirmed) {
          unblockUser(id, {
            onSuccess: () => setLoadingBlockStatus(null),
            onError: () => setLoadingBlockStatus(null),
          });
        } else {
          setLoadingBlockStatus(null);
        }
      });
    } else if (status === false) {
      Swal.fire({
        title: "Are you sure you want to block this user?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, block user!",
      }).then((result) => {
        if (result.isConfirmed) {
          blockUser(id, {
            onSuccess: () => setLoadingBlockStatus(null),
            onError: () => setLoadingBlockStatus(null),
          });
        } else {
          setLoadingBlockStatus(null);
        }
      });
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    setUserToDelete(id);
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id, {
          onSuccess: () => setUserToDelete(null),
          onError: () => setUserToDelete(null),
        });
      } else {
        setUserToDelete(null);
      }
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-8 pb-20 h-[700px]">
         <h1 className="text-center text-4xl font-bold my-10">Manage All <span className="text-[#e69f42]">Users</span></h1>

      {/* Responsive Table Wrapper */}
      <div className="hidden md:block">
        {" "}
        {/* Show table on medium and larger screens */}
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="text-left p-4">Profile Picture</th>
              <th className="text-left p-4">User Name</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {userInfo?.map((user: any, index: number) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">
                  <img
                    alt={user?.name}
                    className="w-16 h-16 object-cover rounded"
                    src={user?.profilePicture}
                  />
                </td>
                <td className="p-4 text-lg font-bold text-gray-900">
                  {user?.name}
                </td>
                <td className="p-4">
                  <span
                    className={`py-1 px-3 rounded-full text-sm ${
                      user?.isBlocked === true
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user?.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="p-4">
                  <Button
                    className="bg-[#e69f42] ml-4 font-bold text-lg rounded-none hover:bg-white hover:text-[#e69f42] hover:text-[#e69f42] hover:border-[#e69f42] hover:border-2"
                    isDisabled={loadingBlockStatus === user?._id}
                    isLoading={loadingBlockStatus === user?._id}
                    onClick={() => handleAction(user?._id, user?.isBlocked)}
                  >
                    {user?.isBlocked ? "Unblock" : "Block"}
                  </Button>

                  <Button
                    className="bg-red-500 ml-4 font-bold text-lg rounded-none hover:bg-white hover:border-2 hover:border-red-500 hover:text-red-500"
                    isDisabled={userToDelete === user?._id}
                    isLoading={userToDelete === user?._id}
                    onClick={() => handleDeleteRecipe(user?._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Stack Layout */}
      <div className="block md:hidden">
        {" "}
        {/* Show on small screens */}
        {userInfo?.map((user: any, index: number) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 mb-4 transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              <img
                alt={user?.name}
                className="w-16 h-16 object-cover rounded"
                src={user?.profilePicture}
              />
              <div className="ml-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {user?.name}
                </h2>
                <span
                  className={`py-1 px-2 rounded-full text-sm ${
                    user?.isBlocked
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user?.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                className="bg-[#e69f42] ml-4 font-bold text-lg rounded-none hover:bg-white hover:text-[#e69f42] hover:text-[#e69f42] hover:border-[#e69f42] hover:border-2"
                isDisabled={loadingBlockStatus === user?._id}
                isLoading={loadingBlockStatus === user?._id}
                onClick={() => handleAction(user?._id, user?.isBlocked)}
              >
                {user?.isBlocked ? "Unblock" : "Block"}
              </Button>
              <Button
                className="bg-red-500 ml-4 font-bold text-lg rounded-none hover:bg-white hover:border-2 hover:border-red-500 hover:text-red-500"
                isDisabled={userToDelete === user?._id}
                isLoading={userToDelete === user?._id}
                onClick={() => handleDeleteRecipe(user?._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
