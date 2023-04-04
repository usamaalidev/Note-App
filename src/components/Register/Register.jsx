import React from "react";
import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);

  let navigate = useNavigate();
  let validationSchema = Yup.object({
    first_name: Yup.string()
      .required("*first name is rquired")
      .min(3, "First name must be at least 3 characters")
      .max(25, "First name must be at most 25 characters"),

    last_name: Yup.string()
      .required("*last name is required")
      .min(3, "Last name must be at least 3 characters")
      .max(25, "Last name must be at most 25 characters"),

    email: Yup.string()
      .required("*email is required")
      .email("Please Enter a valid email"),

    password: Yup.string()
      .required("*password is required")
      .matches(/^[A-Z]/, "Password must start with capital letter")
      .min(8, "Password must be at least 8 characters")
      .max(25, "Password must be at most 25 characters"),

    age: Yup.number()
      .required("*age is required")
      .min(18, "Your age must be greater than 18"),
  });

  let formic = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      age: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    let { data } = await axios.post(
      "https://sticky-note-fe.vercel.app/signup",
      values
    );

    console.log(data);

    if (data.message === "success") {
      setIsLoading(false);
      navigate("/login");
    }

    if (data.errors.email) {
      setIsLoading(false);
      setValidationError(data.errors.email.message);
    }
  }

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={regsiterImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form
          onSubmit={formic.handleSubmit}
          className="col-md-4 d-flex flex-column justify-content-center px-5"
        >
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="first_name"
              id="first_name"
              onBlur={formic.handleBlur}
              onChange={formic.handleChange}
              value={formic.values.first_name}
            />
            {formic.errors.first_name && formic.touched.first_name ? (
              <div className="error">{formic.errors.first_name}</div>
            ) : null}
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="last_name"
              id="last_name"
              onBlur={formic.handleBlur}
              onChange={formic.handleChange}
              value={formic.values.last_name}
            />
            {formic.errors.last_name && formic.touched.last_name ? (
              <div className="error">{formic.errors.last_name}</div>
            ) : null}
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              onBlur={formic.handleBlur}
              onChange={formic.handleChange}
              value={formic.values.email}
            />
            {formic.errors.email && formic.touched.email ? (
              <div className="error">{formic.errors.email}</div>
            ) : null}
            {validationError ? (
              <div className="error">{validationError}</div>
            ) : null}
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              onBlur={formic.handleBlur}
              onChange={formic.handleChange}
              value={formic.values.password}
            />
            {formic.errors.password && formic.touched.password ? (
              <div className="error">{formic.errors.password}</div>
            ) : null}
            <input
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Age"
              name="age"
              id="age"
              onBlur={formic.handleBlur}
              onChange={formic.handleChange}
              value={formic.values.age}
            />
            {formic.errors.age && formic.touched.age ? (
              <div className="error">{formic.errors.age}</div>
            ) : null}
            <button type="submit" className="btn btn-main">
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Create account"
              )}
            </button>
            <p>
              Already have account ?{" "}
              <Link to="/login" className="text-decoration-underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
