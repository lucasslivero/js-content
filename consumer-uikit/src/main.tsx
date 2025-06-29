import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import twPreset from "@lucasslivero/uikit/tailwind-preset";

console.log(twPreset);

import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
