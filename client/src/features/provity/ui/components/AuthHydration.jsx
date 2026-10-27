import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useAuthHook } from "../../hooks/AuthHook";
import { setAccessToken, setLoading, setUserData } from "../../state/AuthSlice";

const AuthHydration = () => {
  const { getNewAccessTokenViaRefreshToken, handleGetMe } = useAuthHook();

  const dispatch = useDispatch();

  useEffect(() => {
    let cancelled = false;

    const hydrateUser = async () => {
      try {
        const response = await getNewAccessTokenViaRefreshToken();

        console.log(response.data.accessToken)

        const accessToken = response.data.accessToken;

        const userResponse = await handleGetMe(response.data.accessToken);

        if (cancelled) return;

        dispatch(setAccessToken(accessToken));
        dispatch(setUserData(userResponse.data.user));
      } catch (error) {
        if (cancelled) return;

        dispatch(setAccessToken(null));
        dispatch(setUserData(null));

        console.log(
          "User hydration failed:",
          error.response?.data || error.message,
        );
      } finally {
        if (!cancelled) {
          dispatch(setLoading(false));
        }
      }
    };

    hydrateUser();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
};

export default AuthHydration;
