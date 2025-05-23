import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
 
  const user = useSelector((state) => state.user);
  console.log(user);

  if (!user.user_token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
