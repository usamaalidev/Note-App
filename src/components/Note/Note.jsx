import React, { useContext, useState } from "react";
import style from "./Note.module.css";
import { deleteNote, updateNote } from "../../utils/Note.js";
import { NoteContext } from "../../Context/NoteContext.jsx";
import Swal from "sweetalert2";

export default function Note({ noteInfo }) {
  const { setNotes } = useContext(NoteContext);
  const [noteStatus, setNoteStatus] = useState(false);

  function showDeleteAlert(NoteID) {
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
        deleteNote(NoteID, setNotes);
        Swal.fire("Deleted!", "Your Note has been deleted.", "success");
      }
    });
  }

  function showUpdateForm(NoteID, currentData) {
    console.log("Update Works");
    Swal.fire({
      title: "Update Your Note 😁",
      html: `
              <label for="title" class="form-label">Title</label>
              <input type="text" id="title" value="${currentData.title}" class="note-title swal2-input m-0 w-100 d-block"/>
              <label for="description" class="form-label">Description</label>
              <textarea type="text" id="description" class="swal2-textarea m-0 w-100 d-block">${currentData.desc}</textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Update Note",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const title = document.getElementById("title");
        const description = document.getElementById("description");
        return { title: title.value, description: description.value };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, description } = result.value;
        console.log(result);
        updateNote(NoteID, title, description, setNotes);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update successful! Your note has been saved.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
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
              showUpdateForm(noteInfo._id, {
                title: noteInfo.title,
                desc: noteInfo.desc,
              });
            }}
          ></i>
          <i
            className="bi bi-archive-fill pointer"
            onClick={() => {
              showDeleteAlert(noteInfo._id);
            }}
          ></i>
        </div>
      </div>
    </>
  );
}
