import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";

const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
        setShowUser(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div
      className="w-full bg-[#dcdcdc] text-[#333] shadow-md relative"
      ref={ref}
    >
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">

          {/* Search Bar */}
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-black bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#aaa] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5 text-gray-600" />
            {searchQuery && (
              <div className="w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer">
                {filteredProducts.map((item) => (
                  <div
                    onClick={() => {
                      navigate(
                        `/product/${item.productName
                          .toLowerCase()
                          .split(" ")
                          .join("")}`,
                        { state: { item: item } }
                      );
                      setSearchQuery("");
                    }}
                    key={item._id}
                    className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                  >
                    <img className="w-24" src={item.img} alt="productImg" />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">
                        {item.productName}
                      </p>
                      <p className="text-xs">{item.des}</p>
                      <p className="text-sm">
                        Price:{" "}
                        <span className="text-primeColor font-semibold">
                          ${item.price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User & Cart Section */}
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex items-center gap-1">
              <FaUser />
              <FaCaretDown />
            </div>

            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-white text-black w-44 h-auto p-4 pb-6 shadow-lg"
              >
                <Link to="/signin" onClick={() => setShowUser(false)}>
                  <li className="text-gray-700 px-4 py-1 border-b border-b-gray-300 hover:border-b-black hover:text-black duration-300 cursor-pointer">
                    Login
                  </li>
                </Link>
                <Link to="/signup" onClick={() => setShowUser(false)}>
                  <li className="text-gray-700 px-4 py-1 border-b border-b-gray-300 hover:border-b-black hover:text-black duration-300 cursor-pointer">
                    Sign Up
                  </li>
                </Link>
                <Link to="/orders" onClick={() => setShowUser(false)}>
                  <li className="text-gray-700 px-4 py-1 border-b border-b-gray-300 hover:border-b-black hover:text-black duration-300 cursor-pointer">
                    Orders
                  </li>
                </Link>
                <Link to="/profile" onClick={() => setShowUser(false)}>
                  <li className="text-gray-700 px-4 py-1 border-b border-b-gray-300 hover:border-b-black hover:text-black duration-300 cursor-pointer">
                    Profile
                  </li>
                </Link>
              </motion.ul>
            )}

            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-[#b66e47] text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          </div>

        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
