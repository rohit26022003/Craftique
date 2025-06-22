import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch product reviews from backend
  useEffect(() => {
    if (productInfo?.id) {
      const fetchReviews = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/reviews/product/${productInfo.id}`
          );
          if (!response.ok) throw new Error("Reviews not found.");
          const data = await response.json();
          setReviews(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchReviews();
    }
  }, [productInfo]);

  // Handle add to cart logic
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to add items to your cart.");
        navigate("/signin");
        return;
      }
      if(productInfo.stock === 0){
         alert("product is out of stock")
         return;
    }
      const response = await fetch("http://localhost:8080/api/cart/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productInfo.id,
          name: productInfo.name,
          price: productInfo.price,
          quantity: 1,
          imagePath: productInfo.imagePath,
        }),
      });

      if (response.ok) {
        dispatch(addToCart({ ...productInfo, quantity: 1 }));
        alert(`${productInfo.name} added to cart!`);
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-5 relative">
      {productInfo ? (
        <>
          <h2 className="text-4xl font-semibold mt-8">{productInfo.name}</h2>
          <p className="text-xl font-semibold">₹{productInfo.price}</p>
          <p className="text-base text-gray-600">{productInfo.description}</p>
          <p className="font-medium text-lg">
            <span className="font-normal">Stock:</span> {productInfo.stock}
          </p>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
          >
            Add to Cart 🛒
          </button>

          <p className="font-normal text-sm">
            <span className="text-base font-medium">Categories:</span>{" "}
            {productInfo.category} Women
          </p>

          {/* Display Reviews */}
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
            {loading ? (
              <p className="text-gray-500">Loading reviews...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : reviews.length === 0 ? (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-2">
                    <p className="font-semibold">{review.userName || "Anonymous"}</p>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-red-500">Product details not found.</p>
      )}
    </div>
  );
};

export default ProductInfo;
