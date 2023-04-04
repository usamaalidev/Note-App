import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import Note from "../Note/Note.jsx";
import axios from "axios";
import { UserContext } from "../../Context/UserContext.jsx";
import { getNotes } from "../../utils/Note.js";

export default function Home({}) {
  console.log("HOME ✅✅✅✅✅✅✅✅");
  const { userInfo, token } = useContext(UserContext);
  const [notes, setNotes] = useState([]);

  const userDetails = {
    token,
    userID: userInfo._id,
  };

  console.log(userDetails);

  getNotes(userDetails, setNotes);

  useEffect(() => {
    getNotes();
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
