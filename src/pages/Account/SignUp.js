import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const [errUsername, setErrUsername] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    let hasError = false;
    setErrUsername("");
    setErrEmail("");
    setErrPhone("");
    setErrPassword("");

    if (!username) {
      setErrUsername("Enter your username");
      hasError = true;
    }

    if (!email) {
      setErrEmail("Enter your email");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrEmail("Invalid email format");
      hasError = true;
    }

    if (!phone) {
      setErrPhone("Enter your phone number");
      hasError = true;
    } else if (!/^\d{10}$/.test(phone)) {
      setErrPhone("Enter a valid 10-digit phone number");
      hasError = true;
    }

    if (!password) {
      setErrPassword("Create a password");
      hasError = true;
    } else if (password.length < 6) {
      setErrPassword("Passwords must be at least 6 characters");
      hasError = true;
    }

    if (!checked) {
      toast.error("You must agree to the terms of service");
      return;
    }

    if (!hasError) {
      try {
        const response = await axios.post("http://localhost:8080/api/auth/register", {
          username,
          email,
          phone,
          password,
        });

        toast.success(`Hello ${username}, your account was created successfully!`, {
          autoClose: 2000,
        });

        // Clear form
        setUsername("");
        setEmail("");
        setPhone("");
        setPassword("");

        // Redirect to sign-in page after short delay
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } catch (error) {
        console.error("Error signing up:", error);
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "Signup failed", {
            autoClose: 3000,
          });
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login not implemented yet");
  };

  return (
    <div className="w-full h-screen flex items-center justify-start bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

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
        <form className="w-full max-w-[400px] bg-white rounded-lg shadow-md p-6">
          <h1 className="font-titleFont underline text-2xl mb-4">Create your account</h1>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <p className="font-semibold text-gray-600">Username</p>
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-box"
              />
              {errUsername && <p className="text-red-500 text-sm">{errUsername}</p>}
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-gray-600">Email</p>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-box"
              />
              {errEmail && <p className="text-red-500 text-sm">{errEmail}</p>}
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-gray-600">Phone Number</p>
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-box"
              />
              {errPhone && <p className="text-red-500 text-sm">{errPhone}</p>}
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-gray-600">Password</p>
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-box"
              />
              {errPassword && <p className="text-red-500 text-sm">{errPassword}</p>}
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="mt-1"
              />
              <p className="text-sm">
                I agree to the{" "}
                <span className="text-blue-500">Terms of Service</span> and{" "}
                <span className="text-blue-500">Privacy Policy</span>.
              </p>
            </div>

            <button
              onClick={handleSignUp}
              className={`${
                checked ? "bg-primeColor hover:bg-black" : "bg-gray-500 cursor-not-allowed"
              } text-white font-medium h-10 rounded-md duration-300`}
            >
              Create Account
            </button>

            <div className="flex items-center my-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-sm text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 border border-gray-400 rounded-md h-10 hover:bg-gray-100 duration-300"
            >
              <FcGoogle size={22} />
              <span className="text-sm text-gray-600">Continue with Google</span>
            </button> */}

            <p className="text-sm text-center mt-2">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>

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
        .input-box {
          width: 100%;
          height: 32px;
          padding: 0 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default SignUp;
