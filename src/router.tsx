import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";

export const router = createBrowserRouter([
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
