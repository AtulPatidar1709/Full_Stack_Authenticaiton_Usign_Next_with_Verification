"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter correctly
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import toast from "react-hot-toast"; // Import toast for notifications

const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.data.success) {
        toast.success("Logged In Successfully");
        router.push("/");
      } else {
        throw new Error(response.data.error); // Proper error handling
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        "Something Went Wrong: " +
          (error.response?.data?.error || error.message)
      );
      console.error("Error in Frontend:", error); // Log the full error
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center inset-0 w-[33%] max-w-md p-4 mx-auto rounded-lg border mt-[5%] border-gray-300 bg-white shadow-lg">
      {loading ? (
        "Loading..."
      ) : (
        <form
          onSubmit={onSignup}
          className="flex flex-col w-full max-w-screen-md gap-[28px] px-[25px] pb-12"
        >
          <h1 className="font-inter pt-3 font-bold text-2xl leading-tight text-center">
            Login
          </h1>
          <div className="flex gap-2 flex-col justify-center items-center">
            <h3 className="font-inter font-semibold text-xl leading-custom">
              Welcome back to ECOMMERCE
            </h3>
            <p className="font-inter font-normal text-base leading-custom">
              The next gen business marketplace
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              type="email"
              placeholder="Enter your Email..."
              value={user.email} // Add value binding
              onChange={(e) => setUser({ ...user, email: e.target.value })} // Add onChange handler
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              id="password"
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              type="password"
              placeholder="Enter your Password..."
              value={user.password} // Add value binding
              onChange={(e) => setUser({ ...user, password: e.target.value })} // Add onChange handler
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-5 bg-black text-white rounded-md hover:bg-gray-800"
            disabled={buttonDisable} // Disable button if needed
          >
            {buttonDisable ? "Please Enter all Fields" : "Log In"}
          </button>
          <span className="w-full h-[2px] bg-[#C1C1C1]"></span>
          <p className="text-center pt-4">
            <span className="font-inter font-normal text-base leading-tight">
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
      )}
    </div>
  );
};

export default Page;
