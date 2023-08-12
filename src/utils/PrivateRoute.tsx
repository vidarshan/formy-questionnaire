import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { ProtectedProps } from "../interfaces/PrivateRoute";
const Protected: FC<ProtectedProps> = ({ children }) => {
  const tokenFromStorage = JSON.parse(
    localStorage.getItem("user") || "{}"
  )?.token;

  if (tokenFromStorage === undefined) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};
export default Protected;
