import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Cart component that displays and manages the user's shopping cart.
 *
 * @param {Object} props - The component props.
 * @param {number} props.userId - The ID of the user whose cart is to be displayed.
 *
 * The component fetches cart items from the backend using the provided `userId`.
 * It calculates the total amount and shipping charges based on the cart items.
 * The user can update their delivery information, which is validated before saving.
 * Displays loading state while fetching cart data and handles empty cart scenarios.
 */

/*******  90ae50cb-d9bd-4e32-8865-06ef0550b0b8  *******/const Cart = ({ userId }) => {
 
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [stateName, setStateName] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("");

  // Fetch cart items dynamically from backend
  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${userId}`);
      const data = await response.json();
      setCartItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  useEffect(() => {
    setTotalAmt(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setShippingCharge(totalAmt <= 200 ? 30 : totalAmt <= 400 ? 25 : 20);
  }, [totalAmt]);
const increaseQuantity = async (userId, productId, increase) => {
    try {
        const response = await axios.put(
            `http://localhost:8080/api/cart/update/${userId}/${productId}?increase=${increase}`
        );
        const updatedItem = response.data;

        // ✅ Update the local state by replacing the old item
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.productId === updatedItem.productId ? updatedItem : item
            )
        );
    } catch (error) {
        console.error("Error updating cart:", error);
    }
};

  
  const removeItem = async (itemId) => {
    try {
        await axios.delete(`http://localhost:8080/api/cart/delete/item/${itemId}`);
        
        // ✅ Re-fetch the latest cart from backend
        fetchCartItems(); 
    } catch (error) {
        console.error("Error deleting item:", error);
    }
};



const handleSaveInfo = async (item) => {
  if (!name || !phone || !email || !stateName || !city || !streetAddress || !pinCode || !country) {
    alert("Please fill in all fields.");
    return;
  }

  const orderData = {
    userId,
    productId: cartItems.map(item => item.productId),
    quantity: cartItems.map(item => item.quantity),
    totalAmount: totalAmt,
    orderStatus: "Processing",
    paymentMethod: "", // Can be dynamic
    transactionId: "", // Generate or receive dynamically
    shippingAddress: `${streetAddress}, ${city}, ${stateName}, ${pinCode}, ${country}`,
    orderDate: new Date().toISOString().split("T")[0], // Current date
    shippingDate: "", // Can be set based on processing rules
    deliveryDate: "" // To be updated when shipped
  };
  console.log(orderData);
  
  try {
    const response = await axios.post("http://localhost:8080/api/order/placeorder", orderData);
    alert("Order information saved successfully!");
    console.log("Saved Order:", response.data);
  } catch (error) {
    console.error("Error saving order:", error);
    alert("Failed to save order. Try again!");
  }
};

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-lg font-semibold">Loading cart...</p>
        </div>
      ) : cartItems.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {cartItems.map((item) => (
              <ItemCard key={item.id} item={item} increaseQuantity={increaseQuantity}  removeItem={removeItem} />
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mt-6">
            {/* Left side: Form */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 border border-gray-300 rounded-md p-4 shadow-sm">
              <h2 className="text-xl font-semibold">Delivery Information</h2>

              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 border rounded-md outline-none" />
              <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-10 px-3 border rounded-md outline-none" />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-10 px-3 border rounded-md outline-none" />
              <input type="text" placeholder="State" value={stateName} onChange={(e) => setStateName(e.target.value)} className="w-full h-10 px-3 border rounded-md outline-none" />
              <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full h-10 px-3 border rounded-md outline-none" />
              <input type="text" placeholder="Street Address" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="w-full h-10 px-3 border rounded-md outline-none" />
              <input type="text" placeholder="Pin Code" value={pinCode} onChange={(e) => setPinCode(e.target.value)} className="w-full h-10 px-3 border rounded-md outline-none" />
              <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full h-10 px-3 border rounded-md outline-none" />

              <button onClick={handleSaveInfo} className="w-full h-10 bg-primeColor text-white hover:bg-black duration-300 mt-2 rounded-md">
                Save Info
              </button>
            </div>

            {/* Right side: Cart totals */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 border border-gray-300 rounded-md p-4 shadow-sm">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal <span className="font-semibold tracking-wide font-titleFont">₹{totalAmt}</span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge <span className="font-semibold tracking-wide font-titleFont">₹{shippingCharge}</span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total <span className="font-bold tracking-wide text-lg font-titleFont">₹{totalAmt + shippingCharge}</span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20">
          <img className="w-80 rounded-lg p-4 mx-auto" src={emptyCart} alt="emptyCart" />
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">Your Cart is Empty</h1>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;