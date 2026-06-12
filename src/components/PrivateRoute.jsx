import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { SocketProvider } from "../context/SocketProvider";
import { validateToken } from "../utils/auth";

const PrivateRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authorized = await validateToken();
      setIsAuthorized(authorized);
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return null;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <SocketProvider>{children}</SocketProvider>;
};

export default PrivateRoute;
