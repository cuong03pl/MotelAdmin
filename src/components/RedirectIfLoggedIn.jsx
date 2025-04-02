import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import routes from "../config/routes";

const RedirectIfLoggedIn = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (user.user_token) {
    return <Navigate to={routes.home} />;
  }

  return children;
};

export default RedirectIfLoggedIn;
