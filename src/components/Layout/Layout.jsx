import React from "react";
import style from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="d-flex min-vh-100 align-items-stretch">
        <div className={`${style.sidebar}`}>
          <Sidebar />
        </div>
        <div className={`${style.content}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
