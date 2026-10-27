import React from "react";
import ProvityLogo from "./ProvityLogo";
import { useAuthHook } from "../../hooks/AuthHook";

const OnlyGoogleOauth = () => {
  const { handleGoogleOAuth } = useAuthHook();

  return (
    <div className="min-h-screen w-full bg-[#0b0907] px-5 py-4 sm:px-8">
      {/* Login Section */}
      <div className="flex min-h-[85vh] items-center justify-center">
        <div className="relative w-full max-w-[500px] overflow-hidden rounded-[26px] border border-[#392619]/70 bg-[#191512] px-6 py-10 shadow-2xl shadow-black/30 sm:px-10 sm:py-12">
          {/* Subtle Background Glow */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-orange-500/[0.06] blur-[90px]" />

          <div className="relative z-10 flex flex-col items-center">
            {/* App Icon */}
            <div className="mb-5 bg-black flex items-center justify-center rounded-lg border border-[var(--primary-color)]/50 rounded-2xl border border-[#482b1b]/80 bg-[#151210] px-5 py-2 text-white transition-all duration-300 hover:border-orange-500/50 hover:bg-[#201812] hover:shadow-[0_0_25px_rgba(252,108,38,0.08)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#191512]">
              <ProvityLogo />
            </div>

            {/* Heading */}
            <h1 className="text-center text-2xl font-bold tracking-tight text-white sm:text-[28px]">
              Welcome to Provity
            </h1>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleOAuth}
              className="group mt-8 flex min-h-[62px] w-full items-center justify-center gap-3 rounded-2xl border border-[#482b1b]/80 bg-[#151210] px-5 py-4 text-white transition-all duration-300 hover:border-orange-500/50 hover:bg-[#201812] hover:shadow-[0_0_25px_rgba(252,108,38,0.08)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#191512]"
            >
              {/* Google Icon */}
              <svg
                className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.15 13.22l7.98 6.19C13.03 13.72 18.11 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 37.96 46.98 31.88 46.98 24.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M11.13 28.59A14.4 14.4 0 0 1 10.36 24c0-1.6.28-3.15.77-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 3.15 10.78l7.98-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-5.89 0-10.97-4.22-12.87-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>

              <span className="text-base font-semibold">
                Continue with Google
              </span>
            </button>

            {/* Access Information */}
            <p className="mt-6 max-w-sm text-center text-sm leading-6 text-[#82756b]">
              Only authorized emails can sign in.
            </p>

            {/* Bottom Detail */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlyGoogleOauth;
