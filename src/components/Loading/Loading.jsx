import React from "react";
import style from "./Loading.module.css";

export default function Loading() {
  return (
    <>
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div class={style["lds-facebook"]}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
