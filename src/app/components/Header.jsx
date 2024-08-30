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
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; // Hamburger and close icons

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu toggle

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <>
      {/* Top navigation */}
      <div className="flex flex-col justify-around  py-[1rem] px-[5%]">
        {/* Links */}
        <div className="flex justify-end">
          <ul className="hidden md:flex gap-5">
            {" "}
            {/* Hidden on small screens */}
            <Link href={"/"}>Help</Link>
            <Link href={"/"}>Orders & Returns</Link>
            <Link href={"/"}>Hi, "John"</Link>{" "}
            {/* Conditionally render based on isMounted */}
          </ul>
        </div>
        {/* Main header */}
        <div className="flex items-center justify-between">
          {/* Hamburger menu for mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-black text-2xl"
          >
            {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
          {/* Logo */}
          <Link
            href={"/"}
            className="font-inter font-bold text-2xl leading-[38.73px]"
          >
            Ecommerce
          </Link>
          {/* Categories */}
          <ul
            className={`font-inter font-semibold text-base leading-[19.36px] gap-8 md:flex ${
              isMenuOpen
                ? "flex flex-col justify-center absolute top-20 left-0 w-full bg-white p-4 z-10"
                : "hidden"
            }`}
          >
            <Link href={"/"} className="hover:text-blue-500 transition">
              Categories
            </Link>
            <Link href={"/"} className="hover:text-blue-500 transition">
              Sale
            </Link>
            <Link href={"/"} className="hover:text-blue-500 transition">
              Clearance
            </Link>
            <Link href={"/"} className="hover:text-blue-500 transition">
              New stock
            </Link>
            <Link href={"/"} className="hover:text-blue-500 transition">
              Trending
            </Link>
          </ul>
          {/* Search and cart icons */}
          <div className="flex gap-2 justify-end">
            <Link href={"/"}>
              <CiSearch size={20} />
            </Link>
            <Link href={"/"}>
              <FiShoppingCart size={20} />
            </Link>
            {/* Conditionally render based on user data */}
            <Link href={"/"} onClick={logOutHandler}>
              <RiLogoutBoxRFill size={20} />
            </Link>
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
