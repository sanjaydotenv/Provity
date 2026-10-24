import React from "react";
import HomePage from "./features/provity/ui/pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router";
import RegisterPage from "./features/provity/ui/pages/RegisterPage";
import LoginPage from "./features/provity/ui/pages/LoginPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/auth/register",
      element: <RegisterPage />
    },
    {
      path: "/auth/login",
      element: <LoginPage />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
