import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";

const ProductDetails = () => {
  const { id } = useParams(); // Extract product ID from URL
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch product details dynamically
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/product/${id}`);
        if (!response.ok) throw new Error("Product not found!");
        const data = await response.json();
        setProductInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title={productInfo ? productInfo.name : "Product Details"} />
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading product details...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-10">{error}</p>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
            <div className="h-full xl:col-span-2 relative">
              {/* Back Arrow */}
              <button
                onClick={() => navigate("/")}
                className="absolute top-2 left-2 text-4xl font-bold text-gray-800 hover:text-black z-10 bg-white rounded-full p-1"
                title="Go back"
              >
                ←
              </button>

              {/* Product Image */}
              <img
                className="w-full max-w-[500px] h-auto max-h-[900px] object-contain mx-auto"
                src={productInfo.imagePath}
                alt={productInfo.name}
              />
            </div>

            {/* Product Information */}
            <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
              <ProductInfo productInfo={productInfo} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;