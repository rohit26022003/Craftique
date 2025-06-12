import React, { useState, useEffect } from "react";
import NavTitle from "./NavTitle";

const Category = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/unique-categories");
        const data = await response.json();
        setCategories(data.length ? data : ["No categories found"]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories(["Failed to load categories"]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
        {categories.map((name, index) => (
          <li
            key={index}
            className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between cursor-pointer hover:text-black"
            onClick={() => setSelectedCategory(name)}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;