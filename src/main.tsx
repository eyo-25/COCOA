import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        lazy: async () => {
          const MainPage = await import("./pages/MainPage");
          return { Component: MainPage.default };
        },
      },
      {
        path: "assets/:coinSymbol",
        lazy: async () => {
          const CoinDetailPage = await import("./pages/CoinDetailPage");
          return { Component: CoinDetailPage.default };
        },
      },
      {
        path: "news",
        lazy: async () => {
          const CoinDetailPage = await import("./pages/NewsPage");
          return { Component: CoinDetailPage.default };
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
