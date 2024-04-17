import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.js";
const root = createRoot(document.getElementById("root"));

// const isLoggedIn = false;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
