import React, { useRef } from "react";
import Desktop02 from "../../../../assets/Desktop02.png";
import ProvityLogo from "../components/ProvityLogo";
import { FcGoogle } from "react-icons/fc";
import { IoIosInformationCircleOutline } from "react-icons/io";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigateHook } from "../../hooks/NavigationHook";
import { useAuthHook } from "../../hooks/AuthHook";

gsap.registerPlugin(useGSAP);

const RegisterPage = () => {
  const iconDets = useRef(null);
  const { navigate } = useNavigateHook();
  const { register, handleSubmit, handleDataRegister , handleGoogleOAuth } = useAuthHook();

  useGSAP(() => {
    gsap.set(iconDets.current, {
      autoAlpha: 0,
      y: -5,
    });

    const icon = document.querySelector(".info-icon");

    if (!icon) return;

    const showMessage = () => {
      gsap.to(iconDets.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const hideMessage = () => {
      gsap.to(iconDets.current, {
        autoAlpha: 0,
        y: -5,
        duration: 0.2,
        ease: "power2.in",
      });
    };

    icon.addEventListener("mouseenter", showMessage);
    icon.addEventListener("mouseleave", hideMessage);

    return () => {
      icon.removeEventListener("mouseenter", showMessage);
      icon.removeEventListener("mouseleave", hideMessage);
    };
  });

  return (
    <div className="relative min-h-screen w-full select-none">
      <img
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src={Desktop02}
        alt=""
      />

      <div className="page absolute top-0 left-0 min-h-screen w-full px-8 py-4 text-white">
        <div
          onClick={() => navigate("/")}
          id="nav"
          className="nav w-full flex justify-between items-center"
        >
          <ProvityLogo />
        </div>

        <div className="hero min-h-[90vh] w-full flex items-center justify-center py-8">
          <div className="form flex min-h-[70%] w-full flex-col items-center">
            <i className="text-center text-2xl font-light opacity-70 sm:text-3xl">
              Create your fresh account
            </i>

            <form
              onSubmit={handleSubmit(handleDataRegister)}
              className="flex w-full flex-col items-center justify-center gap-5 py-6 sm:w-[80%] md:w-[65%] lg:w-[50%]"
              action=""
            >
              <input
                {...register("UserName", {
                  required: true,
                })}
                className="w-full rounded-lg border border-[var(--border-color)] px-5 py-2 sm:w-[80%] md:w-[70%] lg:w-[60%]"
                type="text"
                placeholder="UserName"
              />

              <input
                {...register("Email", {
                  required: true,
                })}
                className="w-full rounded-lg border border-[var(--border-color)] px-5 py-2 sm:w-[80%] md:w-[70%] lg:w-[60%]"
                type="email"
                placeholder="Email"
              />

              <input
                {...register("Password", {
                  required: true,
                })}
                className="w-full rounded-lg border border-[var(--border-color)] px-5 py-2 sm:w-[80%] md:w-[70%] lg:w-[60%]"
                type="password"
                placeholder="Password"
              />

              <div className="relative w-full sm:w-[80%] md:w-[70%] lg:w-[60%]">
                <input
                  {...register("PhoneNo", {
                    required: true,
                  })}
                  className="w-full rounded-lg border border-[var(--border-color)] px-5 py-2 pr-12"
                  type="tel"
                  placeholder="Phone No."
                />

                <IoIosInformationCircleOutline className="info-icon absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl" />

                <p
                  ref={iconDets}
                  className="absolute right-0 top-full z-10 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-lg border border-[var(--border-color)] bg-black/90 p-3 text-sm sm:w-72"
                >
                  Your phone number will be used to send you task reminders via
                  SMS. Consent is{" "}
                  <span className="font-semibold">Optional</span> and is not
                  required to use the service.
                </p>
              </div>

              <input
                className="w-full cursor-pointer rounded-lg border border-[var(--border-color)] px-5 py-3 sm:w-[80%] md:w-[70%] lg:w-[60%]"
                type="submit"
              />
            </form>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/auth/login")}
                className="cursor-pointer text-[var(--primary-color)]"
              >
                Login
              </span>
            </p>

            <button onClick={handleGoogleOAuth} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-color)] px-3 py-2 text-base opacity-50 duration-250 hover:opacity-100 sm:w-[70%] sm:text-lg md:w-[50%] lg:w-[30%]">
              <i>Continue With Google</i>

              <span className="mt-1">
                <FcGoogle size={18} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
