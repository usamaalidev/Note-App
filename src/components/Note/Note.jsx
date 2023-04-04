import React, { useContext } from "react";
import style from "./Note.module.css";
import { UserContext } from "../../Context/UserContext.jsx";
import { deleteNote } from "../../utils/Note.js";

export default function Note({ noteInfo }) {
  return (
    <>
      <div
        className={`${style.note} note font-Montserrat`}
        data-id={noteInfo._id}
      >
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0">{noteInfo.title}</h2>
          <p className="mb-0 mt-2">{noteInfo.desc}</p>
        </div>

        <div className="note-footer">
          <i className="fa-solid fa-pen-to-square pointer me-2"></i>
          <i
            className="bi bi-archive-fill pointer"
            onClick={(e) => {
              deleteNote(e);
            }}
          ></i>
        </div>
      </div>
    </>
  );
}
