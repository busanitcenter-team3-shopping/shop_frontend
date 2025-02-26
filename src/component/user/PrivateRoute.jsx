import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ currentUser, user, children }) => {
  if (!currentUser) {
    alert("로그인 해주세요.");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
