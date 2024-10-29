import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import { Buffer } from "buffer";

// if (typeof window.Buffer === "undefined") {
//   window.Buffer = Buffer;
// }
import { Buffer } from 'buffer';  
if (typeof window.Buffer === "undefined") {
  window.Buffer = Buffer;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);