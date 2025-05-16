import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google icon

const SignUp = () => {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (checked) {
      if (!clientName) setErrClientName("Enter your name");
      if (!email) setErrEmail("Enter your email");
      else if (!EmailValidation(email)) setErrEmail("Enter a valid email");
      if (!phone) setErrPhone("Enter your phone number");
      if (!password) setErrPassword("Create a password");
      else if (password.length < 6)
        setErrPassword("Passwords must be at least 6 characters");

      if (
        clientName &&
        email &&
        EmailValidation(email) &&
        password &&
        password.length >= 6
      ) {
        setSuccessMsg(
          `Hello dear ${clientName}, Welcome to OREBI Admin panel. We received your Sign up request. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
        );
        setClientName("");
        setEmail("");
        setPhone("");
        setPassword("");
      }
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // 👉 You can integrate Firebase or backend Google OAuth here
  };

  return (
    <div className="w-full h-screen flex items-center justify-start bg-gray-100">
      <div className="hidden lgl:flex w-[40%] h-full bg-black relative justify-center items-center">
        <div className="relative flex space-x-3">
          {"SIGNUP".split("").map((letter, index) => (
            <div key={index} className={`hanger swing delay-${index}`}>
              <div className="rope"></div>
              <div className="letter">{letter}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lgl:w-[60%] h-full flex flex-col justify-center items-center">
        {successMsg ? (
          <div className="w-full max-w-[400px] bg-white rounded-lg shadow-md p-6">
            <p className="w-full text-green-500 font-medium font-titleFont mb-4">
              {successMsg}
            </p>
            <Link to="/signin">
              <button className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full max-w-[400px] bg-white rounded-lg shadow-md p-6">
            <div className="w-full flex flex-col justify-start overflow-y-auto">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
                {/* Full Name */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Full Name
                  </p>
                  <input
                    onChange={handleName}
                    value={clientName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Your Full Name"
                  />
                  {errClientName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errClientName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Enter Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="email@.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Phone Number
                  </p>
                  <input
                    onChange={handlePhone}
                    value={phone}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Enter Phone Number"
                  />
                  {errPhone && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPhone}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Create Password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>

                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the Hand-Craft{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>

                {/* Create Account Button */}
                <button
                  onClick={handleSignUp}
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-not-allowed"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Create Account
                </button>

                {/* Divider */}
                <div className="flex items-center my-2">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-2 text-sm text-gray-500">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google Login Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-2 w-full border border-gray-400 rounded-md h-10 hover:bg-gray-100 duration-300"
                >
                  <FcGoogle size={22} />
                  <span className="text-sm font-medium text-gray-600">
                    Continue with Google
                  </span>
                </button>

                {/* Sign in Link */}
                <p className="text-sm text-center font-titleFont font-medium mt-2">
                  Already have an Account?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Sign in
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Custom CSS Animations */}
      <style>{`
        .hanger {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: drop 0.6s ease forwards, swing 2s ease-in-out infinite alternate;
          transform: translateY(-150px) rotate(0deg);
        }
        .hanger .rope {
          width: 2px;
          height: 50px;
          background: white;
        }
        .hanger .letter {
          font-size: 40px;
          font-weight: bold;
          color: white;
        }
        @keyframes drop {
          to { transform: translateY(0) rotate(0deg); }
        }
        @keyframes swing {
          from { transform: translateY(0) rotate(-10deg); }
          to { transform: translateY(0) rotate(10deg); }
        }
        .delay-0 { animation-delay: 0s; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
};

export default SignUp;
