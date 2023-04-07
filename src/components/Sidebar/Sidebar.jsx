import React, { useContext } from "react";
import style from "./Sidebar.module.css";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext.jsx";
import { NoteContext } from "../../Context/NoteContext.jsx";
import { showAddForm } from "../../utils/Note.js";

export default function Sidebar() {
  const { logout } = useContext(UserContext);
  const { setNotes } = useContext(NoteContext);
  const { token, userInfo } = useContext(UserContext);

  return (
    <>
      <nav className={`${style.nav} shadow-sm`}>
        <button
          className="btn btn-main text-capitalize w-100 mb-3"
          onClick={() => {
            showAddForm({ token, userInfo, updater: setNotes });
          }}
        >
          <i className="fa-solid fa-plus me-2"></i>New Note
        </button>
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
            <span
              onClick={() => {
                logout({ setNotes });
              }}
              className="pointer"
            >
              <i className="bi bi-box-arrow-left me-2"></i>Log out
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
}
