"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const ITEMS_PER_PAGE = 5; // Number of items per page for pagination

export default function Interests() {
  const [categories, setCategories] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `/api/categories/allcategories?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.success) {
          setCategories(data.categoriesData);
          setTotalPages(Math.ceil(data.totalItems / ITEMS_PER_PAGE)); // Calculate total pages
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [currentPage]);

  const handleCheckboxChange = async (categoryId) => {
    const updatedInterests = new Set(selectedInterests);
    if (updatedInterests.has(categoryId)) {
      updatedInterests.delete(categoryId);
    } else {
      updatedInterests.add(categoryId);
    }
    setSelectedInterests(updatedInterests); // Update state immediately for UX

    // Prepare data for API call
    const interestsArray = Array.from(updatedInterests);

    try {
      const response = await axios.put(
        "/api/users/me",
        {
          interests: interestsArray, // Send selected category IDs
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log("Interests updated successfully", response.data.data);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col inset-0 w-[33%] max-w-md p-4 mx-auto rounded-lg border mt-[5%] border-gray-300 bg-white shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Please mark your interests!</h2>
        <p className="mb-4">We will keep you notified.</p>
      </div>
      <form className="flex flex-col mt-3 gap-4 pl-[5%]">
        <p className="font-inter font-semibold text-[20px] leading-[26px]">
          My saved Interest
        </p>
        {categories.map((category) => (
          <label
            key={category._id}
            className={`flex items-center space-x-3 ${
              selectedInterests.has(category._id) ? "bg-[#92b6ff4a]" : "" // Add background color when selected
            }`}
          >
            <input
              type="checkbox"
              checked={selectedInterests.has(category._id)}
              onChange={() => handleCheckboxChange(category._id)}
              className="form-checkbox h-5 w-5"
            />
            <span>
              {category.name
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </span>
          </label>
        ))}
      </form>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg disabled:opacity-50"
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        {getPageRange().map((page) => (
          <span
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-2 py-1 cursor-pointer ${
              page === currentPage ? "font-bold" : ""
            }`}
          >
            {page}
          </span>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg disabled:opacity-50"
        >
          <MdOutlineKeyboardArrowRight />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
}
