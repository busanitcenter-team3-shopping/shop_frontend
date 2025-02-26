import React from "react";
import { Navigate } from "react-router-dom";
import { useMyContext } from "../../api/ContextApi";


const PrivateRoute = ({ children }) => {
  const { currentUser } = useMyContext();

  if (!currentUser) {
    alert("로그인 해주세요.");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
