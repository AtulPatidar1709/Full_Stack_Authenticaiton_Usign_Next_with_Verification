"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import Loader from "../feed/loader";

const ITEMS_PER_PAGE = 5; // Number of items per page for pagination

export default function Interests() {
  const [categories, setCategories] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const userResponse = await fetch("/api/users/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!userResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const userData = await userResponse.json();
        if (userData.success) {
          setSelectedInterests(new Set(userData.data.interests));
        } else {
          throw new Error(userData.message);
        }

        const categoryResponse = await fetch(
          `/api/categories/allcategories?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        );
        if (!categoryResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const categoryData = await categoryResponse.json();
        if (categoryData.success) {
          setCategories(categoryData.categoriesData);
          setTotalPages(Math.ceil(categoryData.totalItems / ITEMS_PER_PAGE)); // Calculate total pages
        } else {
          throw new Error(categoryData.error);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
  }, [currentPage]);

  const handleCheckboxChange = async (categoryId) => {
    const updatedInterests = new Set(selectedInterests);
    if (updatedInterests.has(categoryId)) {
      updatedInterests.delete(categoryId);
    } else {
      updatedInterests.add(categoryId);
    }
    setSelectedInterests(updatedInterests); // Update state immediately for UX

    const interestsArray = Array.from(updatedInterests);

    try {
      const response = await axios.put(
        "/api/users/me",
        { interests: interestsArray }, // Send selected category IDs
        { headers: { "Content-Type": "application/json" } }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // console.log("Interests updated successfully", response.data.data);
    } catch (error) {
      console.error("Error updating interests", error.message);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setLoading(true); // Set loading to true while fetching new data
    }
  };

  const getPageRange = () => {
    const range = [];
    const start = Math.max(1, currentPage - 3);
    const end = Math.min(totalPages, currentPage + 3);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col w-full sm:w-3/4 sm:mt-[10%] md:w-2/3 lg:w-2/5 lg:mt-[10%] xl:w-1/3 xl:mt-[10%] p-4 mx-auto rounded-lg mt-[10%] border border-gray-300 bg-white shadow-lg max-w-[90%]">
      <div className="flex flex-col items-center">
        <h2 className="text-[1rem] sm:text-2xl font-bold mb-2 sm:mb-4">
          Please mark your interests!
        </h2>
        <p className="text-sm sm:text-base mb-4">We will keep you notified.</p>
      </div>
      <form className="flex flex-col mt-3 gap-2 sm:gap-4 w-full px-4">
        <p className="font-inter font-semibold text-lg sm:text-xl leading-[26px]">
          My saved Interests
        </p>
        {categories.map((category) => (
          <label
            key={category._id}
            className={`flex items-center space-x-3 p-2 rounded ${
              selectedInterests.has(category._id) ? "bg-blue-100" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={selectedInterests.has(category._id)}
              onChange={() => handleCheckboxChange(category._id)}
              className="form-checkbox h-5 w-5"
            />
            <span className="text-sm sm:text-base">
              {category.name
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </span>
          </label>
        ))}
      </form>
      <div className="flex justify-center items-center text-[#ACACAC] space-x-2 mt-6 w-full px-4">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className=" rounded-lg disabled:opacity-50 "
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg disabled:opacity-50 "
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        {getPageRange().map((page) => (
          <span
            key={page}
            onClick={() => handlePageChange(page)}
            className={`cursor-pointer ${
              page === currentPage ? "font-bold text-black" : ""
            }`}
          >
            {page}
          </span>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg disabled:opacity-50 "
        >
          <MdOutlineKeyboardArrowRight />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className=" rounded-lg disabled:opacity-50 "
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
}
