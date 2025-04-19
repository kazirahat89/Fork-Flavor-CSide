/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { Image } from "@nextui-org/react";

import { useCreateAdmin } from "@/src/hooks/user.hooks";

const CreateAdminForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const { mutate: createAdmin, isPending, data } = useCreateAdmin();

  useEffect(() => {
    if (data && !data.success) {
      toast.error(data.message);
    } else if (data && data.success) {
      toast.success("Admin created successfully!");
    }
  }, [data]);

  const onSubmit = async (data: any) => {
    if (!data.profilePicture) {
      data.profilePicture =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s";
    }

    createAdmin(data);

    reset();
  };

  return (
    <div className="flex items-center justify-center p-6 mb-5 gap-10">
      <Image
        alt="admin image"
        className="lg:max-w-xl max-w-sm"
        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Create Admin
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              required
              className="w-full bg-gray-300 px-4 py-2 border rounded-lg text-gray-900 outline-none"
              type="text"
              {...register("name")}
              placeholder="Admin Name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              required
              className="w-full bg-gray-300 px-4 py-2 border rounded-lg text-gray-900 outline-none"
              type="email"
              {...register("email")}
              placeholder="Admin Email Address"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              required
              className="w-full bg-gray-300 px-4 py-2 border rounded-lg text-gray-900 outline-none"
              type="password"
              {...register("password")}
              placeholder="Admin Password"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Admin Image URL
            </label>
            <input
              className="w-full bg-gray-300 px-4 py-2 border rounded-lg text-gray-900 outline-none"
              type="text"
              {...register("profilePicture")}
              placeholder="Admin Image URL"
            />
          </div>

          {/* Submit Button */}
          <Button
            className="w-full bg-[#e69f42] font-bold text-lg rounded-none hover:bg-white hover:text-[#e69f42] hover:text-[#e69f42] hover:border-[#e69f42] hover:border-2 transition duration-300"
            isDisabled={isPending}
            isLoading={isPending}
            type="submit"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminForm;
