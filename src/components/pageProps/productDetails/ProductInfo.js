import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Placeholder for fetched reviews — replace with actual data from props or backend
  const reviews = productInfo.reviews || [
    {
      id: 1,
      name: "Aarav Sharma",
      rating: 5,
      comment: "Excellent quality! Totally worth it.",
    },
    {
      id: 2,
      name: "Priya Mehta",
      rating: 4,
      comment: "Loved the color and design. Delivery was fast too.",
    },
  ];

  return (
    <div className="flex flex-col gap-5 relative">
      {/* Back arrow
      <button
        onClick={() => navigate("/")}
        className="absolute top-0 left-0 text-2xl font-bold text-gray-700 hover:text-black px-2 py-1"
      >
        ←
      </button> */}

      <h2 className="text-4xl font-semibold mt-8">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">₹{productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>

      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo.id,
              name: productInfo.productName,
              quantity: 1,
              image: productInfo.img,
              badge: productInfo.badge,
              price: productInfo.price,
              colors: productInfo.color,
            })
          )
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>

      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> Spring
        collection, Streetwear, Women Tags: featured SKU: N/A
      </p>

      {/* Display Reviews Section */}
      <div className="border-t pt-4 mt-4">
        <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < review.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
