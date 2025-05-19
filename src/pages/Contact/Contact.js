import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "Home");
  }, [location]);

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  const EmailValidation = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  };

  const handlePost = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!clientName) {
      setErrClientName("Enter your Name");
      isValid = false;
    }
    if (!email) {
      setErrEmail("Enter your Email");
      isValid = false;
    } else if (!EmailValidation(email)) {
      setErrEmail("Enter a Valid Email");
      isValid = false;
    }
    if (!messages) {
      setErrMessages("Enter your Message");
      isValid = false;
    }

    if (isValid) {
      setSuccessMsg(
        `Thank you, ${clientName}. Your message has been received successfully. We’ll respond to ${email} shortly.`
      );
      setClientName("");
      setEmail("");
      setMessages("");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4 py-10">
      <Breadcrumbs title="Contact Us" prevLocation={prevLocation} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
        {/* Contact Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg h-[400px] overflow-y-auto max-w-full">
          {successMsg ? (
            <p className="font-medium text-gray-700 text-xl">{successMsg}</p>
          ) : (
            <form onSubmit={handlePost} className="space-y-6 sm:space-y-8">
              <div>
                <label className="block text-lg sm:text-xl font-semibold text-gray-700">
                  Name
                </label>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full p-3 sm:p-4 mt-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="text"
                  placeholder="Enter your name"
                />
                {errClientName && (
                  <p className="text-red-500 text-sm mt-1">{errClientName}</p>
                )}
              </div>

              <div>
                <label className="block text-lg sm:text-xl font-semibold text-gray-700">
                  Email
                </label>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full p-3 sm:p-4 mt-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="email"
                  placeholder="Enter your email"
                />
                {errEmail && (
                  <p className="text-red-500 text-sm mt-1">{errEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-lg sm:text-xl font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  onChange={handleMessages}
                  value={messages}
                  rows="5"
                  className="w-full p-3 sm:p-4 mt-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                  placeholder="Enter your message"
                ></textarea>
                {errMessages && (
                  <p className="text-red-500 text-sm mt-1">{errMessages}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-4 mt-4 bg-gray-800 text-white font-bold text-base sm:text-lg rounded-full hover:bg-gray-600 transition-all duration-300"
              >
                Submit
              </button>
            </form>
          )}
        </div>

        {/* Map Section */}
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md">
          <iframe
            title="Company Location"
            aria-label="Google Map showing company location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d483.4955191827785!2d88.43544160886479!3d22.57125652741123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027531e81e2cf7%3A0x70b7429ad4b0a8ba!2sTechno%20India%20Group(TiiT%26SMIT)!5e0!3m2!1sen!2sin!4v1746903832818!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
