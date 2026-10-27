import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import HomePage from "./features/provity/ui/pages/HomePage";
import RegisterPage from "./features/provity/ui/pages/RegisterPage";
import LoginPage from "./features/provity/ui/pages/LoginPage";
import OTPVerification from "./features/provity/ui/components/OTPVerification";
import DashboardPage from "./features/provity/ui/pages/DashboardPage";
import TodayFlow from "./features/provity/ui/components/TodayFlow";
import FlowPage from "./features/provity/ui/pages/FlowPage";
import AuthHydration from "./features/provity/ui/components/AuthHydration";
import OnlyGoogleOauth from "./features/provity/ui/components/OnlyGoogleOauth";
import SmoothScroll from "./features/provity/ui/components/SmoothScroll";

const RootLayout = () => {
  return (
    <SmoothScroll>
      {" "}
      <AuthHydration /> <Outlet />{" "}
    </SmoothScroll>
  );
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/verify",
        element: <OTPVerification />,
      },
      {
        path: "/auth/verify-oauth",
        element: <OnlyGoogleOauth />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/dashboard/flow",
        element: <FlowPage />,
      },
      {
        path: "/dashboard/add-flow",
        element: <TodayFlow />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
