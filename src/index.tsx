import "./styles/globals.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ReactRenderError } from "./@data/errors/react-render";

import { App } from "./app";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new ReactRenderError("The container element with ID 'root' was not found.").render();
};

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);