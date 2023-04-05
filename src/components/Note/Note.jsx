import React, { useContext } from "react";
import style from "./Note.module.css";
import { deleteNote } from "../../utils/Note.js";
import { NoteContext } from "../../Context/NoteContext.jsx";
import Swal from "sweetalert2";

export default function Note({ noteInfo }) {
  function showDeleteAlert(e) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#913bd3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(e, setNotes);
        Swal.fire("Deleted!", "Your Note has been deleted.", "success");
      }
    });
  }
  const { setNotes } = useContext(NoteContext);
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
              showDeleteAlert(e);
            }}
          ></i>
        </div>
      </div>
    </>
  );
}
