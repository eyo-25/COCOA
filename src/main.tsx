import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import SwrconfigContext from "./common/context/SwrconfigContext";
import { router } from "./router";
import { ResponsiveProvider } from "./common/context/ResponsiveContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SwrconfigContext>
      <ResponsiveProvider>
        <RouterProvider router={router} />
      </ResponsiveProvider>
    </SwrconfigContext>
  </React.StrictMode>
);
