import React, { useRef, useState } from "react";

import Desktop02 from "../../../../assets/Desktop02.png";
import ProvityLogo from "./ProvityLogo";
import { useNavigateHook } from "../../hooks/NavigationHook";
import VectorOTP from "../../../../assets/VectorOTP.png";
import { useAuthHook } from "../../hooks/AuthHook";

const OTP_LENGTH = 4;

const OTPVerification = () => {
  const { navigate } = useNavigateHook();
  const { handleOTPVerification } = useAuthHook();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const digit = value.slice(-1);

    const updatedOTP = [...otp];
    updatedOTP[index] = digit;

    setOtp(updatedOTP);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (updatedOTP.every((item) => item !== "")) {
      const otpValue = updatedOTP.join("");

      handleOTPVerification(otpValue);
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedValue) return;

    const updatedOTP = Array(OTP_LENGTH).fill("");

    pastedValue.split("").forEach((digit, index) => {
      updatedOTP[index] = digit;
    });

    setOtp(updatedOTP);

    const nextIndex = Math.min(
      pastedValue.length,
      OTP_LENGTH - 1
    );

    inputRefs.current[nextIndex]?.focus();

    if (pastedValue.length === OTP_LENGTH) {
      handleOTPVerification(pastedValue);
    }
  };

  return (
    <div>
      {/* Background */}
      <img
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src={Desktop02}
        alt=""
      />

      <div className="page absolute top-0 left-0 h-screen min-h-screen w-full px-8 py-4 text-white">
        {/* Navbar */}
        <div
          onClick={() => navigate("/")}
          id="nav"
          className="nav flex w-full items-center justify-between"
        >
          <ProvityLogo />
        </div>

        {/* Main */}
        <main className="flex h-[90%] w-full items-center justify-center">
          <div className="gradient h-200 w-200">
            <img
              className="h-full w-full"
              src={VectorOTP}
              alt=""
            />
          </div>

          {/* OTP Card */}
          <div
            id="otpCard"
            className="absolute flex h-80 w-130 flex-col items-center gap-2 rounded-4xl border border-transparent py-5"
            style={{
              background: `
                linear-gradient(var(--main-bg), var(--main-bg)) padding-box,
                linear-gradient(135deg, #FC6C26, #c65723) border-box
              `,
            }}
          >
            <h1 className="text-5xl font-semibold">
              OTP Verification
            </h1>

            <p className="text-[15px]">
              Enter the OTP sent to{" "}
              <span className="text-[var(--primary-color)]">
                test@gmail.com
              </span>
            </p>

            {/* OTP Inputs */}
            <div className="flex items-center justify-center gap-4 py-5">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={
                    index === 0 ? "one-time-code" : "off"
                  }
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleChange(event.target.value, index)
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(event, index)
                  }
                  onPaste={handlePaste}
                  className="h-[73px] w-[73px] rounded-2xl border border-[#FC6C26] bg-[#302C2C] text-center text-2xl text-white outline-none transition focus:border-2 focus:border-[#FC6C26]"
                />
              ))}
            </div>

            <h2 className="font-semibold">
              Expire OTP in{" "}
              <span className="text-[var(--primary-color)]">
                5:00
              </span>
            </h2>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OTPVerification;
