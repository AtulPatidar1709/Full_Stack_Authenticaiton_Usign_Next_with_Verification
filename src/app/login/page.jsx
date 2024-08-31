"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.data.success) {
        toast.success("Logged In Successfully");
        router.push("/profile");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        "Something Went Wrong: " +
          (error.response?.data?.error || error.message)
      );
      console.error("Error in Frontend:", error);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-inter font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-2/5 xl:w-1/3 h-[60%] p-4 mx-auto mt-[10%] rounded-lg border border-gray-300 bg-white shadow-lg max-w-[90%]">
      <div className="flex flex-col items-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Login</h1>
        <h1 className="font-inter font-semibold text-base sm:text-xl leading-6 sm:leading-8 text-center mb-4">
          Welcome back to ECOMMERCE.
        </h1>
        <p className="font-inter font-normal text-sm sm:text-base leading-5 sm:leading-6 text-center mb-4">
          The next-gen business marketplace.
        </p>
      </div>
      <form
        onSubmit={onSignup}
        className="flex flex-col mt-3 gap-2 sm:gap-4 w-full px-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm sm:text-base font-semibold">
            Email
          </label>
          <input
            id="email"
            className="w-full px-3 py-2 rounded-md border border-gray-300"
            type="email"
            placeholder="Enter your Email..."
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm sm:text-base font-semibold"
          >
            Password
          </label>
          <input
            id="password"
            className="w-full px-3 py-2 rounded-md border border-gray-300"
            type="password"
            placeholder="Enter your Password..."
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-5 bg-black text-white rounded-md hover:bg-gray-800 mt-4"
          disabled={buttonDisable}
        >
          {buttonDisable ? "Please Enter all Fields" : "Log In"}
        </button>
        <div className="w-full h-[2px] bg-[#C1C1C1] my-4"></div>
        <p className="text-center">
          <span className="font-inter font-normal text-sm sm:text-base leading-tight">
            Don’t have an Account?{" "}
          </span>
          <Link
            href={"/signup"}
            className="text-black font-bold hover:underline"
          >
            SIGN UP
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Page;
