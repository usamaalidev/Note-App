import React, { useContext } from "react";
import style from "./Sidebar.module.css";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext.jsx";

export default function Sidebar() {
  const { logout } = useContext(UserContext);
  return (
    <>
      <nav className={`${style.nav} shadow-sm`}>
        <Link to="/note" className="btn btn-main text-capitalize w-100 mb-3">
          <i className="fa-solid fa-plus me-2"></i>New Note
        </Link>
        <ul className="list-unstyled">
          <li>
            <NavLink to="/">
              <i className="bi bi-house-heart me-2"></i>Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">
              <i className="bi bi-search me-2"></i>Search
            </NavLink>
          </li>
          <li>
            <span onClick={logout} className="pointer">
              <i className="bi bi-box-arrow-left me-2"></i>Log out
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
}
