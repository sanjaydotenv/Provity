import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import Desktop02 from "../../../../assets/Desktop02.png";
import VectorOTP from "../../../../assets/VectorOTP.png";
import ProvityLogo from "./ProvityLogo";

import { useNavigateHook } from "../../hooks/NavigationHook";
import { useAuthHook } from "../../hooks/AuthHook";

const OTP_LENGTH = 4;

const OTPVerification = () => {
  const { navigate } = useNavigateHook();
  const { handleOTPVerification , handleGetMe } = useAuthHook();

  const [timeLeft, setTimeLeft] = useState(300);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = useRef([]);
  const secondsRef = useRef(null);
  const previousSecondsRef = useRef(null);

  useEffect(() => {
    handleGetMe()
  }, [])

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Animate seconds
  useEffect(() => {
    const element = secondsRef.current;

    if (!element) return;

    if (previousSecondsRef.current === seconds) return;

    previousSecondsRef.current = seconds;

    gsap.killTweensOf(element);

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: -8,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      },
    );
  }, [seconds]);

  // Verify OTP
  const verifyOTPAutomatically = async (otpValue) => {
    if (isVerifying || timeLeft <= 0) return;

    setIsVerifying(true);

    try {
      await handleOTPVerification(otpValue);
    } catch (error) {
      console.error("OTP verification failed:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle input change
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value) || isVerifying || timeLeft <= 0) {
      return;
    }

    const digit = value.slice(-1);

    const updatedOTP = [...otp];
    updatedOTP[index] = digit;

    setOtp(updatedOTP);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (updatedOTP.every((item) => item !== "")) {
      verifyOTPAutomatically(updatedOTP.join(""));
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP paste
  const handlePaste = (event) => {
    event.preventDefault();

    if (isVerifying || timeLeft <= 0) return;

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedValue) return;

    const updatedOTP = Array(OTP_LENGTH)
      .fill("")
      .map((_, index) => pastedValue[index] || "");

    setOtp(updatedOTP);

    const nextIndex = Math.min(pastedValue.length, OTP_LENGTH - 1);

    inputRefs.current[nextIndex]?.focus();

    if (pastedValue.length === OTP_LENGTH) {
      verifyOTPAutomatically(pastedValue);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--main-bg)] text-white">
      {/* Background image */}
      <img
        src={Desktop02}
        alt=""
        aria-hidden="true"
        className="fixed inset-0 -z-0 h-full w-full object-cover"
      />

      {/* Background overlay */}
      <div className="fixed inset-0 z-0 bg-black/30" />

      {/* Main page */}
      <div className="relative z-10 flex min-h-screen w-full flex-col px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        {/* Navbar */}
        <header className="flex w-full items-center justify-between">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <ProvityLogo />
          </div>
        </header>

        {/* Main content */}
        <main className="relative flex flex-1 items-center justify-center py-10">
          {/* Decorative image */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <img
              src={VectorOTP}
              alt=""
              aria-hidden="true"
              className="h-auto w-[min(95vw,800px)] max-w-full object-contain opacity-80"
            />
          </div>

          {/* OTP card */}
          <section
            id="otpCard"
            className="
              relative z-10
              flex w-full max-w-[520px] flex-col items-center
              gap-3 rounded-3xl
              border border-transparent
              px-4 py-7
              shadow-2xl backdrop-blur-xl
              sm:gap-4 sm:rounded-4xl sm:px-8 sm:py-9
              lg:px-10 lg:py-10
            "
            style={{
              background:
                "linear-gradient(var(--main-bg), var(--main-bg)) padding-box, linear-gradient(135deg, #FC6C26, #c65723) border-box",
            }}
          >
            {/* Heading */}
            <h1 className="text-center text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
              OTP Verification
            </h1>

            {/* Description */}
            <p className="max-w-full break-words text-center text-sm leading-relaxed text-white/80 sm:text-base">
              Enter the OTP sent to{" "}
              <span className="break-all text-[var(--primary-color)]">
                test@gmail.com
              </span>
            </p>

            {/* OTP inputs */}
            <div
              className="flex w-full items-center justify-center gap-2 py-4 sm:gap-4 sm:py-5"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  aria-label={`OTP digit ${index + 1}`}
                  maxLength={1}
                  value={digit}
                  disabled={timeLeft <= 0 || isVerifying}
                  onChange={(event) => handleChange(event.target.value, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className="
                    h-12 w-12 min-w-0
                    rounded-xl border border-white/20
                    bg-white/5 text-center text-xl font-semibold text-white
                    outline-none transition-all duration-200
                    focus:border-[var(--primary-color)]
                    focus:ring-2 focus:ring-[var(--primary-color)]/30
                    disabled:cursor-not-allowed disabled:opacity-50
                    sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl
                    md:h-16 md:w-16
                  "
                />
              ))}
            </div>

            {/* Timer */}
            <div className="flex flex-wrap items-center justify-center gap-1 text-center text-sm sm:gap-2 sm:text-base">
              <span className="text-white/70">
                {timeLeft > 0 ? "Expire OTP in" : "OTP expired"}
              </span>

              {timeLeft > 0 && (
                <span className="inline-flex min-w-[58px] items-center justify-center font-semibold tabular-nums text-[var(--primary-color)]">
                  {minutes}:{String(seconds).padStart(2, "0")}
                </span>
              )}
            </div>

            {/* Verification status */}
            {isVerifying && (
              <p
                role="status"
                className="text-center text-sm text-[var(--primary-color)] sm:text-base"
              >
                Verifying OTP...
              </p>
            )}

            {/* Expiry message */}
            {timeLeft <= 0 && (
              <p className="text-center text-sm text-red-400 sm:text-base">
                Your OTP has expired. Please request a new one.
              </p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default OTPVerification;
