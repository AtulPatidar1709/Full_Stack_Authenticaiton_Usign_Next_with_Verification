"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import OtpInput from "../components/OtpInput";
import toast from "react-hot-toast";
import axios from "axios";

const Page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [otpValues, setOtpValues] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
    otp7: "",
    otp8: "",
  });

  const handleChange = (e, id) => {
    const { value } = e.target;
    setOtpValues((prev) => {
      const newOtpValues = { ...prev, [id]: value };
      if (value && id !== "otp8") {
        const nextInput = document.getElementById(
          `otp${parseInt(id.slice(3)) + 1}`
        );
        nextInput?.focus();
      }
      return newOtpValues;
    });
  };

  const handleVerify = async () => {
    const enteredOtp = Object.values(otpValues).join(""); // Concatenate all values
    console.log(enteredOtp);

    try {
      const response = await axios.post("/api/users/verifyemail", {
        enteredOtp,
      });

      if (response.data.success) {
        toast.success("Verified Successfully");
        router.push("/login");
      } else {
        toast.error(response.data.error || "Verification failed");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center inset-0 w-[33%] max-w-md p-4 mx-auto rounded-lg border mt-[5%] border-gray-300 bg-white shadow-lg">
        {loading ? (
          "Loading..."
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
            className="flex flex-col w-full max-w-screen-md gap-[28px] px-[25px] pb-12"
          >
            <h1 className="font-inter pt-3 font-bold text-2xl leading-tight text-center">
              Verify Email
            </h1>
            <div className="flex gap-2 flex-col justify-center items-center">
              <h3 className="font-inter font-semibold text-xl leading-custom">
                Enter the 8 digit code you have received on
              </h3>
              <p className="font-inter font-normal text-base leading-custom">
                {email}
              </p>
            </div>
            <div>
              <p>Code</p>
              <div className="w-full flex flex-row gap-2.5 items-center justify-center">
                {Array.from({ length: 8 }).map((_, index) => (
                  <OtpInput
                    key={`otp${index + 1}`}
                    id={`otp${index + 1}`}
                    handleChange={handleChange}
                    value={otpValues[`otp${index + 1}`]}
                  />
                ))}
              </div>
            </div>
            <button
              className="w-full h-7 border-none bg-indigo-500 text-white font-semibold cursor-pointer rounded-md transition duration-200 hover:bg-indigo-400"
              type="submit"
            >
              Verify
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Page;
