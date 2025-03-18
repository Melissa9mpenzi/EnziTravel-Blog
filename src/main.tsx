import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Debug logging to verify entry point
console.log("Main application loaded at:", new Date().toISOString());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Enable HMR
if (import.meta.hot) {
  import.meta.hot.accept();
}
