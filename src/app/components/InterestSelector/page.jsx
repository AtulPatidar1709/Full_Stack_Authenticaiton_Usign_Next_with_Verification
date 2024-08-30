// /components/InterestSelector.js
"use client";
import { useState } from "react";

const InterestSelector = ({ userId, initialCategories }) => {
  const [categories, setCategories] = useState(initialCategories);

  const handleCategoryClick = async (category) => {
    const updatedCategories = categories.map((item) =>
      item.name === category.name ? { ...item, selected: !item.selected } : item
    );
    setCategories(updatedCategories);

    const selectedCategories = updatedCategories
      .filter((item) => item.selected)
      .map((item) => item.name);

    // Send selected categories to the server
    try {
      const res = await fetch("/api/save-user-interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, selectedCategories }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Failed to save interests", data.message);
      }
    } catch (error) {
      console.error("Error saving interests:", error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-2">Please mark your interests!</h2>
      <p className="text-gray-500 mb-4">We will keep you notified.</p>
      <div className="flex flex-col items-start">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`flex items-center mb-2 cursor-pointer border p-2 rounded-md ${
              category.selected
                ? "bg-black text-white"
                : "bg-white text-black border-gray-300"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            <input
              type="checkbox"
              className="mr-2 accent-black"
              checked={category.selected}
              readOnly
            />
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterestSelector;
