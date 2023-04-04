import React from "react";
import style from "./Sidebar.module.css";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <nav className={`${style.nav}`}>
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
            <NavLink to="/logOut">
              <i className="bi bi-box-arrow-left me-2"></i>Log out
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
