import Desktop02 from "../../../../assets/Desktop02.png";
import ProvityLogo from "../components/ProvityLogo";
import { FcGoogle } from "react-icons/fc";
import { useNavigateHook } from "../../hooks/NavigationHook";

const RegisterPage = () => {
  const { navigate } = useNavigateHook();

  return (
    <div className="h-screen min-h-[600px] w-full select-none overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={Desktop02}
        alt=""
      />

      <div className="page absolute top-0 left-0 px-8 py-4 h-full w-full text-white">
        <div onClick={() => navigate("/")} id="nav" className="nav w-full flex justify-between items-center">
          <ProvityLogo />
        </div>

        <div className="hero h-[95%] w-full flex items-center justify-center">
          <div className="form h-[60%] w-full flex flex-col items-center">
            <i className="text-2xl sm:text-3xl opacity-80 font-light text-center">
              Login your account
            </i>

            <form
              className="h-[70%] w-full sm:w-[80%] md:w-[65%] lg:w-[50%] flex flex-col items-center justify-center gap-5"
              action=""
            >
              <input
                className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] px-5 py-2 border-1 border-[var(--border-color)] rounded-lg"
                type="text"
                placeholder="Email"
              />

              <input
                className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] px-5 py-2 border-1 border-[var(--border-color)] rounded-lg"
                type="text"
                placeholder="Password"
              />

              <input
                className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] mt-5 cursor-pointer px-5 py-3 border-1 border-[var(--border-color)] rounded-lg"
                type="submit"
              />
            </form>

            <p className="text-sm text-center px-2">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/auth/register")}
                className="text-[var(--primary-color)] cursor-pointer"
              >
                SignUp
              </span>
            </p>

            <button className="w-full sm:w-[70%] md:w-[50%] lg:w-[30%] px-3 py-2 border-1 border-[var(--border-color)] mt-5 rounded-full text-base sm:text-lg flex items-center justify-center gap-2 opacity-50 hover:opacity-100 animation duration-250">
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
