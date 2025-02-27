import React from "react";
import { Navigate } from "react-router-dom";
import { useMyContext } from "../../api/ContextApi";

const PrivateRoute = ({ children }) => {
  const { token } = useMyContext();

  if (!token) {
    alert("로그인 해주세요.");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
