import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const items = [
    {
      _id: 990,
      title: "Clay and Pottery Crafts",
      icons: true,
    },
    {
      _id: 991,
      title: "Wood Crafts",
    },
    {
      _id: 992,
      title: "Metal Crafts",
      icons: true,
    },
    {
      _id: 993,
      title: "Glass Crafts",
    },
    {
      _id: 995,
      title: "Beadwork and Jewelry",
    },
    {
      _id: 996,
      title: "Natural Material Crafts",
    },
    {
      _id: 997,
      title: "Decorative and Festive Crafts",
    },
  ];
  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, title, icons }) => (
            <li
              key={_id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
            >
              {title}
              {/* {icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )} */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
