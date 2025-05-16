import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google icon

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email) setErrEmail("Enter your email");
    if (!password) setErrPassword("Enter your password");
    if (email && password) {
      setSuccessMsg(`Hello! We are processing your login. Check your email at ${email}.`);
      setEmail("");
      setPassword("");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login clicked! Integrate Google Sign-In here.");
  };

  const handleForgot = () => setShowForgotPassword(true);
  const handleCancel = () => {
    setShowForgotPassword(false);
    setForgotEmail("");
    setOtp("");
    setOtpSent(false);
    setShowResetPassword(false);
    setNewPassword("");
    setConfirmPassword("");
  };
  const handleVerifyEmail = () => {
    if (forgotEmail) {
      alert(`OTP sent to ${forgotEmail}`);
      setOtpSent(true);
    }
  };
  const handleVerifyOtp = () => {
    if (otp) {
      alert("OTP verified!");
      setShowResetPassword(true);
    }
  };
  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      alert("Fill both password fields.");
    } else if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
    } else {
      alert("Password reset successfully!");
      handleCancel();
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 relative">
      {showForgotPassword && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur z-10"></div>
      )}

      {/* Left Panel */}
      <div className={`hidden lgl:flex w-1/2 h-full bg-black relative justify-center items-center ${showForgotPassword ? "blur-sm" : ""}`}>
        <div className="relative flex space-x-3">
          {"SIGNIN".split("").map((letter, index) => (
            <div key={index} className={`hanger swing delay-${index}`}>
              <div className="rope"></div>
              <div className="letter">{letter}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel (Form) */}
      <div className={`w-full lgl:w-1/2 h-full flex items-center justify-center ${showForgotPassword ? "blur-sm" : ""}`}>
        {successMsg ? (
          <div className="max-w-md text-center space-y-6">
            <p className="text-green-500 font-semibold">{successMsg}</p>
            <Link to="/signup">
              <button className="w-full py-2 bg-black text-white rounded hover:bg-gray-900">Sign Up</button>
            </Link>
          </div>
        ) : (
          <form className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
            <h1 className="text-3xl font-bold text-center text-black">Sign In</h1>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrEmail("");
                }}
                className="w-full mt-1 p-2 border rounded"
                placeholder="you@example.com"
              />
              {errEmail && <p className="text-red-500 text-sm">{errEmail}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrPassword("");
                }}
                className="w-full mt-1 p-2 border rounded"
                placeholder="••••••••"
              />
              {errPassword && <p className="text-red-500 text-sm">{errPassword}</p>}
            </div>
            <button
              type="submit"
              onClick={handleSignIn}
              className="w-full py-2 bg-black text-white rounded hover:bg-gray-900"
            >
              Sign In
            </button>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2 bg-white border rounded flex items-center justify-center space-x-2 hover:bg-gray-100"
            >
              <FcGoogle className="text-xl" />
              <span className="text-black">Sign in with Google</span>
            </button>

            <button
              type="button"
              onClick={handleForgot}
              className="w-full text-sm text-black hover:underline"
            >
              Forgot Password?
            </button>
            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-black hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        )}
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="absolute bg-white p-6 rounded shadow-lg w-80 z-20 space-y-4">
          {!showResetPassword ? (
            <>
              <h2 className="text-xl font-bold text-black">Forgot Password</h2>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Your email"
                className="w-full p-2 border rounded"
              />
              {otpSent && (
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full p-2 border rounded"
                />
              )}
              <div className="flex space-x-2">
                {!otpSent ? (
                  <button onClick={handleVerifyEmail} className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-900">
                    Send OTP
                  </button>
                ) : (
                  <button onClick={handleVerifyOtp} className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600">
                    Verify OTP
                  </button>
                )}
                <button onClick={handleCancel} className="flex-1 bg-gray-300 text-black py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-black">Reset Password</h2>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full p-2 border rounded"
              />
              <div className="flex space-x-2">
                <button onClick={handleResetPassword} className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600">
                  Reset
                </button>
                <button onClick={handleCancel} className="flex-1 bg-gray-300 text-black py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}

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

export default SignIn;
