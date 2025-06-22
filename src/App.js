import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  Outlet,
} from "react-router-dom";

// Import components/pages
import Footer from "./components/home/Footer/Footer";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import ChatBot from "./components/ChatBot";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import ProfilePage from "./pages/Profile/ProfilePages";
import OrderDetails from "./components/OrderDetails";
import OrderProductDetails from "./components/OrderProductDetails";

// ✅ Toastify for notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Error page
const ErrorPage = () => {
  return (
    <div className="text-center p-10">
      <h2 className="text-2xl font-semibold mb-4">404 - Page Not Found</h2>
      <p className="mb-4">
        Oops! The page you are looking for does not exist or something went wrong.
      </p>
      <a href="/" className="text-blue-500 underline">
        Go back to Home
      </a>
    </div>
  );
};
console.log("userid:",localStorage.getItem("userid"))
// Get userId from localStorage
const userId = localStorage.getItem("userid") || null;

// Layout with header, footer, etc.
const Layout = () => {
  return (
    <div className="bg-[#dcdcdc] min-h-screen">
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

// Simple layout (used for profile, orders, etc.)
const SimpleLayout = () => {
  return (
    <div className="bg-[#dcdcdc] min-h-screen">
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Full Layout Pages */}
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="offer" element={<Offer />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart userId={userId} />} />
        <Route path="paymentgateway" element={<Payment />} />
      </Route>

      {/* Simple Layout Pages */}
      <Route element={<SimpleLayout />} errorElement={<ErrorPage />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="orders" element={<OrderDetails />} />
        <Route path="order-product/:id" element={<OrderProductDetails />} />
      </Route>

      {/* Auth Pages */}
      <Route path="signup" element={<SignUp />} errorElement={<ErrorPage />} />
      <Route path="signin" element={<SignIn />} errorElement={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont relative">
      {/* ✅ Global Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={2000} />
      
      <RouterProvider router={router} />
      <ChatBot />
    </div>
  );
}

export default App;
