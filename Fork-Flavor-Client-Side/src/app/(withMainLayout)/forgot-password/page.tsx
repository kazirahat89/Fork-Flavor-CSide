"use client";

import { Button } from "@nextui-org/button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useResetPassword } from "@/src/hooks/auth.hooks";

const ForgotPassword = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const { mutate: resetPassword, isPending, data } = useResetPassword();

  useEffect(() => {
    if (data && !data.success) {
      toast.error(data.message);
    } else if (data && data.success) {
      toast.success("Password reset link has been emailed to you!");
      router.push("/login");
    }
  }, [data]);

  const onSubmit = (data: any) => {
    resetPassword(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Forgot Password?
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className="block text-lg text-gray-700 font-medium"
              htmlFor="email"
            >
              Enter your email
            </label>
            <input
              required
              id="email"
              type="email"
              {...register("email")}
              className={`mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none bg-gray-200 text-gray-800 text-lg`}
            />
          </div>

          {/* Submit Button */}
          <Button
            className="w-full py-3 bg-button text-white rounded-lg font-bold text-lg"
            isDisabled={isPending}
            isLoading={isPending}
            type="submit"
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
