import React from "react";
import HomePage from "./features/provity/ui/pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router";
import RegisterPage from "./features/provity/ui/pages/RegisterPage";
import LoginPage from "./features/provity/ui/pages/LoginPage";
import OTPVerification from "./features/provity/ui/components/OTPVerification";
import DashboardPage from "./features/provity/ui/pages/DashboardPage";
import TodayFlowPage from "./features/provity/ui/pages/TodayFlowPage";

const App = () => {
  const router = createBrowserRouter([
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
      path: "/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "/dashboard/flow",
      element: <TodayFlowPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
