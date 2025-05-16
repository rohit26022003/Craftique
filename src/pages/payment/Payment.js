import React, { useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaGooglePay, FaMoneyBillWave } from 'react-icons/fa';
import { SiPhonepe, SiPaytm } from 'react-icons/si';

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  // Generate a random OTP (for demo)
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(otp.toString());
    setOtpSent(true);
  };

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Please select a payment method!');
    } else {
      alert(`You selected: ${selectedMethod}`);
      // You can navigate or process payment here
    }
  };

  const handleOtpVerification = () => {
    if (otp === generatedOtp) {
      setIsVerified(true);
      alert('OTP Verified Successfully!');
    } else {
      alert('Invalid OTP, please try again!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-xl space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Payment Gateway</h1>

      {/* Debit/Credit Card Section */}
      <section className={`border ${selectedMethod === 'card' ? 'border-black' : 'border-gray-300'} rounded-lg p-4`}>
        <label className="flex items-center gap-3 mb-4 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={selectedMethod === 'card'}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <span className="text-xl font-semibold flex items-center gap-2">
            <FaCcVisa className="text-blue-500 text-2xl" />
            <FaCcMastercard className="text-red-500 text-2xl" />
            Debit / Credit Card
          </span>
        </label>
        {selectedMethod === 'card' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Cardholder Name"
              className="input"
              value={cardDetails.cardholderName}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardholderName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Card Number"
              className="input"
              value={cardDetails.cardNumber}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardNumber: e.target.value })
              }
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="input w-1/2"
                value={cardDetails.expiryDate}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="CVV"
                className="input w-1/2"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
              />
            </div>
            <button onClick={generateOtp} className="btn mt-4">
              Verify Details
            </button>
          </div>
        )}
      </section>

      {/* UPI Section */}
      <section className={`border ${selectedMethod === 'upi' ? 'border-black' : 'border-gray-300'} rounded-lg p-4`}>
        <label className="flex items-center gap-3 mb-4 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="upi"
            checked={selectedMethod === 'upi'}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <span className="text-xl font-semibold flex items-center gap-2">
            <FaGooglePay className="text-indigo-500 text-2xl" />
            <SiPhonepe className="text-purple-500 text-2xl" />
            <SiPaytm className="text-blue-600 text-2xl" />
            UPI Payment
          </span>
        </label>
        {selectedMethod === 'upi' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter UPI ID (e.g. name@bank)"
              className="input"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <button onClick={generateOtp} className="btn mt-4">
              Verify Details
            </button>
          </div>
        )}
      </section>

      {/* COD Section */}
      <section className={`border ${selectedMethod === 'cod' ? 'border-black' : 'border-gray-300'} rounded-lg p-4`}>
        <label className="flex items-center gap-3 mb-4 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={selectedMethod === 'cod'}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <span className="text-xl font-semibold flex items-center gap-2">
            <FaMoneyBillWave className="text-green-500 text-2xl" />
            Cash on Delivery (COD)
          </span>
        </label>
        {selectedMethod === 'cod' && (
          <div className="space-y-4">
            <p>Cash on Delivery selected. No need to enter any payment details. You can pay at the time of delivery.</p>
          </div>
        )}
      </section>

      {/* OTP Verification */}
      {otpSent && !isVerified && (
        <section className="mt-8">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleOtpVerification} className="btn">
              Verify OTP
            </button>
          </div>
        </section>
      )}

      {/* Display "Verified" message */}
      {isVerified && <p className="text-green-500 text-center mt-4">Your details are verified!</p>}

      <button
        className={`w-full ${selectedMethod ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'} text-white py-3 rounded-lg font-semibold text-lg`}
        onClick={handlePayment}
        disabled={!selectedMethod || (selectedMethod !== 'cod' && !isVerified)}
      >
        Proceed to Pay
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .btn {
          background-color: black;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #444;
        }
      `}</style>
    </div>
  );
}
