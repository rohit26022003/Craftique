import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email!");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };

  return (
    <div className="w-full bg-[#f2efe5] text-[#333333] py-20">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 px-4 gap-10">
        {/* Why Choose Us */}
        <div className="col-span-2">
          <FooterListTitle title="Why Choose Us?" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%]">
              Handcrafted products reflect unique creativity and traditional skills.
              They support local artisans and preserve cultural heritage.
              Each item is made with personal care and attention to detail.
              They are often more sustainable and eco-friendly than mass-produced goods.
            </p>
            <ul className="flex items-center gap-2">
              {[FaYoutube, FaGithub, FaFacebook, FaLinkedin].map((Icon, idx) => (
                <li
                  key={idx}
                  className="w-7 h-7 bg-[#555555] text-white hover:bg-black cursor-pointer text-lg rounded-full flex justify-center items-center duration-300"
                >
                  <Icon />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Shop Links */}
        <div className="xl:col-span-2 flex justify-center">
          <div>
            <FooterListTitle title="Shop" />
            <ul className="flex flex-col gap-2">
              {["Natural Craft", "Wood Craft", "Festive Craft", "Clay Craft", "Ornament"].map((item, idx) => (
                <li
                  key={idx}
                  className="font-titleFont text-base hover:text-black hover:underline decoration-[1px] underline-offset-2 cursor-pointer duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Account Links */}
        <div className="xl:col-span-2 flex justify-end">
          <div>
            <FooterListTitle title="Your Account" />
            <ul className="flex flex-col gap-2">
              {["Profile", "Orders", "Addresses", "Account Details", "Payment Options"].map((item, idx) => (
                <li
                  key={idx}
                  className="font-titleFont text-base hover:text-black hover:underline decoration-[1px] underline-offset-2 cursor-pointer duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Subscription/Payment Section */}
        <div className="col-span-full mt-10">
          <div className="w-full text-center">
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-base font-titleFont font-semibold text-green-700"
              >
                Subscribed Successfully!
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-center items-center gap-4">
                {errMsg && (
                  <p className="text-red-600 text-sm font-semibold font-titleFont animate-bounce mt-2">
                    {errMsg}
                  </p>
                )}
              </div>
            )}

            <Image
              className={`w-[80%] lg:w-[60%] mx-auto ${subscription ? "mt-2" : "mt-6"}`}
              // imgSrc={paymentCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
