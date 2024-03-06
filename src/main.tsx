import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import SwrconfigContext from "./common/context/SwrconfigContext";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <SwrconfigContext>
    <RouterProvider router={router} />
  </SwrconfigContext>
  // </React.StrictMode>
);
