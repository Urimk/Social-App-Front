import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { myRouter } from "./router.jsx";
import { Toaster } from "react-hot-toast";

/**
 * Main entry point for the React application.
 * Renders the app with routing and toast notifications.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <RouterProvider router={myRouter} />
  </StrictMode>,
);
