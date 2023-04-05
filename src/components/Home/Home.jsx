import React, { useContext, useEffect } from "react";
import style from "./Home.module.css";
import Note from "../Note/Note.jsx";
import Loading from "../Loading/Loading.jsx";
import { getNotes } from "../../utils/Note.js";
import { NoteContext } from "../../Context/NoteContext.jsx";

export default function Home({}) {
  const { notes, setNotes } = useContext(NoteContext);

  useEffect(() => {
    getNotes(setNotes);
  }, []);

  return (
    <>
      <h2 className="font-Montserrat h4 heading">
        <i className="bi bi-folder me-2"></i>My Notes
      </h2>
      {notes ? (
        notes.length ? (
          <div className={`${style.notes}`}>
            {notes.map((note) => (
              <Note key={note._id} noteInfo={note} />
            ))}
          </div>
        ) : (
          <div
            className={`${style.empty} d-flex justify-content-center align-items-center`}
          >
            <h2 className="h5 text-muted">
              Your notes will appear here once you start creating them{" "}
              <i className="bi bi-stickies ms-2"></i>
            </h2>
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
