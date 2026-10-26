import { useEffect } from "react";
import { useAuthHook } from "../../hooks/AuthHook";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../state/AuthSlice";

const AuthHydration = () => {
  const { getNewAccessTokenViaRefreshToken } = useAuthHook();

  const dispatch = useDispatch()

  useEffect(() => {
    const hydrateUser = async () => {
      try {
        const response = await getNewAccessTokenViaRefreshToken();
        dispatch(setAccessToken(response.data.accessToken))
        console.log("User hydration successful:", response.data);
      } catch (error) {
        console.error(
          "User hydration failed:",
          error.response?.data || error.message,
        );
      }
    };

    hydrateUser();
  }, [getNewAccessTokenViaRefreshToken]);

  return null;
};

export default AuthHydration;
