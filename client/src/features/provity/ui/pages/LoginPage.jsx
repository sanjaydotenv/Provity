import Desktop02 from "../../../../assets/Desktop02.png";
import ProvityLogo from "../components/ProvityLogo";
import { FcGoogle } from "react-icons/fc";
import { useNavigateHook } from "../../hooks/NavigationHook";
import { useAuthHook } from "../../hooks/AuthHook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RegisterPage = () => {


  const { navigate } = useNavigateHook();

  const { user } = useSelector(state => state.auth);

 

  const {
    handleGoogleOAuth,
    handleDataLogin,
    handleSubmit,
    register,
    errors,
    handleGetMe,
  } = useAuthHook();

  useEffect(() => {
    handleGetMe();
  }, []);

   if (user){
    return navigate("/auth/verify-oauth")
  }

  return (
    <div className="relative min-h-screen min-h-[600px] w-full select-none overflow-x-hidden">
      <img
        className="absolute inset-0 h-full min-h-screen w-full object-cover"
        src={Desktop02}
        alt=""
      />

      <div className="page absolute inset-0 min-h-screen w-full px-4 py-4 sm:px-6 md:px-8 text-white">
        <div
          onClick={() => navigate("/")}
          id="nav"
          className="nav flex w-full items-center justify-between"
        >
          <ProvityLogo />
        </div>

        <div className="hero flex min-h-[calc(100vh-100px)] w-full items-center justify-center ">
          <div className="form flex w-full flex-col items-center">
            <i className="text-center text-2xl font-light opacity-80 sm:text-3xl mb-5">
              Login your account
            </i>

            <form
              onSubmit={handleSubmit(handleDataLogin)}
              noValidate
              className="flex w-full flex-col items-center justify-center gap-5 sm:w-[80%] md:w-[65%] lg:w-[50%]"
            >
              {/* Email */}
              <div className="relative flex w-full flex-col items-center">
                <input
                  {...register("Email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`w-full rounded-lg border bg-transparent px-5 py-2 sm:w-[80%] md:w-[70%] lg:w-[60%] ${
                    errors.Email
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--border-color)]"
                  } outline-none`}
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  aria-invalid={!!errors.Email}
                />

                {errors.Email && (
                  <p
                    role="alert"
                    className="mt-1 w-full text-left text-sm text-red-400 sm:w-[80%] md:w-[70%] lg:w-[60%]"
                  >
                    {" "}
                    {errors.Email.message}{" "}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative flex w-full flex-col items-center">
                <input
                  {...register("Password", {
                    required: "Password is required",
                  })}
                  className={`w-full rounded-lg border bg-transparent px-5 py-2 sm:w-[80%] md:w-[70%] lg:w-[60%] ${
                    errors.Password
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--border-color)]"
                  } outline-none`}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.Password}
                />

                {errors.Password && (
                  <p
                    role="alert"
                    className="mt-1 w-full text-left text-sm text-red-400 sm:w-[80%] md:w-[70%] lg:w-[60%]"
                  >
                    {" "}
                    {errors.Password.message}{" "}
                  </p>
                )}
              </div>

              {/* Submit */}
              <input
                className="mt-5 w-full cursor-pointer rounded-lg border border-[var(--border-color)] px-5 py-3 sm:w-[80%] md:w-[70%] lg:w-[60%]"
                type="submit"
                value="Login"
              />
            </form>

            <p className="mt-2 px-2 text-center text-sm">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/auth/register")}
                className="cursor-pointer text-[var(--primary-color)]"
              >
                SignUp
              </span>
            </p>

            <button
              onClick={handleGoogleOAuth}
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-color)] px-3 py-2 text-base opacity-50 duration-250 hover:opacity-100 sm:w-[70%] sm:text-lg md:w-[50%] lg:w-[30%]"
            >
              <i>Continue With Google</i>{" "}
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
