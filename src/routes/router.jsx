import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./authRoute";
import Login from "../pages/login";
import Layout from "../components/layout/layout";
import { RoutesArray } from "./routeArray";


const Router = () => {
  const router = createBrowserRouter([
    {
      element: <PublicRoute />,
      children: [
        { path: "/", element: <Login /> },
      ]
    },
    {
      element: <Layout />,
      children: [
        {
          element: <PrivateRoute />,
          children: RoutesArray
        }],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;

