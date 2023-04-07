import React, { useContext, useState } from "react";
import style from "./Note.module.css";
import { NoteContext } from "../../Context/NoteContext.jsx";
import { UserContext } from "../../Context/UserContext.jsx";
import {
  checkDescriptionLength,
  showDeleteAlert,
  showUpdateForm,
} from "../../utils/Note.js";

export default function Note({ noteInfo }) {
  const { setNotes } = useContext(NoteContext);
  const { token, userInfo } = useContext(UserContext);
  const [noteStatus, setNoteStatus] = useState(checkDescriptionLength());

  // !false ❌ => text does not exceed three lines => no ReadMore button
  // *true ✅ => text exceed three lines => Read more button

  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">
            {noteInfo.title}
          </h2>
          <p className={`mb-0 mt-2 ${noteStatus ? style["read-more"] : ""}`}>
            {noteInfo.desc}
          </p>
          <button
            className="btn btn-main mt-2"
            onClick={() => {
              setNoteStatus(!noteStatus);
            }}
          >
            Read More
          </button>
        </div>

        <div className="note-footer">
          <i
            className="fa-solid fa-pen-to-square pointer me-2"
            onClick={() => {
              showUpdateForm({
                token,
                userInfo,
                NoteID: noteInfo._id,
                PrevData: {
                  title: noteInfo.title,
                  desc: noteInfo.desc,
                },
                updater: setNotes,
              });
            }}
          ></i>
          <i
            className="bi bi-archive-fill pointer"
            onClick={() => {
              showDeleteAlert({
                token,
                userInfo,
                NoteID: noteInfo._id,
                updater: setNotes,
              });
            }}
          ></i>
        </div>
      </div>
    </>
  );
}
