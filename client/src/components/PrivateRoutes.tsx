import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  return currentUser!==null ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
