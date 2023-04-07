import React from "react";
import { createContext, useState } from "react";

export const UserContext = createContext(0);

export default function UserProvider({ children }) {
  const savedToken =
    document.cookie
      .split(";")
      .filter((str) => str.trim().includes("token"))[0]
      ?.split("=")[1] || null;

  const savedUserData =
    document.cookie
      .split(";")
      .filter((str) => str.trim().includes("userData"))[0]
      ?.split("=")[1] || null;

  const [token, setToken] = useState(savedToken);
  const [userInfo, setUserInfo] = useState(JSON.parse(savedUserData));

  async function logout({ setNotes }) {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    setToken(null);
    setUserInfo(null);
    setNotes(null);
  }

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, token, setToken, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}
