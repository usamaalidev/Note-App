import style from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Layout() {
  const [isMinimized, setIsMinimized] = useState(
    JSON.parse(localStorage.getItem("isMinimized")) || false
  );

  console.log({ isMinimized });

  return (
    <>
      <div className="d-flex min-vh-100 align-items-stretch">
        <div
          className={
            isMinimized ? `${style["sidebar-mini"]}` : `${style.sidebar}`
          }
        >
          <Sidebar info={{ isMinimized, setIsMinimized }} />
        </div>

        <div className={`${style.content}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
