/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import {
  useDeleteAdmin,
  useGetAllAdmin,
  useUpdateAdmin,
} from "@/src/hooks/user.hooks";
import Loader from "@/src/components/Loader/Loader";
import { useUser } from "@/src/context/user.provider";
import CreateAdminForm from "@/src/components/UI/CreateAdminForm/CreateAdminForm";

const ManageAdmins = () => {
  const { data: adminData, isLoading } = useGetAllAdmin();

  const { mutate: updateAdmin, isPending } = useUpdateAdmin();

  const { mutate: deleteAdmin } = useDeleteAdmin();

  const { user } = useUser();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [adminInfo, setAdminInfo] = useState<any>("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: adminInfo?.name,
      profilePicture: adminInfo?.profilePicture,
      bio: adminInfo?.bio,
    },
  });

  const handleOpenUpdateModal = (adminData: any) => {
    setAdminInfo(adminData);
    onOpen();
    reset({
      name: adminData?.name,
      profilePicture: adminData?.profilePicture,
      bio: adminData?.bio,
    });
  };

  // Function to handle form submission
  const onSubmit = async (formData: any) => {
    updateAdmin(
      { id: adminInfo?._id, payload: formData },

      {
        onSuccess: () => {
          onOpenChange();
        },
      }
    );
  };

  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleDeleteAdmin = (id: string) => {
    setUserToDelete(id);
    Swal.fire({
      title: "Are you sure you want to delete this admin?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAdmin(id, {
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
    <div>
      <div className="container mx-auto p-8 pb-20">
      
      <h1 className="text-center text-4xl font-bold my-10">Add A New <span className="text-[#e69f42]">Admin</span></h1>

        <CreateAdminForm />
        <h1 className="text-center text-4xl font-bold my-10">Manage All <span className="text-[#e69f42]">Admins</span></h1>
        {/* Responsive Table Wrapper */}
        <div className="hidden md:block">
          {" "}
          {/* Show table on medium and larger screens */}
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="text-left p-4">Profile Picture</th>
                <th className="text-left p-4">Admin Name</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {adminData?.map((admin: any, index: number) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">
                    <img
                      alt={admin?.name}
                      className="w-16 h-16 object-cover rounded"
                      src={admin?.profilePicture}
                    />
                  </td>
                  <td className="p-4 text-lg font-bold text-gray-900">
                    {admin?.name}
                  </td>

                  {user?._id === admin?._id ? (
                    ""
                  ) : (
                    <td className="p-4">
                      <Button
                        className="bg-[#e69f42] ml-4 font-bold text-lg rounded-none hover:bg-white hover:text-[#e69f42] hover:text-[#e69f42] hover:border-[#e69f42] hover:border-2"
                        onClick={() => handleOpenUpdateModal(admin)}
                      >
                        Update
                      </Button>

                      <Button
                        className="bg-red-500 ml-4 font-bold text-lg rounded-none hover:bg-white hover:border-2 hover:border-red-500 hover:text-red-500"
                        isDisabled={userToDelete === admin?._id}
                        isLoading={userToDelete === admin?._id}
                        onClick={() => handleDeleteAdmin(admin?._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Stack Layout */}
        <div className="block md:hidden">
          {" "}
          {/* Show on small screens */}
          {adminData?.map((admin: any, index: number) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 mb-4 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <img
                  alt={admin?.name}
                  className="w-16 h-16 object-cover rounded"
                  src={admin?.profilePicture}
                />
                <div className="ml-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    {admin?.name}
                  </h2>
                </div>
              </div>
              <div className="flex justify-between">
                {user?._id === admin?._id ? null : (
                  <>
                    <Button
                      className="bg-green-500 font-bold text-lg"
                      onClick={() => handleOpenUpdateModal(admin)}
                    >
                      Update
                    </Button>

                    <Button
                      className="bg-red-500 font-bold text-lg"
                      isDisabled={userToDelete === admin?._id}
                      isLoading={userToDelete === admin?._id}
                      onClick={() => handleDeleteAdmin(admin?._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            <div className="p-4 text-lg">Update Profile Info</div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-4 pb-4 flex flex-col gap-3">
                {/* Register inputs with react-hook-form */}
                <Input label="Name" type="text" {...register("name")} />

                <Input
                  label="Profile Picture URL"
                  type="text"
                  {...register("profilePicture")}
                />

                <Input label="Bio" type="text" {...register("bio")} />
              </div>

              {/* Submit button */}
              <div className="flex justify-center pb-4">
                <Button
                  className="bg-button"
                  isDisabled={isPending}
                  isLoading={isPending}
                  type="submit"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default ManageAdmins;
