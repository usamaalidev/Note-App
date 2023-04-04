import React, { useContext } from "react";
import style from "./Note.module.css";
import axios from "axios";
import { UserContext } from "../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Note({ noteInfo }) {
  const { token } = useContext(UserContext);

  const navigate = useNavigate();

  async function deleteNote(e) {
    const deletedNoteInfo = {
      NoteID: e.target.closest(".note").dataset.id,
      token,
    };

    console.log(deletedNoteInfo);

    let { data } = await axios.delete(
      "https://sticky-note-fe.vercel.app/deleteNote",
      { data: deletedNoteInfo }
    );

    console.log(data);

    if (data.message == "deleted") {
      console.log("success");
      navigate("/");
    }
  }
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
