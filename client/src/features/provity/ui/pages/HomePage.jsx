import Desktop01 from "../../../../assets/Desktop01.png";
import { useNavigateHook } from "../../hooks/NavigationHook";
import ProvityLogo from "../components/ProvityLogo";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const HomePage = () => {
  const { navigate } = useNavigateHook();

  const { loading } = useSelector((state) => state.auth);

  if (loading){
    return <Loading />
  }


  return (
    <div className="h-screen min-h-screen w-full text-white relative overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full select-none object-cover"
        src={Desktop01}
        alt=""
      />

      <div className="absolute top-0 left-0 px-4 sm:px-6 md:px-8 py-4 w-full h-full">
        <div id="nav" className="nav w-full flex justify-between items-center">
          <ProvityLogo />

          <button
            onClick={() => navigate("/auth/login")}
            className="text-base sm:text-lg md:text-xl border-1 border-[var(--border-color)] px-3 sm:px-5 rounded-lg h-9 hover:bg-[var(--primary-color)] hover:border-[var(--text-color)] animation duration-350"
          >
            <h4 className="mb-1">Login</h4>
          </button>
        </div>

        <div id="hero" className="h-[95%] w-full">
          <div className="heading1 h-[80%] flex items-center justify-center flex-col gap-5">
            <div className="heading1 flex items-center justify-center h-[35%] flex-col text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
              <h1>
                IMPROVE YOUR <i>PRODUCTIVITY</i>
              </h1>

              <h1>
                WITH{" "}
                <i className="text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-linear-to-t bg-[var(--primary-color)] bg-[var(--primary-color2)] px-1 font-semibold">
                  PROVITY
                </i>
              </h1>
            </div>

            <div className="flex flex-col gap-5 items-center">
              <button
                onClick={() => navigate("/auth/register")}
                className="bg-[var(--primary-color)] text-xl sm:text-2xl md:text-3xl px-10 sm:px-14 md:px-18 hover:bg-[var(--primary-color2)] animation duration-500"
              >
                <i className="font-semibold">Get Start</i>
              </button>

              <button className="border-[1px] border-[var(--border-color)] text-base sm:text-lg px-4 py-1 rounded-sm hover:bg-[var(--primary-color)] animation duration-500">
                <i className="font-light">Get a Demo</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
