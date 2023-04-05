import React, { useContext, useEffect } from "react";
import style from "./Home.module.css";
import Note from "../Note/Note.jsx";
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
      <div className={`${style.notes}`}>
        {notes.map((note) => (
          <Note key={note._id} noteInfo={note} />
        ))}
      </div>
    </>
  );
}
