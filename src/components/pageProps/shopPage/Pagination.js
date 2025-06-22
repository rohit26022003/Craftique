import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom"; 

const Pagination = ({ itemsPerPage, selectedCategory, selectedPriceRange, products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        (!selectedCategory || item.category === selectedCategory) &&
        item.price >= selectedPriceRange.min &&
        item.price <= selectedPriceRange.max
      )
    );
  }, [selectedCategory, selectedPriceRange, products]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const navigate = useNavigate();
  const handlePageClick = (event) => {
    setItemOffset(event.selected * itemsPerPage);
  };
  const token = localStorage.getItem("token");
  // Add product to cart (Store in Database)
  const addToCart = async (item) => {
    if (!token) {
      alert("Please log in to add items to your cart.");
      navigate("/signin");
      return;
    }
    if(item.stock === 0){
         alert("product is out of stock")
         return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/cart/additem", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         productId: item.id,
          userId: localStorage.getItem("userid"),
          name: item.name,
          price: item.price,
          quantity: 1,
          imagePath: item.imagePath
        }),
      });

      if (response.ok) {
        alert(`${item.name} added to cart!`);
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {currentItems.map((item) => (
            <div key={item.id} className="w-[300px] h-[450px] flex flex-col justify-between border p-4 bg-gradient-to-b from-pink-200 to-white rounded-lg shadow-md">
              <img
                src={item.imagePath}
                alt={item.name}
                className="w-full h-[250px] object-cover rounded"
              />
              <div className="flex flex-col justify-between h-[120px] overflow-hidden text-center">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.description}</p>
                <span className="text-md font-bold">₹{item.price}</span>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-4 mt-4 justify-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart 🛒
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => window.location.href = `/product/${item.id}`}
                >
                  View Details 🔎
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found within the selected category and price range.</p>
      )}

      <ReactPaginate
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel="Previous"
        pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
        pageClassName="mr-6"
        containerClassName="flex text-base font-semibold font-titleFont py-10"
        activeClassName="bg-black text-white"
      />
    </div>
  );
};

export default Pagination;