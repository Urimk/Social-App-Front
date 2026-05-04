import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

/**
 * Router configuration for the chat application.
 * Defines the main routes for user registration, login, and chat interface.
 */
export const myRouter = createBrowserRouter([
  {
    path: "/",
    element:       
      <PrivateRoute>
      <Chat />
      </PrivateRoute>,
  },
  {
    path: "*",
    element:       
      <PrivateRoute>
      <Chat />
      </PrivateRoute>,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <PrivateRoute>
        <Chat />
      </PrivateRoute>
    ),
  },
]);
