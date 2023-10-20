import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { AuthContextType } from "../types/authContextTypes";

const ProtectRoute = ({ children }: React.PropsWithChildren) => {
  const { auth } = React.useContext(AuthContext) as AuthContextType;

  if (!auth?.loggedIn) {
    return <Navigate to="/auth" />;
  }

  return <div>{children}</div>;
};

export default ProtectRoute;
