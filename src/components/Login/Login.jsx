import React, { useContext, useEffect } from "react";
import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { UserContext } from "../../Context/UserContext.jsx";

export default function Login() {
  const { userInfo, setUserInfo, token, setToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  let navigate = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("*email is required")
      .email("Please Enter a valid email"),

    password: Yup.string()
      .required("*password is required")
      .matches(/^[A-Z]/, "Password must start with capital letter")
      .min(8, "Password must be at least 8 characters")
      .max(25, "Password must be at most 25 characters"),
  });

  let formic = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  async function handleLogin(values) {
    setIsLoading(true);
    let { data } = await axios.post(
      "https://sticky-note-fe.vercel.app/signin",
      values
    );

    console.log(data);

    setIsLoading(false);

    if (data.message === "success") {
      await setToken(data.token);
      await setUserInfo(data.user);
      navigate("/");
    }

    data.message === "email doesn't exist"
      ? setEmailError(data.message)
      : setEmailError(false);

    data.message === "incorrect password"
      ? setPasswordError(data.message)
      : setPasswordError(false);
  }

  // !ERROR HERE ==> this cause an infinite loop
  // useEffect(() => {
  //   console.log({ token });
  //   navigate("/");
  // }, [token]);

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={LoginImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form
          onSubmit={formic.handleSubmit}
          className="col-md-4 d-flex flex-column justify-content-center px-5"
        >
          <h2 className="m-0 fw-bold font-Montserrat">
            Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
          </h2>
          <p className="mb-3">
            Thanks for returning! Please sign in to access your account.
          </p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
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

            {emailError ? <div className="error">{emailError}</div> : null}

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

            {passwordError ? (
              <div className="error">{passwordError}</div>
            ) : null}

            <button type="submit" className="btn btn-main">
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>
            <p>
              You don't have account yet ?{" "}
              <Link to="/signup" className="text-decoration-underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
