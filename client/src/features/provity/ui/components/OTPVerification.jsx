import React from "react";
import Desktop02 from "../../../../assets/Desktop02.png";
import ProvityLogo from "./ProvityLogo";
import { useNavigateHook } from "../../hooks/NavigationHook";
import VectorOTP from "../../../../assets/VectorOTP.png";

const OTPVerification = () => {
  const { navigate } = useNavigateHook();

  return (
    <div>
      <img
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src={Desktop02}
        alt=""
      />
      <div className="page absolute top-0 left-0 h-screen min-h-screen w-full px-8 py-4 text-white">
        <div
          onClick={() => navigate("/")}
          id="nav"
          className="nav w-full flex justify-between items-center"
        >
          <ProvityLogo />
        </div>

        <main className="h-[90%] w-full flex items-center justify-center">
          <div className="gradient h-200 w-200">
            <img className="w-full h-full" src={VectorOTP} alt="" />
          </div>
          <div
            id="otpCard"
            className="h-80 w-130 absolute rounded-4xl border border-transparent flex flex-col gap-2 items-center py-5"
            style={{
              background: `
      linear-gradient(var(--main-bg), var(--main-bg)) padding-box,
      linear-gradient(135deg, #FC6C26, #c65723) border-box
    `,
            }}
          >
            <h1 className="text-5xl font-semibold">OTP Verification</h1>
            <p className="text-[15px]">
              Enter the OTP sent to{" "}
              <span className="text-[var(--primary-color)]">
                test@gmail.com
              </span>
            </p>
            <div className="flex items-center justify-center gap-4 py-5" >
              <input
                type="text"
                maxLength={1}
                inputMode="numeric"
                className="h-[73px] w-[73px] rounded-2xl border border-[#FC6C26] bg-[#302C2C] text-center text-2xl text-white outline-none"
              />

              <input
                type="text"
                maxLength={1}
                inputMode="numeric"
                className="h-[73px] w-[73px] rounded-2xl border border-[#FC6C26] bg-[#302C2C] text-center text-2xl text-white outline-none"
              />

              <input
                type="text"
                maxLength={1}
                inputMode="numeric"
                className="h-[73px] w-[73px] rounded-2xl border border-[#FC6C26] bg-[#302C2C] text-center text-2xl text-white outline-none"
              />

              <input
                type="text"
                maxLength={1}
                inputMode="numeric"
                className="h-[73px] w-[73px] rounded-2xl border border-[#FC6C26] bg-[#302C2C] text-center text-2xl text-white outline-none"
              />
            </div>
            <h2 className="font-semibold">Expire OTP in <span className="text-[var(--primary-color)]">
                5:00
              </span></h2>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OTPVerification;
