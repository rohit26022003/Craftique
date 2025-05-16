import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4 py-10">
      <Breadcrumbs title="About Us" prevLocation={prevLocation} />

      <div className="mt-8 text-[#333]">
        <h1 className="text-3xl font-bold text-primeColor mb-4">Welcome to CRAFTIQUE</h1>
        <p className="text-lg leading-7 text-justify mb-6">
          <span className="font-semibold">CRAFTIQUE</span> is your gateway to the rich tapestry of India’s artisanal heritage.
          We bring you handpicked, one-of-a-kind handmade creations that blend timeless traditions with modern expression.
          From intricate woodwork and handwoven textiles to clay sculptures and metal artistry, each product in our collection
          reflects the spirit, story, and skill of its maker.
        </p>

        <p className="text-lg leading-7 text-justify mb-6">
          Our journey began with a mission to empower rural artisans and preserve dying art forms by giving them a platform to
          reach a global audience. At CRAFTIQUE, we believe in sustainability, fair trade, and cultural preservation. Our
          artisans, hailing from different parts of India, infuse soul into every piece they craft – whether it's a hand-embroidered bag,
          a terracotta figurine, or a bamboo-crafted lamp.
        </p>

        <p className="text-lg leading-7 text-justify mb-6">
          When you shop with us, you don’t just buy a product — you carry forward a story, a tradition, and a legacy.
          Our offerings include:
        </p>

        <ul className="list-disc list-inside text-lg mb-6">
          <li>Handwoven fabrics from Bengal and Kutch</li>
          <li>Terracotta and ceramic art from West Bengal and Rajasthan</li>
          <li>Wood and bamboo craft from the Northeast</li>
          <li>Metal works like Dokra from Chhattisgarh</li>
          <li>Hand-painted items inspired by Madhubani, Pattachitra, and Warli art</li>
        </ul>

        <p className="text-lg leading-7 text-justify mb-8">
          Every product is ethically sourced, quality-checked, and packaged with care. We are proud to be a community-driven platform
          that supports creativity, culture, and craftsmanship. Join us in celebrating handmade excellence and helping traditional
          artisans thrive in a modern world.
        </p>

        <Link to="/shop">
          <button className="w-52 h-12 bg-primeColor text-white hover:bg-black transition-all duration-300 rounded-full font-semibold text-lg">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
