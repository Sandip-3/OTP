import React, { useState } from "react";
import OTPInput from "./OTPInput";

const PhoneOTP = () => {
  const [number, setNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = () => {
    const regex = /[^0-9]/g;
    if (!number) {
      alert("Please Add Number");
      return;
    }
    if (regex.test(number)) {
      alert("String are not allowed in number field");
      return;
    }
    if (number && number.length < 10) {
      alert("Must be 10 digit");
      return;
    }

    setShowOtp(!showOtp);
  };

  const onOtpSubmit = (otp) => {
    console.log("Login Success", otp);
  };

  return (
    <div>
      {!showOtp ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex  items-center justify-center space-x-4">
            <h1 className="text-start">Enter Phone Number</h1>
            <input
              className="border border-gray-900 rounded"
              type="text"
              value={number}
              onChange={handleChange}
              name="number"
              placeholder="ENTER NUMBER"
            />
            <button
              className="bg-black px-2 py-1 text-white rounded "
              onClick={handleSubmit}
            >
              Submit
            </button>
            <h1>{showOtp}</h1>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-center space-x-4">
          <h1>Enter OTP code</h1>
          <OTPInput length={4} onSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOTP;
