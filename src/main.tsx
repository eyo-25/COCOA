import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./Layout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <h2 className="text-xl font-bold text-blue-500">Hello, React!</h2>
    <p className="text-lg font-medium">Hello, Typescript!</p>
    <Layout />
  </React.StrictMode>
);
