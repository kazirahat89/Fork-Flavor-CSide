"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useUser } from "@/src/context/user.provider";
import { useChangePassword } from "@/src/hooks/auth.hooks";
import { logout } from "@/src/services/AuthService";

const ChangePassword = () => {
  const { user, setIsLoading } = useUser();

  const router = useRouter();

  const { mutate: changePassword, isPending, data } = useChangePassword();

  // Initialize the useForm hook
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (data && !data.success) {
      toast.error(data.message);
    } else if (data && data.success) {
      toast.success("Password changed successfully");
      logout();
      setIsLoading(true);
      router.push("/login");
    }
  }, [data]);

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    const payload = {
      email: user?.email,
      password: data.password,
      newPassword: data.newPassword,
    };

    changePassword(payload);
  };

  return (
    <div className="py-12">
      <h1 className="text-center  text-black text-4xl font-bold">
        Chnage Your <span className="text-[#e69f42]">Password</span> Here{" "}
      </h1>
      <div className="bg-[#F5EDED]  mt-10 flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Change Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2 text-lg"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                readOnly
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 hover:cursor-not-allowed font-bold text-lg`}
                id="email"
                placeholder="Your Email Address"
                type="email"
                value={user?.email}
              />
            </div>

            {/* Current Password Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2 text-lg"
                htmlFor="currentPassword"
              >
                Current Password
              </label>
              <input
                {...register("password")}
                required
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 font-bold text-lg`}
                id="password"
                placeholder=" Current Password"
                type="password"
              />
            </div>

            {/* New Password Field */}
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2 text-lg"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                {...register("newPassword")}
                required
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 font-bold text-lg`}
                id="newPassword"
                placeholder="New Password"
                type="password"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <Button
                className="bg-button hover:bg-button-dark text-white text-lg font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                isDisabled={isPending}
                isLoading={isPending}
                type="submit"
              >
                Change Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
