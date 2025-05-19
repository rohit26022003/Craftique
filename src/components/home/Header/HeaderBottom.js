import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";

const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [showUser, setShowUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowUser(false);
        setShowResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = paginationItems.filter((item) =>
        item.productName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleResultClick = (item) => {
    navigate(`/product/${item.productName.toLowerCase().replace(/\s+/g, "")}`, {
      state: { item: item },
    });
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className="w-full bg-[#dcdcdc] text-[#333] shadow-md relative" ref={ref}>
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          {/* Search Bar */}
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-black bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#aaa] placeholder:text-[14px]"
              type="text"
              onChange={handleSearchChange}
              value={searchQuery}
              placeholder="Search your products here"
              onFocus={() => searchQuery && setShowResults(true)}
            />
            <FaSearch className="w-5 h-5 text-gray-600" />

            {showResults && (
              <div className="absolute top-[60px] left-0 w-full bg-white max-h-[400px] overflow-y-auto z-50 shadow-2xl rounded-md border border-gray-200">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleResultClick(item)}
                      className="flex gap-3 items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    >
                      <img src={item.img} alt={item.productName} className="w-16 h-16 object-cover" />
                      <div>
                        <p className="font-medium text-sm">{item.productName}</p>
                        <p className="text-xs text-gray-600">{item.des}</p>
                        <p className="text-sm text-primeColor font-semibold">₹{item.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500">No products found.</div>
                )}
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
                  <li className="text-gray-700 px-4 py-1 border-b hover:text-black cursor-pointer">Login</li>
                </Link>
                <Link to="/signup" onClick={() => setShowUser(false)}>
                  <li className="text-gray-700 px-4 py-1 border-b hover:text-black cursor-pointer">Sign Up</li>
                </Link>
                <Link to="/orders" onClick={() => setShowUser(false)}>
                  <li className="text-gray-700 px-4 py-1 border-b hover:text-black cursor-pointer">Orders</li>
                </Link>
                <Link to="/profile" onClick={() => setShowUser(false)}>
                  <li className="text-gray-700 px-4 py-1 hover:text-black cursor-pointer">Profile</li>
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
