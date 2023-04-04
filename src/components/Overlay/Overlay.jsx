import React, { useContext } from "react";
import style from "./Overlay.module.css";
import axios from "axios";
import { useFormik } from "formik";
import { UserContext } from "../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Overlay() {
  const { userInfo, token } = useContext(UserContext);
  const navigate = useNavigate();
  async function addNote(values) {
    console.log({ values });
    let { data } = await axios.post(
      "https://sticky-note-fe.vercel.app/addNote",
      values
    );

    console.log({ data });

    if (data.message == "success") {
      navigate("/");
    }
  }

  let formic = useFormik({
    initialValues: {
      title: "",
      desc: "",
      citizenID: userInfo._id,
      token,
    },
    onSubmit: addNote,
  });

  return (
    <>
      <div
        className={`${style.overlay} d-flex flex-column justify-content-center align-items-center position-absolute start-0 end-0 top-0 bottom-0`}
      >
        <form className="container" onSubmit={formic.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="title"
              className="form-control"
              id="title"
              name="title"
              onChange={formic.handleChange}
              value={formic.values.title}
            />
            <label htmlFor="title">Title</label>
          </div>
          <div className="form-floating">
            <textarea
              className="form-control"
              id="desc"
              name="desc"
              onChange={formic.handleChange}
              value={formic.values.desc}
            ></textarea>
            <label htmlFor="desc">Description</label>
          </div>
          <button type="submit" className="btn btn-main mt-3">
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}
