/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import Link from "next/link";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Image } from "@nextui-org/react";

import { useUserLogin } from "@/src/hooks/auth.hooks";
import { useUser } from "@/src/context/user.provider";

const MainContentsOfLogin = () => {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const {
    mutate: handleUserLogin,
    isPending,
    data: userLoginResponse,
  } = useUserLogin();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (userLoginResponse && !userLoginResponse.success) {
      toast.error(userLoginResponse.message);
    } else if (userLoginResponse && userLoginResponse.success) {
      router.push("/");
      toast.success("Logged in successfully");
    }
  }, [userLoginResponse]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  return (
    <div>
      <div className="bg-[#F5EDED]">
        <div className="py-16">
          <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-5xl">
            {/* Left Image */}
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Image
              alt=""
                className=""
                src="https://images.unsplash.com/photo-1528712306091-ed0763094c98?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </motion.div>

            {/* Right Form */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="w-full p-8 lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-semibold text-[#e69f42] text-center">
             Login Now !!!
              </h2>
         
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                  <label className="block text-black text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    {...register("email", { required: "Email is required" })} // Register with validation
                    className="bg-gray-200 text-black font-bold focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    placeholder="Email Address"
                    type="email"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between">
                    <label className="block text-black text-sm font-bold mb-2">
                      Password
                    </label>
                  </div>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })} // Register with validation
                    className="bg-gray-200 text-black font-bold focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    placeholder="Password"
                    type="password"
                  />
                </div>

                <div className="mt-8">
                  <Button
                    className="bg-[#e69f42] hover:bg-button-dark hover:text-[#e69f42] hover:bg-white hover:border-2 hover:border-[#e69f42] text-white font-bold py-2 px-4 w-full rounded text-lg"
                    isDisabled={isPending}
                    isLoading={isPending}
                    type="submit"
                  >
                    {isPending ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>

              <div className="mt-4">
                <p className="text-xl text-gray-600">
                  New to this platform?, Then go to {" "}
                  <Link
                    className="hover:underline text-[#e69f42]"
                    href="/register"
                  >
                    Sign up
                  </Link>
                </p>

                <p className="text-lg text-gray-600 mt-3">
                  Forgot your password?{" "}
                  <Link
                    className="hover:underline text-[#e69f42]"
                    href="/forgot-password"
                  >
                    Reset password 
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentsOfLogin;
