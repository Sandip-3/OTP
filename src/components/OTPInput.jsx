import React, { useEffect, useRef, useState } from "react";

const OTPInput = ({ length = 4, onSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputRef = useRef([]);

  const handleChange = (index, e) => {
    //Only one value
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    //Submit
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onSubmit(combinedOtp);

    //Move to next
    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRef.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRef.current[otp.indexOf("")].focus();
    }
  };
  const handleKey = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      inputRef.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);
  return (
    <div>
      {otp.map((number, index) => (
        <input
          className="border border-black mx-2 h-12 w-12 text-xl text-center"
          ref={(input) => (inputRef.current[index] = input)}
          key={index}
          type="text"
          value={number}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKey(index, e)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
