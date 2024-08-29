"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      setLoading(false);

      // Redirect to the verify email page with the user's email as a query parameter
      router.push(`/verifyemail?email=${encodeURIComponent(user.email)}`);
    } catch (error) {
      setLoading(false); // Ensure loading state is reset
      toast.error(error.message || "An error occurred during signup.");
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.name.length > 0
    ) {
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
            Create your account
          </h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              type="text"
              placeholder="Enter your Name..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              type="email"
              placeholder="Enter your Email..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              type="password"
              placeholder="Enter your Password..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-5 bg-black text-white rounded-md hover:bg-gray-800"
            disabled={buttonDisable} // Disable button based on buttonDisable state
          >
            {buttonDisable ? "Please Fill Details" : "CREATE ACCOUNT"}
          </button>
          <p className="text-center pt-6">
            <span className="font-inter font-normal text-base leading-tight">
              Have an Account?{" "}
            </span>
            <Link
              href={"/login"}
              className="text-black font-bold hover:underline"
            >
              LOGIN
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};
export default Page;
