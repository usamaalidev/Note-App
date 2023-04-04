import React, { useContext } from "react";
import style from "./ProtectedRoute.module.css";
import { UserContext } from "../../Context/UserContext.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { userInfo } = useContext(UserContext);
  if (userInfo) {
    return children;
  }

  return <Navigate to="/login" />;
}
