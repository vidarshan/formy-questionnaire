import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./store/store";
const PrivateRoutes = () => {
  const { token } = useAppSelector((state) => state.user);
  console.log("🚀 ~ file: PrivateRoute.tsx:6 ~ PrivateRoutes ~ token:", token);

  return token !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
