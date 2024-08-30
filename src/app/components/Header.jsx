"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { RiLogoutBoxRFill } from "react-icons/ri";

const Header = () => {
  const router = useRouter();

  const logOutHandler = useCallback(async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [router]);

  useCallback(() => {
    getUserDetails();
  }, []);

  return (
    <>
      {/* Top navigation */}
      <div className="flex flex-col justify-around h-[100px] px-[5%]">
        {/* Links */}
        <div className="flex justify-end">
          <ul className="flex gap-5">
            <Link href={"/"}>Help</Link>
            <Link href={"/"}>Orders & Returns</Link>
            {/* Conditionally render based on isMounted */}
            <Link href={"/"}>Hi, "John"</Link>
          </ul>
        </div>
        {/* Main header */}
        <div className="flex items-end justify-between mb-[1.2rem]">
          <Link
            href={"/"}
            className="font-inter font-bold text-2xl leading-[38.73px]"
          >
            Ecommerce
          </Link>
          {/* Categories */}
          <ul className="font-inter font-semibold text-base leading-[19.36px] flex gap-8">
            <Link href={"/"}>Categories</Link>
            <Link href={"/"}>Sale</Link>
            <Link href={"/"}>Clearance</Link>
            <Link href={"/"}>New stock</Link>
            <Link href={"/"}>Trending</Link>
          </ul>
          {/* Search and cart icons */}
          <div className="flex gap-2 justify-end">
            <Link href={"/"}>
              <CiSearch size={20} />
            </Link>
            <Link href={"/"}>
              <FiShoppingCart size={20} />
            </Link>
            {/* {data && (
              <Link href={"/"} onClick={logOutHandler}>
                <RiLogoutBoxRFill size={20} />
              </Link>
            )} */}
          </div>
        </div>
      </div>
      {/* Promo banner */}
      <div className="bg-[#F4F4F4]">
        <div className="text-black flex justify-center items-center py-2 gap-5">
          <Link href={"/"}>
            <FaChevronLeft />
          </Link>
          <h4>Get 10% off on Business Signup</h4>
          <Link href={"/"}>
            <FaChevronRight />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
